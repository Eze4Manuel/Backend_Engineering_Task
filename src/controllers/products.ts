import { Router, Request, Response } from 'express';
import Product from "../models/Product";

exports.createNewProducts = async (req: Request, res: Response) => {
    try {
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
        });
        await product.save();
        res.json(product);
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}



exports.getProduct = async (req: Request, res: Response) => {
    console.log(req.params);

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (err: any) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
}

exports.getAllProducts = async (req: Request<any, any, any, any>, res: Response) => {
    const page = parseInt(req.query?.page) || 1;
    const limit = parseInt(req.query?.limit) || 10;

    try {
        const products = await Product.find()
            .skip((page - 1) * limit)
            .limit(limit);
        const totalProducts = await Product.countDocuments();
        const totalPages = Math.ceil(totalProducts / limit);

        res.json({
            currentPage: page,
            totalPages: totalPages,
            totalProducts: totalProducts,
            products: products,
        });
    } catch (err: any) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};



exports.updateProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        product.name = req.body.name || product.name;
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.image = req.body.image || product.image;

        await product.save();
        res.json(product);
    } catch (err: any) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
}



exports.deleteProduct = async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        await product.remove();
        res.json({ msg: 'Product removed' });
    } catch (err: any) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.status(500).send('Server Error');
    }
}
