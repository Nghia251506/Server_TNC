var express = require('express');
var app = express();
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3389;
const cors = require('cors');
app.use(cors());  // Cho phép tất cả các nguồn kết nối

/**
 * Cấu hình body-parser
 */

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Import và thiết lập các router
const clientRouter = require('./App/Routes/Client.router');
const adminRouter = require('./App/Routes/Admin.router');
// const loginRouter = require('./App/Routes/Authenticate.router');

const router = express.Router();
adminRouter(router);
clientRouter(router);

// Sử dụng router chính
app.use("/", router);
// app.use("/login", loginRouter);

// Khởi chạy server
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
