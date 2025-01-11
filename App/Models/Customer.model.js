const conn = require('../common/connect');

const Customer = function(customer){
    this.id = customer.id;
    this.name = customer.customer_name;
    this.phone = customer.phone;
    this.address = customer.address;
    this.birth_day = customer.birth_day;
    this.create_at = customer.create_at;
    this.update_at = customer.update_at;
}

Customer.getBills = function (result){
    conn.query("SELECT * FROM customers ORDER BY id DESC", function(err, customer){
        if(err){
            result(null, err);
        } else{
            result(customer);
        }
    });
}

Customer.create = function(data, callback){
    const query = "INSERT INTO customers VALUES (?,?,?,?)";
    const params = [
        data.customer_name,
        data.phone,
        data.address,
        data.birth_day
    ]
    conn.query(query, params, function (err, results) {
        if(err){
            console.error("Error inserting customer:", err);
            callback(err, null);
        }else{
            console.log("Customer created successfully: ", results);
            callback(null, results);
        }
    });
}

module.exports = Customer;