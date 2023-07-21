const { query } = require('express');
const Product = require('../models/product.model');
const Products = require('../models/product.model');

const getProduct = async (req, res) => {
    try {
        const allProducts = await Product.find();
        return res.json(allProducts);
    } catch (error) {
        console.log(error);
    }
};

const getProductById = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        console.log(id);
        const productId = await Product.findById(id);
        if (!productId) {
            return res.status(404).json({ mensaje: 'id no encontrada' });
        }
        return res.status(200).json(ProductId);
    } catch (error) {
        return res.status(500).json(error);
    }
};

// const setNewProduct = async (req, res) => {
//     try {
//         const newProduct = new Product(req.body);
//         const createdProduct = await newProduct.save();
//         return res.status(200).json(createdProduct);
//     } catch (error) {
//         return res.status(500).json(error);
//     }
// };

const postProduct = async (req, res) => {
    console.log(req.body);
    try {
        console.log(req.body);
        console.log(req.file.path);
        const newProduct = new Product(req.body);
        if (req.file.path) {
            newProduct.image = req.file.path;
        }
        const createdProduct = await newProduct.save();

        return res.status(200).json(createdProduct);
    } catch (error) {
        return res.status(400).json(error);
    }
};

const modProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const putProduct = new Product(req.body);
        putProduct._id = id;
        const updateProduct = await Product.findByIdAndUpdate(id, putProduct, {
            new: true,
        });
        return res.status(200).json(updateProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteProduct = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const deleteProduct = await Product.findByIdAndDelete(id);
        if (!deleteProduct) {
            return res.status(404).json({ mensaje: 'producto no encontrado' });
        }
        return res.status(200).json(deleteProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports = {
    getProduct,
    modProduct,
    deleteProduct,
    getProductById,
    postProduct,
};
