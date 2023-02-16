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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = __importDefault(require("../models/Product"));
exports.createNewProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = new Product_1.default({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
        });
        yield product.save();
        res.json(product);
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params);
    try {
        const product = yield Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    }
    catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
});
exports.getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const page = parseInt((_a = req.query) === null || _a === void 0 ? void 0 : _a.page) || 1;
    const limit = parseInt((_b = req.query) === null || _b === void 0 ? void 0 : _b.limit) || 10;
    try {
        const products = yield Product_1.default.find()
            .skip((page - 1) * limit)
            .limit(limit);
        const totalProducts = yield Product_1.default.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);
        res.json({
            currentPage: page,
            totalPages: totalPages,
            totalProducts: totalProducts,
            products: products,
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.image = req.body.image || product.image;
        yield product.save();
        res.json(product);
    }
    catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
});
exports.deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield Product_1.default.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        yield product.remove();
        res.json({ msg: 'Product removed' });
    }
    catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
});
