import { Employee } from "../controllers/employee.controller";

import { Router } from "express";

const router = Router();

router.post("/", Employee.add);
router.get("/", Employee.get);
router.put("/:id", Employee.update);
router.delete("/:id", Employee.delete);
router.post("/:relation/:employee1/:employee2", Employee.addRelation);
router.get("/:batch", Employee.getBatch);

export default router;
