const conn = require('../common/connect');

const Category = function (category) {
    this.id = category.id;
    this.name = category.category_name;
};

Category.get_all = function (result) {
    conn.query("SELECT * FROM categories", function(err, category){
        if (err) {
            result(null, err);
        } else {
            result(category);
        }
    });
};

Category.getById = function (id, result) {
    conn.query(`SELECT * FROM categories WHERE id = ${id}`, function(err, category){
        if (err) {
            return null;
        } else {
            result(category);
        }
    });
};

Category.create = function (data, callback) {
    const query = `INSERT INTO categories (name) VALUES (?)`;
    const params = [
        data.name,
    ];

    conn.query(query, params, function (err, results) {
        if (err) {
            console.error("Lỗi khi thêm loại sản phẩm:", err);
            callback(err, null); // Gửi lỗi về callback
        } else {
            console.log("Kết quả trả về:", results);
            callback(null, results); // Trả về kết quả
        }
    });
};


Category.remove = function (id, callback) {
    const query = "DELETE FROM categories WHERE id = ?"; // Truy vấn SQL xóa sản phẩm theo ID

    conn.query(query, [id], function (err, result) {
        if (err) {
            console.error("Lỗi khi thực hiện query:", err);
            callback(err, null); // Gửi lỗi về controller
        } else {
            callback(null, result); // Trả kết quả về controller
        }
    });
};


Category.update = function (id, data, result) {
    const query = `UPDATE categories SET ? WHERE id = ?`;

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

    

module.exports = Category;
