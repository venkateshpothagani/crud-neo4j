"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const neo4j_driver_1 = __importDefault(require("neo4j-driver"));
const URI = process.env["NEO4J_DATABASE_URL"];
const USER = process.env["NEO4J_DATABASE_USERNAME"];
const PASSWORD = process.env["NEO4J_DATABASE_PASSWORD"];
let driver = neo4j_driver_1.default.driver(URI, neo4j_driver_1.default.auth.basic(USER, PASSWORD));
exports.default = driver;
