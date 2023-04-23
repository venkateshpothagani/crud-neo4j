import neo4j from "neo4j-driver";

const uri = process.env["NEO4J_DATABASE_URL"] as string;
const user = process.env["NEO4J_DATABASE_USERNAME"] as string;
const password = process.env["NEO4J_DATABASE_PASSWORD"] as string;

export default neo4j.driver(uri, neo4j.auth.basic(user, password));
