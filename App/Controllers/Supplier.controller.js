const SupplierModel = require('../Models/Supplier.model');

exports.list = function(req,res){
    SupplierModel.getSuppliers(function(data){
        res.send(data);
    })
}

exports.add = function(req, res){
    const data = req.body;

    if(
        !data.name ||
        !data.phone ||
        !data.address ||
        !data.email 
    ){
        return res.status(400).send({error: "Thiếu dữ liệu đầu vào"});
    }

    SupplierModel.create(data, function(err, result){
        if(err){
            console.error("Lỗi khi tạo nhà cung cấp:", err);
            res.status(500).send({error: "Không thể tạo khách hàng"});
        }else{
            res.status(201).send({message: "Tạo nhà cung cấp thành công", result});
        }
    })
}

exports.update = function(req,res){
    const id = req.body.id;
    const data = req.body;

    SupplierModel.update(id, data, function(err, result){
        if(err){
            console.error("Lỗi khi cập nhật nhà cung cấp:", err);
            res.status(500).send({error: "Không thể cập nhật nhà cung cấp"});
        } else{
            res.status(200).send({message: "Cập nhật nhà cung cấp thành công", result});
        }
    })
}