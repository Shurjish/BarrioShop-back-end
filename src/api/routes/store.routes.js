const express = require('express');
const upload = require('../../middlewares/upload.file');

const router = express.Router();

const {
    getStoreName,
    getStoreCity,
    getStorePhone,
    modStore,
    deleteStore,
    getAllStores,
    getStoreId,
    setNewStore,
    postStore,
} = require('../controllers/store.controller');

router.get('/name/:name', getStoreName);
router.get('/city', getStoreCity);
router.get('/phone/:phone', getStorePhone);
router.put('/:id', modStore);
router.delete('/:id', deleteStore);
router.get('/stores', getAllStores);
router.get('/:id', getStoreId);
// router.post('/modstore', setNewStore);
router.post('/', upload.single('image'), postStore);
/**
 *
 *
 */
module.exports = router;
