const conn = require('../common/connect');

const Brand = function(brand){
    this.id = brand.id;
    this.name = brand.name;
}

Brand.get_all = function(result){
    conn.query("SELECT * FROM brands", function(err, brand){
        if(err){
            result(null, err);
        }else{
            result(brand);
        }
    });
}

Brand.getById = function(id, result){
    conn.query(`SELECT * FROM brands WHERE id = ${id}`, function(err, brand){
        if(err){
            return null;
        }else{
            result(brand);
        }
    });
}

Brand.create = function(data, callback){
    const query = "INSERT INTO brands (name) VALUES (?)"
    const params = [
        data.name,
    ]

    conn.query(query, params, function(err, results){
        if(err){
            console.error("Lỗi khi thêm thương hiệu:", err);
            callback(err, null);
        }else{
            console.log("Kết quả trả về:", results);
            callback(null, results);
        }
    });
}

Brand.remove = function(id, callback){
    const query = "DELETE FROM brands WHERE id =?"
    conn.query(query, [id], function(err, result){
        if(err){
            console.error("Lỗi khi thực hiện query:", err);
            callback(err, null);
        }else{
            callback(null, result);
        }
    });
}

Brand.update = function(id, data, callback){
    const query = "UPDATE brands SET name =? WHERE id =?"
    conn.query(query, [data.name, id], function(err, res){
        if(err){
            console.error("Lỗi khi cập nhật thương hiệu:", err);
            result(err, null);
        }else{
            result(null, res);
        }
    });
}

module.exports = Brand;