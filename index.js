// const express = require('express');
// const mysql = require('mysql2/promise');

// const app = express();
// const port = 4000;

// // Kết nối MySQL
// const db = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'Tnc2024@',
//     database: 'TNC',
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0
// });


// // API kiểm tra danh sách sản phẩm
// app.get('/products', async (req, res) => {
//     try {
//         const [products] = await db.query('SELECT * FROM products');
//         res.status(200).json(products);
//     } catch (error) {
//         console.error('Error fetching products:', error);
//         res.status(500).json({
//             message: 'Error fetching products',
//             error: error.message
//         });
//     }
// });

// // API thêm sản phẩm mới và tự động sinh mã
// app.post('/products', express.json(), async (req, res) => {
//     const { name, price, category_id, brand_id } = req.body;
//     try {
//         // Gọi procedure AddProductWithCode
//         const [result] = await db.query('CALL AddProductWithCode(?, ?, ?, ?)', [
//             name,
//             price,
//             category_id,
//             brand_id,
//         ]);
//         res.status(201).json({
//             message: 'Product added successfully with auto-generated code!',
//             productId: result[0].insertId,
//         });
//     } catch (error) {
//         console.error('Error adding product with code:', error);
//         res.status(500).json({
//             message: 'Error adding product with code',
//             error: error.message,
//         });
//     }
// });


// // API kiểm tra danh sách hóa đơn
// app.get('/bills', async (req, res) => {
//     try {
//         const [bills] = await db.query('SELECT * FROM bills');
//         res.status(200).json(bills);
//     } catch (error) {
//         console.error('Error fetching bills:', error);
//         res.status(500).json({
//             message: 'Error fetching bills',
//             error: error.message
//         });
//     }
// });

// // API thêm hóa đơn mới
// app.post('/bills', express.json(), async (req, res) => {
//     const { customer_id, employee_id, total_amount, payment_status } = req.body;
//     try {
//         const [result] = await db.query(
//             'INSERT INTO bills (customer_id, employee_id, total_amount, payment_status, created_at) VALUES (?, ?, ?, ?, NOW())',
//             [customer_id, employee_id, total_amount, payment_status]
//         );
//         res.status(201).json({
//             message: 'Bill added successfully!',
//             billId: result.insertId
//         });
//     } catch (error) {
//         console.error('Error adding bill:', error);
//         res.status(500).json({
//             message: 'Error adding bill',
//             error: error.message
//         });
//     }
// });

// // API kiểm tra danh sách khách hàng
// app.get('/users', async (req, res) => {
//     try {
//         const [customers] = await db.query('SELECT * FROM users');
//         res.status(200).json(customers);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({
//             message: 'Error fetching users',
//             error: error.message
//         });
//     }
// });

// // API thêm khách hàng mới
// app.post('/admin', express.json(), async (req, res) => {
//     const { name, email, phone } = req.body;
//     try {
//         const [result] = await db.query(
//             'INSERT INTO admins (name, email, phone, created_at) VALUES (?, ?, ?, NOW())',
//             [name, email, phone]
//         );
//         res.status(201).json({
//             message: 'admin added successfully!',
//             customerId: result.insertId
//         });
//     } catch (error) {
//         console.error('Error adding admin:', error);
//         res.status(500).json({
//             message: 'Error adding admin',
//             error: error.message
//         });
//     }
// });

// // API kiểm tra danh sách nhân viên
// app.get('/admin', async (req, res) => {
//     try {
//         const [employees] = await db.query('SELECT * FROM admins');
//         res.status(200).json(employees);
//     } catch (error) {
//         console.error('Error fetching admin:', error);
//         res.status(500).json({
//             message: 'Error fetching admin',
//             error: error.message
//         });
//     }
// });

// // API thêm nhân viên mới
// // app.post('/employees', express.json(), async (req, res) => {
// //     const { name, position, salary } = req.body;
// //     try {
// //         const [result] = await db.query(
// //             'INSERT INTO admins (name, position, salary, created_at) VALUES (?, ?, ?, NOW())',
// //             [name, position, salary]
// //         );
// //         res.status(201).json({
// //             message: 'Employee added successfully!',
// //             employeeId: result.insertId
// //         });
// //     } catch (error) {
// //         console.error('Error adding employee:', error);
// //         res.status(500).json({
// //             message: 'Error adding employee',
// //             error: error.message
// //         });
// //     }
// // });

// // API kiểm tra danh sách loại sản phẩm
// app.get('/categories', async (req, res) => {
//     try {
//         const [categories] = await db.query('SELECT * FROM categories');
//         res.status(200).json(categories);
//     } catch (error) {
//         console.error('Error fetching categories:', error);
//         res.status(500).json({
//             message: 'Error fetching categories',
//             error: error.message
//         });
//     }
// });

// // API thêm loại sản phẩm mới
// app.post('/categories', express.json(), async (req, res) => {
//     const { name } = req.body;
//     try {
//         const [result] = await db.query(
//             'INSERT INTO categories (name, created_at) VALUES (?, NOW())',
//             [name]
//         );
//         res.status(201).json({
//             message: 'Category added successfully!',
//             categoryId: result.insertId
//         });
//     } catch (error) {
//         console.error('Error adding category:', error);
//         res.status(500).json({
//             message: 'Error adding category',
//             error: error.message
//         });
//     }
// });

// // API kiểm tra danh sách thương hiệu
// app.get('/brands', async (req, res) => {
//     try {
//         const [brands] = await db.query('SELECT * FROM brands');
//         res.status(200).json(brands);
//     } catch (error) {
//         console.error('Error fetching brands:', error);
//         res.status(500).json({
//             message: 'Error fetching brands',
//             error: error.message
//         });
//     }
// });

// // API thêm thương hiệu mới
// app.post('/brands', express.json(), async (req, res) => {
//     const { name } = req.body;
//     try {
//         const [result] = await db.query(
//             'INSERT INTO brands (name, created_at) VALUES (?, NOW())',
//             [name]
//         );
//         res.status(201).json({
//             message: 'Brand added successfully!',
//             brandId: result.insertId
//         });
//     } catch (error) {
//         console.error('Error adding brand:', error);
//         res.status(500).json({
//             message: 'Error adding brand',
//             error: error.message
//         });
//     }
// });

// //API kiểm tra đơn hàng bán trực tiếp
// app.get('/bills', async(req,res) => {
//     try {
//         const [bills] = await db.query('SELECT * FROM bill_details');
//         res.status(200).json(brands);
//     } catch (error) {
//         console.error('Error fetching brands:', error);
//         res.status(500).json({
//             message: 'Error fetching brands',
//             error: error.message
//         });
//     }
// });

// // API thêm đơn hàng bán trực tiếp mới
// app.post('/brands', express.json(), async (req, res) => {
//     const { name } = req.body;
//     try {
//         const [result] = await db.query(
//             'INSERT INTO bills (admin_id, customer_name, customer_phone, total_price, payment_method, create_at, update_at) VALUES (?,?,?,?,?, NOW(), NOW())',
//             [name]
//         );
//         res.status(201).json({
//             message: 'Bill added successfully!',
//             brandId: result.insertId
//         });
//     } catch (error) {
//         console.error('Error adding bill:', error);
//         res.status(500).json({
//             message: 'Error adding bill',
//             error: error.message
//         });
//     }
// });

// // Khởi chạy server
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
