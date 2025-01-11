const conn = require('../common/connect'); // Kết nối MySQL

const BillDetail = {};

// Thêm chi tiết hóa đơn
BillDetail.addBillDetail = (billId, productId, quantity, price, result) => {
    const query = `
        INSERT INTO bill_details (bill_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
    `;
    conn.query(query, [billId, productId, quantity, price], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, { id: res.insertId, billId, productId, quantity, price });
        }
    });
};

// Lấy tất cả chi tiết của hóa đơn
BillDetail.getBillDetailsByBillId = (billId, result) => {
    const query = `
        SELECT bd.*, p.name AS product_name
        FROM bill_details bd
        JOIN products p ON bd.product_id = p.id
        WHERE bd.bill_id = ?
    `;
    conn.query(query, [billId], (err, res) => {
        if (err) {
            result(err, null);
        } else {
            result(null, res);
        }
    });
};

module.exports = BillDetail;
