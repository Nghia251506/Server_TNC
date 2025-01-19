const conn = require('../common/connect');

ProductDetail = function(productdetail){
    this.id = productdetail.id;
    this.product_id = productdetail.product_id;
    this.label = productdetail.label;
    this.item_1 = productdetail.item_1;
    this.item_2 = productdetail.item_2;
    this.item_3 = productdetail.item_3;
    this.item_4 = productdetail.item_4;
    this.item_5 = productdetail.item_5;
    this.item_6 = productdetail.item_6;
    this.item_7 = productdetail.item_7;
    this.item_8 = productdetail.item_8;
}


ProductDetail.getProductDetailById = function(id, result){
    conn.query(`SELECT * FROM product_details WHERE product_id = ${id}`, function(err, productdetail){
        if(err){
            result(null, err);
        }else{
            result(productdetail);
        }
    });
}

ProductDetail.createProductDetail = function(productdetail, result){
    conn.query('INSERT INTO product_details(product_id, label, item_1,item_2,item_3,item_4,item_5,item_6,item_7,item_8) VALUES (?,?,?,?,?,?,?,?,?,?)', productdetail, function(err, res){
        if(err){
            result(err, null);
        }else{
            result(null, res.insertId);
        }
    });
}

ProductDetail.updateProductDetail = function(id, productdetail, result){
    conn.query('UPDATE product_details SET label=?, item_1=?, item_2=?, item_3=?, item_4=?, item_5=?, item_6=?, item_7=?, item_8=? WHERE product_id=?', [productdetail.label, productdetail.item_1, productdetail.item_2, productdetail.item_3, productdetail.item_4, productdetail.item_5, productdetail.item_6, productdetail.item_7, productdetail.item_8, id], function(err, res){
        if(err){
            result(null, err);
        }else{
            result(null, res.affectedRows);
        }
    });
}

module.exports = ProductDetail;