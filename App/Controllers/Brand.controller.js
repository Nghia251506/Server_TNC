const BrandModel = require('../Models/Brand.model');

exports.list = function (req, res) {
    BrandModel.get_all(function (data) {
            res.send(data);
    });
}

exports.detail = function (req, res) {
    const id = req.params.id;

    BrandModel.getById(id, function (data) {
            res.send({ result: data });
    });
}

exports.add = function (req, res) {
    const data = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!data.name) {
        return res.status(400).send({ error: "Thiếu tên thương hiệu" });
    }

    // Gọi model để thêm thương hiệu
    BrandModel.create(data, function (err, result) {
        if (err) {
            console.error("Lỗi khi tạo thương hiệu:", err);
            res.status(500).send({ error: "Không thể tạo thương hiệu" });
        } else {
            res.status(201).send({ message: "Thương hiệu đã được tạo thành công", result });
        }
    });
}

exports.delete = function (req, res) {
    const id = req.body.id;
    BrandModel.remove(id, function (err, result) {
        if (err) {
            res.status(500).send({ error: "Không thể xóa thương hiệu." });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "Không tìm thấy thương hiệu với ID này." });
        } else {
            // Gửi danh sách thương hiệu mới
            BrandModel.remove(function (err, brands) {
                if (err) {
                    res.status(500).send({ error: "Xóa thành công nhưng không thể tải danh sách thương hiệu." });
                } else {
                    res.send({ message: "Xóa thành công.", brands });
                }
            });
        }
    })
}

exports.update = function (req, res) {
    const id = req.body.id;
    const data = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (!data.name) {
        return res.status(400).send({ error: "Thiếu tên thương hiệu" });
    }
    BrandModel.update(id, data, function (err, result) {
        if (err) {
            res.status(500).send({ error: "Không thể cập nhật thương hiệu." });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "Không tìm thấy thương hiệu với ID này." });
        } else {
            res.send({ message: "Cập nhật thành công thương hiệu với ID " + id });
        }
    })
}

