const conn = require('../common/connect');

const Product = function (product) {
    this.id = product.id;
    this.code = product.code;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.quantity = product.quantity;
    this.category_id = product.category_id;
    this.brand_id = product.brand_id;
    this.create_at = product.create_at;
    this.update_at = product.update_at;
    this.image = product.image_url;
};

Product.get_all = function (result) {
    conn.query("SELECT p.id, p.code, p.name, p.price, p.quantity,p.image_url, p.description, ca.category_name, b.brand_name from products as p INNER JOIN categories as ca ON p.category_id = ca.id INNER JOIN brands as b ON p.brand_id = b.id", function(err, product){
        if (err) {
            result(null, err);
        } else {
            result(product);
        }
    });
};

Product.getById = function (id, result) {
    conn.query(`SELECT * FROM products WHERE id = ${id}`, function(err, product){
        if (err) {
            return null;
        } else {
            result(product);
        }
    });
};

Product.create = function (data, callback) {
    const query = `CALL AddProductWithCode(?, ?, ?, ?, ?, ?, ?)`;
    const params = [
        data.product_name,
        data.product_description,
        data.product_price,
        data.product_quantity,
        data.product_category_id,
        data.product_brand_id,
        data.product_image
    ];

    conn.query(query, params, function (err, results) {
        if (err) {
            console.error("Lỗi khi gọi Stored Procedure:", err);
            callback(err, null); // Gửi lỗi về callback
        } else {
            console.log("Kết quả trả về:", results);
            callback(null, results); // Trả về kết quả
        }
    });
};


Product.remove = function (id, callback) {
    const query = "DELETE FROM products WHERE id = ?"; // Truy vấn SQL xóa sản phẩm theo ID

    conn.query(query, [id], function (err, result) {
        if (err) {
            console.error("Lỗi khi thực hiện query:", err);
            callback(err, null); // Gửi lỗi về controller
        } else {
            callback(null, result); // Trả kết quả về controller
        }
    });
};


Product.update = function (id, data, result) {
    const query = `UPDATE products SET ? WHERE id = ?`;

    // Thực hiện truy vấn
    conn.query(query, [data, id], function (err, res) {
        if (err) {
            console.error("Lỗi khi cập nhật sản phẩm:", err);
            result(err, null); // Trả lỗi về controller
        } else {
            result(null, res); // Trả kết quả về controller
        }
    });
};

    

module.exports = Product;
