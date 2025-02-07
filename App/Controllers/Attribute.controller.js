const AttributeModel = require('../Models/Attribute.model');

exports.list = function(req,res){
    AttributeModel.getAttributes(function(data){
        res.send(data);
    })
}
