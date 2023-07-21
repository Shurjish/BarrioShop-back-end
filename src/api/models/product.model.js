const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema(
    {
        name: { type: String, required: true },
        image: {
            type: String,
            required: false,
            default: '',
        },
        description: { type: String },
        price: { type: Number },
        amount: { type: Number },
    },
    {
        timestamps: true,
    },
    {
        collection: 'product',
    }
);
const Product = mongoose.model('product', productSchema);
module.exports = Product;
