const CategoryModel = require("../Models/Category.model");

exports.listCategory = function (req, res) {
    CategoryModel.get_all(function (data) {
            res.send(data);
    });
};

exports.detail = function (req, res) {
    const id = req.params.id;

    CategoryModel.getById(id, function (data) {
            res.send({ result: data });
    });
};


exports.add = function (req, res) {
    const data = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (
        !data.name
    ) {
        return res.status(400).send({ error: "Thiếu dữ liệu đầu vào" });
    }

    // Gọi model để thêm sản phẩm
    CategoryModel.create(data, function (err, result) {
        if (err) {
            console.error("Lỗi khi tạo sản phẩm:", err);
            res.status(500).send({ error: "Không thể tạo thể loại sản phẩm" });
        } else {
            res.status(201).send({ message: "Thể loại sản phẩm đã được tạo thành công", result });
        }
    });
};


exports.delete = function (req, res) {
    const id = req.body.id;
    CategoryModel.remove(id, function (err, result) {
        if (err) {
            res.status(500).send({ error: "Không thể xóa loại sản phẩm." });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "Không tìm thấy loại sản phẩm với ID này." });
        } else {
            // Gửi danh sách sản phẩm mới
            CategoryModel.get_all(function (err, products) {
                if (err) {
                    res.status(500).send({ error: "Xóa thành công nhưng không thể tải danh sách sản phẩm." });
                } else {
                    res.send({ message: "Xóa thành công.", products });
                }
            });
        }
    });
};


exports.update = function (req, res) {
    const id = req.body.id; // Lấy id từ form
    const data = req.body;    // Lấy dữ liệu cập nhật từ client

    // Gọi hàm update từ model
    CategoryModel.update(id, data, function (err, result) {
        if (err) {
            res.status(500).send({ error: "Lỗi khi cập nhật loại sản phẩm" });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: `Không tìm thấy loại sản phẩm với ID ${id}` });
        } else {
            res.send({ message: `Cập nhật loại sản phẩm với ID ${id} thành công` });
        }
    });
};


// exports.add = function(req,res){
//     var data = {"id":15, "name":"demo product "};
//     Product.create(data, function(response){
//         res.send({result:response});
//     });
// };