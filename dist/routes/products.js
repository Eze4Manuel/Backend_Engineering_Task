"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const { createNewProducts, getProduct, getAllProducts, updateProduct, deleteProduct } = require('../controllers/products');
const { validateNewProduct, validateUpdateProduct } = require('../middleware/validateProducts');
const router = (0, express_1.Router)();
// Create a new product
router.post('/', validateNewProduct, createNewProducts);
// Get all products
router.get('/', getAllProducts);
// Get a single product
router.get('/:id', getProduct);
// Update a product
router.put('/:id', validateUpdateProduct, updateProduct);
// Delete a product
router.delete('/:id', deleteProduct);
exports.default = router;
