const { query } = require('express');
const Store = require('../models/store.model');
const Stores = require('../models/store.model');

const getAllStores = async (req, res) => {
    try {
        const allStores = await Store.find();
        // .populate('product');
        return res.json(allStores);
    } catch (error) {
        console.log(error);
    }
};

const getStoreId = async (req, res) => {
    try {
        console.log(req.params);
        let { id } = req.params;
        console.log(id);
        const storeId = await Store.findById(id).populate('product');
        if (!storeId) {
            return res.status(404).json({ mensaje: 'id no encontrada' });
        }
        return res.status(200).json(storeIdId);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getStoreName = async (req, res) => {
    try {
        console.log(req.params);
        let { name } = req.params;
        console.log(name);
        const storeName = await Store.find({
            name: name,
        });
        if (!movieName) {
            return res.status(404).json({ mensaje: 'Nombre no encontrado' });
        }
        return res.status(200).json(movieName);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getStorePhone = async (req, res) => {
    try {
        console.log(req.query);
        let { phone } = req.query;
        const storePhone = await Store.find({
            phone: phone,
        });
        if (!storePhone) {
            return res.status(404).json({ mensaje: 'Telefono no encontrado' });
        }
        return res.status(200).json(storePhone);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const getStoreCity = async (req, res) => {
    try {
        let { city } = req.params;
        console.log(city);
        const storeCity = await Store.find({
            year: { $gt: year },
        });
        if (!storeCity) {
            return res.status(404).json('no encontrada ciudad');
        }
        return res.status(200).json(storeCity);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const setNewStore = async (req, res) => {
    try {
        const newStore = new Store(req.body);
        const createdStore = await newStore.save();
        return res.status(200).json(createdStore);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const modStore = async (req, res) => {
    try {
        const { id } = req.params;
        const putStore = new Store(req.body);
        putStore._id = id;
        const updateStore = await Store.findByIdAndUpdate(id, putStore, {
            new: true,
        });
        return res.status(200).json(updateStore);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const deleteStore = async (req, res) => {
    try {
        console.log(req.params);
        const { id } = req.params;
        const deleteStore = await Store.findByIdAndDelete(id);
        if (!deleteStore) {
            return res.status(404).json({ mensaje: 'Comercio no encontrado' });
        }
        return res.status(200).json(deleteStore);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const postStore = async (req, res) => {
    console.log(req.body);
    try {
        console.log(req.body);
        console.log(req.file.path);
        const newStore = new Store(req.body);
        if (req.file.path) {
            newStore.image = req.file.path;
        }
        const createdStore = await newStore.save();

        return res.status(200).json(createdStore);
    } catch (error) {
        return res.status(400).json(error);
    }
};

module.exports = {
    getAllStores,
    setNewStore,
    getStoreId,
    getStoreName,
    getStorePhone,
    getStoreCity,
    modStore,
    deleteStore,
    postStore,
};
