const conn = require('../common/connect');

const Supplier = function(supplier){
    this.id = supplier.id;
    this.supplier_code = supplier.supplier_code;
    this.name = supplier.name;
    this.phone = supplier.phone;
    this.address = supplier.address;
    this.email = supplier.email;
    this.company = supplier.email;
    this.tax_code = supplier.email;
    this.create_at = supplier.create_at;
    this.update_at = supplier.update_at;
}

Supplier.getSuppliers = function (result){
    conn.query("SELECT * FROM suppliers ORDER BY id DESC", function(err, supplier){
        if(err){
            result(null, err);
        } else{
            result(supplier);
        }
    });
}

Supplier.create = function(data, callback){
    const query = "CALL InsertSupplier (?,?,?,?,?,?)";
    const params = [
        data.name,
        data.phone,
        data.address,
        data.email,
        data.company,
        data.tax_code
    ]
    conn.query(query, params, function (err, results) {
        if(err){
            console.error("Error inserting customer:", err);
            callback(err, null);
        }else{
            console.log("Supplier created successfully: ", results);
            callback(null, results);
        }
    });
}

Supplier.update = function(id,data,callback){
    const query = "UPDATE suppliers SET name =?, phone =?, address =?, email =?, company =?, tax_code =? WHERE id =?"
    const values = [
        data.name,
        data.phone,
        data.address,
        data.email,
        data.company,
        data.tax_code,
        id
    ]
    conn.query(query, values, function (err, results) {
        if(err){
            console.error("Error updating supplier:", err);
            callback(err, null);
        }else{
            console.log("Supplier updated successfully: ", results);
            callback(null, results);
        }
    });
}

module.exports = Supplier;