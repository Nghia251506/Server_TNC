const conn = require("../common/connect");

const Category = function (category) {
    this.id = category.id;
    this.name = category.category_name;
    this.parent_id = category.parent_id;
};

// Hàm lấy tất cả danh mục và trả về theo dạng cây phân cấp
Category.get_all = function (result) {
    conn.query("SELECT * FROM categories", function (err, categories) {
        if (err) {
            result(null, err);
        } else {
            const categoryTree = buildCategoryTree(categories);
            result(categoryTree);
        }
    });
};

// Hàm chuyển danh sách danh mục thành cây phân cấp
function buildCategoryTree(categories, parentId = null) {
    return categories
        .filter(cat => cat.parent_id === parentId)
        .map(cat => ({
            ...cat,
            children: buildCategoryTree(categories, cat.id),
        }));
}

// Lấy danh mục theo ID
Category.getById = function (id, result) {
    conn.query(`SELECT * FROM categories WHERE id = ?`, [id], function (err, category) {
        if (err) {
            result(null, err);
        } else {
            result(category[0]); // Lấy phần tử đầu tiên vì WHERE trả về mảng
        }
    });
};

// Thêm danh mục mới
Category.create = function (data, callback) {
    const query = `INSERT INTO categories (category_name, parent_id) VALUES (?, ?)`;
    const params = [data.category_name, data.parent_id];

    conn.query(query, params, function (err, results) {
        if (err) {
            console.error("Lỗi khi thêm danh mục:", err);
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

// Cập nhật danh mục
Category.update = function (id, data, result) {
    const query = `UPDATE categories SET ? WHERE id = ?`;
    conn.query(query, [data, id], function (err, res) {
        if (err) {
            console.error("Lỗi khi cập nhật danh mục:", err);
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

// Xóa danh mục
Category.remove = function (id, callback) {
    const query = "DELETE FROM categories WHERE id = ?";
    conn.query(query, [id], function (err, result) {
        if (err) {
            console.error("Lỗi khi xóa danh mục:", err);
            callback(err, null);
        } else {
            callback(null, result);
        }
    });
};

module.exports = Category;
