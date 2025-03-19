const ProductDetail = require('../Models/Product_Detail.model')

exports.DetailByProductId = function(req,res){
    const product_id = req.body.product_id;
    ProductDetail.getProductDetailById(product_id, function(err, data){
        if (err) {
            return res.status(500).send({ error: "Lỗi khi tìm sản phẩm.", details: err });
        }
        if (!data || data.length === 0) {
            return res.status(404).send({ message: "Không tìm thấy sản phẩm." });
        }
        res.status(200).send(data); // Trả về dữ liệu sản phẩm nếu tìm thấy
    })
}

exports.ClientDetailByProductId = function(req,res){
    const product_id = req.params.product_id;
    ProductDetail.getProductDetailById(product_id, function(err, data){
        if (err) {
            return res.status(500).send({ error: "Lỗi khi tìm sản phẩm.", details: err });
        }
        if (!data || data.length === 0) {
            return res.status(404).send({ message: "Không tìm thấy sản phẩm." });
        }
        res.status(200).send(data); // Trả về dữ liệu sản phẩm nếu tìm thấy
    })
}

exports.add = function (req,res){
    const data = req.body;

    ProductDetail.createProductDetail(data, function(err, response){
        if (err) {
            return res.status(500).send({ error: "Lỗi khi tạo chi tiết sản phẩm.", details: err });
        }
        res.status(200).send({ message: "Tạo chi tiết sản phẩm thành công", id: response });
    });
}

exports.update = function (req,res){
    const id = req.body.id;
    const data = req.body;

    ProductDetail.updateProductDetail(id, data, function(err, response){
        if (err) {
            return res.status(500).send({ error: "Lỗi khi cập nhật chi tiết sản phẩm.", details: err });
        }
        if (!response) {
            return res.status(404).send({ message: "Không tìm thấy chi tiết sản phẩm với ID này." });
        }
        res.status(200).send({ message: "Cập nhật chi tiết sản phẩm thành công" });
    });
}