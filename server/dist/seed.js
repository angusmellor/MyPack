"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("@prisma/client");
var prisma = new client_1.PrismaClient();
var categories = [
    { category: 'Cook System' },
    { category: 'Big Four' },
    { category: 'Electronics' },
    { category: 'Clothing' },
    { category: 'Miscellaneous' }
];
var itemNames = [
    { name: 'Pack' },
    { name: 'Sleeping Bag' },
    { name: 'Sleeping Mat' },
    { name: 'Tent' },
    { name: 'Bear Can' },
    { name: 'Pegs' },
    { name: 'Dry Bag' },
    { name: 'Phone' },
    { name: 'Battery' },
    { name: 'Shoes' },
    { name: 'Shorts' },
    { name: 'Shirt' },
    { name: 'Hat' },
    { name: 'Stove' },
    { name: 'Pot' },
    { name: 'Spoon' },
    { name: 'Rain Jacket' },
    { name: 'Torch' }
];
var userData = [
    { email: 'angus@example.com' },
    { email: 'orla@example.com' },
    { email: 'skurka@example.com' }
];
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var _i, userData_1, u, user, _a, categories_1, c, categories_2, _b, itemNames_1, i, itemName;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log('Start seeding ...');
                    _i = 0, userData_1 = userData;
                    _c.label = 1;
                case 1:
                    if (!(_i < userData_1.length)) return [3 /*break*/, 4];
                    u = userData_1[_i];
                    return [4 /*yield*/, prisma.user.create({
                            data: u
                        })];
                case 2:
                    user = _c.sent();
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    console.log('Users added');
                    _a = 0, categories_1 = categories;
                    _c.label = 5;
                case 5:
                    if (!(_a < categories_1.length)) return [3 /*break*/, 8];
                    c = categories_1[_a];
                    return [4 /*yield*/, prisma.categoryName.create({
                            data: c
                        })];
                case 6:
                    categories_2 = _c.sent();
                    _c.label = 7;
                case 7:
                    _a++;
                    return [3 /*break*/, 5];
                case 8:
                    console.log('Categories added');
                    _b = 0, itemNames_1 = itemNames;
                    _c.label = 9;
                case 9:
                    if (!(_b < itemNames_1.length)) return [3 /*break*/, 12];
                    i = itemNames_1[_b];
                    return [4 /*yield*/, prisma.itemName.create({
                            data: i
                        })];
                case 10:
                    itemName = _c.sent();
                    _c.label = 11;
                case 11:
                    _b++;
                    return [3 /*break*/, 9];
                case 12:
                    console.log('Item names added');
                    console.log('Seeding finished.');
                    return [2 /*return*/];
            }
        });
    });
}
main()
    .then(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })
    .catch(function (e) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.error(e);
                return [4 /*yield*/, prisma.$disconnect()];
            case 1:
                _a.sent();
                process.exit(1);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=seed.js.map