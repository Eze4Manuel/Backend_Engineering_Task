import { Request, Response, NextFunction } from 'express';
import { ProductType } from '../types/Products';


exports.validateNewProduct = (req: Request, res: Response, next: NextFunction) => {

    let data: ProductType = req.body;

    if (!data.name) {
        return res.status(400).json({ msg: 'product name is required', status: 'failed' });
    }
    if (!data.description) {
        return res.status(400).json({ msg: 'product description is required', status: 'failed' });
    }
    if (!data.price) {
        return res.status(400).json({ msg: 'product price is required', status: 'failed' });
    }
    if (data.price) {
        if (isNaN(data.price)) {
            return res.status(400).json({ msg: 'product price has to be a number', status: 'failed' });
        }
    }
    next();
}

exports.validateUpdateProduct = (req: Request, res: Response, next: NextFunction) => {

    let data: ProductType = req.body;

    if (!data.name) {
        return res.status(400).json({ msg: 'product name is required', status: 'failed' });
    }
    if (!data.description) {
        return res.status(400).json({ msg: 'product description is required', status: 'failed' });
    }
    if (!data.price) {
        return res.status(400).json({ msg: 'product price is required', status: 'failed' });
    }
    if (data.price) {
        if (isNaN(data.price)) {
            return res.status(400).json({ msg: 'product price has to be a number', status: 'failed' });
        }
    }
    next();
}
