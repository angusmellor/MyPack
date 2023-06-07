"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = require("./router");
var cors_1 = __importDefault(require("cors"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var app = (0, express_1.default)();
var port = process.env.PORT;
app
    .use((0, cors_1.default)())
    .use(express_1.default.json())
    .use(router_1.router);
app.listen(3001, function () {
    console.log("Server running at http://localhost:3001");
});
//# sourceMappingURL=index.js.map