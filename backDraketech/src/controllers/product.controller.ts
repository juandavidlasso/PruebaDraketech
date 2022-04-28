import { Request, Response } from "express"
import { Product } from '../models/product'

// Function create product
export const createProduct = async (req: Request, res: Response): Promise<Response> => {
    const { name, description, price, amount } = req.body;
    var patron = /^[0-9\s]+$/;

    if(!name || !description || !price || !amount) {
        return res.status(400).json({ message: 'Please, send all the data' })
    }

    if(patron.test(price) === false) {
        return res.status(400).json({ message: 'The price cannot have blank spaces or points, only number' })
    }

    if(patron.test(amount) === false) {
        return res.status(400).json({ message: 'The amount cannot have blank spaces or points, only number' })
    }
    
    const newProduct = {
        name: name,
        description: description,
        price: price,
        amount: amount
    };

    const product = new Product(newProduct);
    await product.save();

    return res.status(200).json({
        message: 'The product was create successfuly',
        product
    });
}

// Function list products
export const listProducts = async (req: Request, res: Response): Promise<Response> => {
    const products = await Product.find();
    return res.status(200).json(products);
}


// Function edit product
export const editProduct = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const productEdit = await Product.findById(id);
    return res.status(200).json(productEdit);
}


// Function delete product
export const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const product = await Product.findByIdAndRemove(id);
    
    return res.status(200).json({
        message: 'The product was deleted successfuly',
        product
    });
}


// Function update product
export const updateProduct = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { name, description, price, amount } = req.body;
    var patron = /^[0-9\s]+$/;

    if(!name || !description || !price || !amount) {
        return res.status(400).json({ message: 'Please, send all the data' })
    }

    if(patron.test(price) === false) {
        return res.status(400).json({ message: 'The price cannot have blank spaces or points, only number' })
    }

    if(patron.test(amount) === false) {
        return res.status(400).json({ message: 'The amount cannot have blank spaces or points, only number' })
    }
    
    const updatedProduc = await Product.findByIdAndUpdate(id, {
        name,
        description,
        price,
        amount
    }, { new: true });

    return res.status(200).json({
        message: 'The product was updated successfuly',
        updatedProduc
    })
}
