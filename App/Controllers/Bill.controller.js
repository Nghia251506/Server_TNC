const BillModel = require('../Models/Bill.model');

exports.list = function(req, res){
    BillModel.get_all(function(data){
        res.send(data);
    });
}

exports.add = function (req, res) {
    const data = req.body;
    BillModel.createBill(data, function(err, result){
        if(err){
            res.status(500).send({error: "L��i khi tạo hóa đơn"});
        } else{
            res.status(201).send({message: "Tạo hóa đơn thành công", result});
        }
    });
}