const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const cloudinary = require('cloudinary').v2;
const { connect } = require('./src/utils/database');
const routerStore = require('./src/api/routes/store.routes');
const routerProduct = require('./src/api/routes/product.routes');
const routerUser = require('./src/api/routes/user.routes');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const app = express();
app.use(cors());
const PORT = process.env.PORT || 7000;
connect();
app.use(express.json());

app.use('/store', routerStore);
app.use('/product', routerProduct);
app.use('/user', routerUser);

app.listen(PORT, () => {
    console.log(
        `el servidor esta levantado en la ruta http://localhost ${PORT}`
    );
});
