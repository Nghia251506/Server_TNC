const CategoryModel = require("../Models/Category.model");

// Lấy danh sách danh mục
exports.listCategory = function (req, res) {
    CategoryModel.get_all(function (err, data) {
        if (err) {
            return res.status(500).send({ error: "Lỗi khi lấy danh sách danh mục" });
        }
        res.send(data);
    });
};

// Lấy chi tiết danh mục theo ID
exports.detail = function (req, res) {
    const id = req.params.id;

    CategoryModel.getById(id, function (err, data) {
        if (err) {
            return res.status(500).send({ error: "Lỗi khi lấy chi tiết danh mục" });
        }
        if (!data) {
            return res.status(404).send({ message: `Không tìm thấy danh mục với ID ${id}` });
        }
        res.send({ result: data });
    });
};

// Thêm danh mục mới
exports.add = function (req, res) {
    const data = req.body;

    if (!data.name) {
        return res.status(400).send({ error: "Thiếu dữ liệu đầu vào" });
    }

    CategoryModel.create(data, function (err, result) {
        if (err) {
            return res.status(500).send({ error: "Không thể tạo danh mục" });
        }
        res.status(201).send({ message: "Danh mục đã được tạo thành công", result });
    });
};

// Xóa danh mục
exports.delete = function (req, res) {
    const id = req.params.id; // Nên nhận từ URL thay vì body

    CategoryModel.remove(id, function (err, result) {
        if (err) {
            return res.status(500).send({ error: "Không thể xóa danh mục." });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: "Không tìm thấy danh mục với ID này." });
        }
        res.send({ message: "Xóa thành công." });
    });
};

// Cập nhật danh mục
exports.update = function (req, res) {
    const id = req.params.id;
    const data = req.body;

    if (!data.name) {
        return res.status(400).send({ error: "Thiếu tên danh mục" });
    }

    CategoryModel.update(id, data, function (err, result) {
        if (err) {
            return res.status(500).send({ error: "Lỗi khi cập nhật danh mục" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ message: `Không tìm thấy danh mục với ID ${id}` });
        }
        res.send({ message: `Cập nhật danh mục với ID ${id} thành công` });
    });
};
