const conn = require('../common/connect');

const Bill = function(bill){
    this.id = bill.id;
    this.user_id = bill.user_id;
    this.customer_id = bill.customer_id;
    this.bill_code = bill.bill_code;
    this.total_price = bill.total_price;
    this.payment_method = bill.payment_method;
    this.status = bill.status;
    this.create_at = bill.create_at;
    this.update_at = bill.update_at;
}

Bill.createBill = function(data, callback){
    const query = `Call createBill(?,?,?,?,?,?)`;
    const params = [
        data.user_id,
        data.customer_id,
        data.bill_code,
        data.total_price,
        data.payment_method,
        data.status
    ];
    conn.query(query, params, function(err, results){
        if(err){
            console.error("Lỗi khi gọi Stored Procedure: ");
            callback(err, null);
        } else{
            console.log("Kết quả trả về: ", results);
            callback(null, results);
        }
    });
};

Bill.get_all = function(result){
    conn.query("SELECT b.* cu.customer_name FROM bills as b INNER JOIN users as us ON b.user_id = us.id INNER JOIN customers as cu ON b.customer_id = cu.id ORDER BY id DESC", function(err, bill){
        if(err){
            result(null, err);
        } else{
            result(bill);
        }
    });
};