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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.editProduct = exports.listProducts = exports.createProduct = void 0;
const product_1 = require("../models/product");
// Function create product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, amount } = req.body;
    var patron = /^[0-9\s]+$/;
    if (!name || !description || !price || !amount) {
        return res.status(400).json({ message: 'Please, send all the data' });
    }
    if (patron.test(price) === false) {
        return res.status(400).json({ message: 'The price cannot have blank spaces or points, only number' });
    }
    if (patron.test(amount) === false) {
        return res.status(400).json({ message: 'The amount cannot have blank spaces or points, only number' });
    }
    const newProduct = {
        name: name,
        description: description,
        price: price,
        amount: amount
    };
    const product = new product_1.Product(newProduct);
    yield product.save();
    return res.status(200).json({
        message: 'The product was create successfuly',
        product
    });
});
exports.createProduct = createProduct;
// Function list products
const listProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_1.Product.find();
    return res.status(200).json(products);
});
exports.listProducts = listProducts;
// Function edit product
const editProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const productEdit = yield product_1.Product.findById(id);
    return res.status(200).json(productEdit);
});
exports.editProduct = editProduct;
// Function delete product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.Product.findByIdAndRemove(id);
    return res.status(200).json({
        message: 'The product was deleted successfuly',
        product
    });
});
exports.deleteProduct = deleteProduct;
// Function update product
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, price, amount } = req.body;
    var patron = /^[0-9\s]+$/;
    if (!name || !description || !price || !amount) {
        return res.status(400).json({ message: 'Please, send all the data' });
    }
    if (patron.test(price) === false) {
        return res.status(400).json({ message: 'The price cannot have blank spaces or points, only number' });
    }
    if (patron.test(amount) === false) {
        return res.status(400).json({ message: 'The amount cannot have blank spaces or points, only number' });
    }
    const updatedProduc = yield product_1.Product.findByIdAndUpdate(id, {
        name,
        description,
        price,
        amount
    }, { new: true });
    return res.status(200).json({
        message: 'The product was updated successfuly',
        updatedProduc
    });
});
exports.updateProduct = updateProduct;
