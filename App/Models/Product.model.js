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
//adbcasd
Product.get_all = function (result) {
    conn.query("SELECT p.*, ca.category_name, b.brand_name from products as p INNER JOIN categories as ca ON p.category_id = ca.id INNER JOIN brands as b ON p.brand_id = b.id ORDER BY p.id desc", function(err, product){
        if (err) {
            result(null, err);
        } else {
            result(product);
        }
    });
};

Product.getProductByCategory = function (category_id,result){
    conn.query(`SELECT * FROM products WHERE category_id = ${category_id}`, function(err, product){
        if (err) {
            result(null, err);
        } else {
            result(product);
        }
    });
}

Product.findProductByCode = function (code, result) {
    conn.query(`SELECT * FROM products WHERE code LIKE ?`, [`%${code}%`], function (err, products) {
        if (err) {
            return result(err, null); // Trả về lỗi qua callback
        }
        if (products.length === 0) {
            return result(null, null); // Không tìm thấy sản phẩm, trả về null
        }
        return result(null, products); // Trả về sản phẩm đầu tiên
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
    const query = `CALL AddProductWithCode(? , ? , ? , ? ,  ? , ? , ?,?)`;
    const params = [
        data.name,
        data.description,
        data.sell_price,
        data.capital_price,
        data.stock,
        data.category_id,
        data.brand_id,
        data.image_url
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
    const query = `UPDATE products SET name = ?, description = ?, price = ?, quantity = ?, category_id = ?, brand_id = ?, image_url = ? WHERE id = ${id}`;
    const values = [
        data.name,
        data.description,
        data.price,
        data.quantity,
        data.category_id,
        data.brand_id,
        data.image_url,
        id
    ];
    // Thực hiện truy vấn
    conn.query(query, values, function (err, res) {
        if (err) {
            console.error("Lỗi khi cập nhật sản phẩm:", err);
            result(err, null); // Trả lỗi về controller
        } else {
            result(null, res); // Trả kết quả về controller
        }
    });
};

    

module.exports = Product;
