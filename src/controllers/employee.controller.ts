import safe from "safe-await";
import * as uuid from "uuid";
import driver from "../helpers/database";
import IEmployee from "../interfaces/node/employee.interface";
import IColleague from "../interfaces/relationship/colleague.interface";
import { node, code, relationship } from "../utils/constants";
import { Request, Response, NextFunction } from "express";

type Data = {
  [key: string]: any;
};

class EmployeeController {
  private static async read(query: string, data: Data) {
    const session = driver.session();

    try {
      const result = await session.executeRead((transaction) => {
        return transaction.run(query, data);
      });

      return result.records.map((item) => item["_fields"][0]);
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      session.close();
    }
  }

  private static async write(query: string, data: Data) {
    const session = driver.session();

    try {
      const result = await session.executeWrite((transaction) => {
        return transaction.run(query, data);
      });

      return result.records;
    } catch (error: any) {
      throw new Error(error.message);
    } finally {
      session.close();
    }
  }

  public async add(req: Request, res: Response, next: NextFunction) {
    const query =
      `CREATE (employee: ${node.EMPLOYEE} ` +
      `{id: $id, name: $name, age: $age, address: $address, skills: $skills})`;

    const employee = req.body as IEmployee;

    const [error, data] = await safe(
      EmployeeController.write(query, { ...employee, id: uuid.v4() })
    );

    if (error) {
      return res
        .status(code.BAD_REQUEST_400)
        .json({ message: error.message, name: error.name });
    }

    return res.status(code.CREATED_201).json(data);
  }

  public async get(req: Request, res: Response, next: NextFunction) {
    const query = `MATCH (employee: ${node.EMPLOYEE}) RETURN employee`;

    const [error, data] = await safe(EmployeeController.read(query, {}));

    if (error) {
      return res
        .status(code.BAD_REQUEST_400)
        .json({ message: error.message, name: error.name });
    }

    return res.status(code.OK_200).json(data);
  }

  public async update(req: Request, res: Response, next: NextFunction) {
    const employeeId = req.params.id as string;

    const body = req.body as IEmployee;

    const query =
      `MATCH (employee: ${node.EMPLOYEE} {id: $employeeId}) ` +
      `SET employee.name = $name, employee.age = $age, ` +
      `employee.address = $address, employee.skills = $skills ` +
      `RETURN employee`;

    const [error, data] = await safe(
      EmployeeController.write(query, {
        ...body,
        employeeId,
      })
    );

    if (error) {
      return res
        .status(code.BAD_REQUEST_400)
        .json({ message: error.message, name: error.name });
    }

    return res.status(code.OK_200).json(data);
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    const employeeId = req.params.id as string;

    const query =
      `MATCH (employee: ${node.EMPLOYEE}) ` +
      `WHERE employee.id = $employeeId ` +
      `DETACH DELETE employee`;

    const [error, data] = await safe(
      EmployeeController.write(query, { employeeId })
    );

    if (error) {
      return res
        .status(code.BAD_REQUEST_400)
        .json({ message: error.message, name: error.name });
    }

    return res.status(code.OK_200).json(data);
  }

  public async addRelation(req: Request, res: Response, next: NextFunction) {
    const body = req.body as IColleague;
    const { relation, employee1, employee2 } = req.params;

    if (
      relation.toLocaleLowerCase() !==
      relationship.COLLEAGUE.toLocaleLowerCase()
    ) {
      return res
        .status(code.BAD_REQUEST_400)
        .json({ message: "INVALID RELATION ON EMPLOYEE" });
    }

    const query =
      `MATCH (employee1: ${node.EMPLOYEE}), (employee2: ${node.EMPLOYEE}) ` +
      `WHERE employee1.id = $employee1Id AND employee2.id = $employee2Id ` +
      `CREATE (employee1)-[:${relationship.COLLEAGUE} {id: $id, batch: $batch}]->(employee2) ` +
      `RETURN *`;

    const [error, data] = await safe(
      EmployeeController.write(query, {
        employee1Id: employee1,
        employee2Id: employee2,
        id: uuid.v4(),
        batch: body.batch,
      })
    );

    if (error) {
      return res
        .status(code.BAD_REQUEST_400)
        .json({ message: error.message, name: error.name });
    }

    return res.status(code.OK_200).json(data);
  }

  public async getBatch(req: Request, res: Response, next: NextFunction) {
    const batch = req.params.batch as string;

    const query =
      `MATCH (employee1: ${node.EMPLOYEE})-[colleague: ${relationship.COLLEAGUE}]->(employee2 :${node.EMPLOYEE}) ` +
      `WHERE colleague.batch = $batch ` +
      `RETURN *`;

    const [error, data] = await safe(EmployeeController.read(query, { batch }));

    if (error) {
      return res
        .status(code.BAD_REQUEST_400)
        .json({ message: error.message, name: error.name });
    }

    return res.status(code.OK_200).json(data);
  }
}

const Employee = new EmployeeController();

export { Employee };
