"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var items_1 = require("./controllers/items");
var categories_1 = require("./controllers/categories");
var packs_1 = require("./controllers/packs");
var router = (0, express_1.Router)();
exports.router = router;
router.post('/items', items_1.itemController.addItem);
router.post('/packs', packs_1.packController.addPack);
router.get('/items', items_1.itemController.getAll);
router.get('/packs', packs_1.packController.getAll);
// router.get('/packs', packController.getAll);
// router.get('/names', nameController.getAll);
router.get('/categories', categories_1.catController.getAll);
//# sourceMappingURL=router.js.map