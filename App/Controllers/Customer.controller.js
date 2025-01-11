const CustomerModel = require('../Models/Customer.model');

exports.list = function(req,res){
    CustomerModel.getBills(function(data){
        res.send(data);
    })
}

exports.add = function(req, res){
    const data = req.body;

    if(
        !data.customer_name ||
        !data.phone ||
        !data.address ||
        !data.birth_day
    ){
        return res.status(400).send({error: "Thiếu dữ liệu đầu vào"});
    }

    CustomerModel.create(data, function(err, result){
        if(err){
            console.error("L��i khi tạo khách hàng:", err);
            res.status(500).send({error: "Không thể tạo khách hàng"});
        }else{
            res.status(201).send({message: "Tạo khách hàng thành công", result});
        }
    })
}