const BillDetail = require('../Models/Bill_detail.model');

// Thêm chi tiết hóa đơn
exports.addBillDetail = (req, res) => {
    const { bill_id, product_id, quantity, price } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!billId || !productId || !quantity || !price) {
        return res.status(400).send({ error: "Vui lòng điền đầy đủ thông tin." });
    }

    BillDetail.addBillDetail(bill_id, product_id, quantity, price, (err, data) => {
        if (err) {
            res.status(500).send({ error: "Lỗi khi thêm chi tiết hóa đơn." });
        } else {
            res.status(201).send({ message: "Thêm chi tiết hóa đơn thành công.", data });
        }
    });
};

// Lấy tất cả chi tiết hóa đơn
exports.getBillDetailsByBillId = (req, res) => {
    const { billId } = req.params.bill_id;

    if (!billId) {
        return res.status(400).send({ error: "Vui lòng cung cấp ID hóa đơn." });
    }

    BillDetail.getBillDetailsByBillId(billId, (err, data) => {
        if (err) {
            res.status(500).send({ error: "Lỗi khi lấy chi tiết hóa đơn." });
        } else {
            res.send({ message: "Lấy chi tiết hóa đơn thành công.", data });
        }
    });
};
