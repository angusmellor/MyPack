"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var items_1 = require("./controllers/items");
var router = (0, express_1.Router)();
exports.router = router;
router.post('/items', items_1.itemController.addItem);
router.get('/items', items_1.itemController.getAllItems);
//# sourceMappingURL=router.js.map