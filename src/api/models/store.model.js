const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema(
    {
        name: { type: String },
        direction: { type: String },
        phone: { type: Number },
        city: { type: String },
        province: { type: String },
        image: {
            type: String,
            required: false,
            default: '',
        },
        description: { type: String },
        web: { type: String },
        mail: { type: String },
        category: { type: String },
        products: [{ type: Schema.Types.ObjectId, ref: 'product' }],
    },
    {
        timestamp: true,
    },
    {
        collection: 'store',
    }
);
const Store = mongoose.model('store', storeSchema);
module.exports = Store;
