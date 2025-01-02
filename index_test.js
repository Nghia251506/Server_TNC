var express = require('express');
var app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 4000;
const cors = require('cors');
app.use(cors());  // Cho phép tất cả các nguồn kết nối

/**
 * Cấu hình body-parser
 */

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Import và thiết lập các router
const homeRouter = require('./App/Routes/Home.router');
const productRouter = require('./App/Routes/Product.router');
const categoryRouter = require('./App/Routes/Category.router');
const brandRouter = require('./App/Routes/Brand.router');
const loginRouter = require('./App/Routes/Authenticate.router');

const router = express.Router();
homeRouter(router);
productRouter(router);
categoryRouter(router);
brandRouter(router);

// Sử dụng router chính
app.use("/", router);
app.use("/login", loginRouter);

// Khởi chạy server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
