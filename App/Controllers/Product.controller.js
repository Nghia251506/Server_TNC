const ProductModel = require("../Models/Product.model");

exports.list = function (req, res) {
    ProductModel.get_all(function (data) {
        res.send(data); // Gửi trực tiếp mảng sản phẩm
    });
};


exports.detail = function (req, res) {
    const id = req.params.id;

    ProductModel.getById(id, function (data) {
            res.send({ result: data });
    });
};


exports.add = function (req, res) {
    const data = req.body;

    // Kiểm tra dữ liệu đầu vào
    if (
        !data.product_name ||
        !data.product_description ||
        !data.product_price ||
        !data.product_quantity ||
        !data.product_category_id ||
        !data.product_brand_id ||
        !data.product_image
    ) {
        return res.status(400).send({ error: "Thiếu dữ liệu đầu vào" });
    }

    // Gọi model để thêm sản phẩm
    ProductModel.create(data, function (err, result) {
        if (err) {
            console.error("Lỗi khi tạo sản phẩm:", err);
            res.status(500).send({ error: "Không thể tạo sản phẩm" });
        } else {
            res.status(201).send({ message: "Sản phẩm đã được tạo thành công", result });
        }
    });
};


exports.delete = function (req, res) {
    const id = req.body.id;
    ProductModel.remove(id, function (err, result) {
        if (err) {
            res.status(500).send({ error: "Không thể xóa sản phẩm." });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "Không tìm thấy sản phẩm với ID này." });
        } else {
            // Gửi danh sách sản phẩm mới
            ProductModel.get_all(function (err, products) {
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
    const id = req.body.id; // Lấy id từ list
    const data = req.body;    // Lấy dữ liệu cập nhật từ client

    // Gọi hàm update từ model
    ProductModel.update(id, data, function (err, result) {
        if (err) {
            res.status(500).send({ error: "Lỗi khi cập nhật sản phẩm" });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: `Không tìm thấy sản phẩm với ID ${id}` });
        } else {
            res.send({ message: `Cập nhật sản phẩm với ID ${id} thành công` });
        }
    });
};


// exports.add = function(req,res){
//     var data = {"id":15, "name":"demo product "};
//     Product.create(data, function(response){
//         res.send({result:response});
//     });
// };