"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
const product_controller_1 = require("../controllers/product.controller");
const router = express_1.default.Router();
// Routes
router.post('/signup', user_controller_1.signUp);
router.post('/signin', user_controller_1.signIn);
router.post('/create-product', product_controller_1.createProduct);
router.get('/products', product_controller_1.listProducts);
router.get('/edit-product/:id', product_controller_1.editProduct);
router.delete('/delete-product/:id', product_controller_1.deleteProduct);
router.put('/update-product/:id', product_controller_1.updateProduct);
exports.default = router;
