"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const morgan_1 = __importDefault(require("morgan"));
const logDirectory = path_1.default.join(__dirname, "logs");
fs_1.default.mkdirSync(logDirectory, { recursive: true });
const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(logDirectory, "access.log"), { flags: "a" });
exports.default = (0, morgan_1.default)("combined", { stream: accessLogStream });
