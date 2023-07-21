const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Stores = require('../api/models/store.model');
dotenv.config();

const stores = [];

mongoose
    .connect(process.env.DB_URL)
    .then(async () => {
        const allStores = await Stores.find();
        if (allStores.length > 0) {
            await Stores.collection.drop();
            console.log('deleted stores');
        }
    })
    .catch((error) => console.log(`error borrando movies ${error}`))
    .then(async () => {
        const storesMap = stores.map((stores) => new Stores(stores));
        await Stores.insertMany(storesMap);
        console.log('inserted stores');
    })

    .catch((error) => console.log(`error creating stores ${error}`))
    .finally(() => mongoose.disconnect());
