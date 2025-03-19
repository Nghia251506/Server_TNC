const conn = require('../common/connect');

ProductDetail = function(productdetail){
    this.id = productdetail.id;
    this.product_id = productdetail.product_id;
    this.attribute_id = productdetail.attribute_id;
    this.val = productdetail.val;
    this.supplier_id = productdetail.supplier_id;
}


ProductDetail.getProductDetailById = function(id, result){
    conn.query(`SELECT pd.*, at.*, sp.*  FROM product_details as pd INNER JOIN attributes as at ON at.id = pd.attribute_id INNER JOIN suppliers as sp ON sp.id = pd.supllier_id WHERE product_id = ${id}`, function(err, productdetail){
        if(err){
            result(null, err);
        }else{
            result(productdetail);
        }
    });
}

ProductDetail.createProductDetail = function(productdetail, result){
    conn.query('INSERT INTO product_details(product_id, attribute_id, val, supplier_id) VALUES (?,?,?,?)', productdetail, function(err, res){
        if(err){
            result(err, null);
        }else{
            result(null, res.insertId);
        }
    });
}

ProductDetail.updateProductDetail = function(id, productdetail, result){
    conn.query('UPDATE product_details SET attribute_id = ?, val = ?, supplier_id = ? WHERE product_id=?', [productdetail.attribute_id, productdetail.val, productdetail.supplier_id, id], function(err, res){
        if(err){
            result(null, err);
        }else{
            result(null, res.affectedRows);
        }
    });
}

module.exports = ProductDetail;