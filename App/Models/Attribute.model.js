const conn = require('../common/connect');

const Attibute = function(attribute){
    this.id = attribute.id;
    this.name = attribute.name;
}

Attibute.getAttributes = function (result){
    conn.query("SELECT * FROM attributes ORDER BY id DESC", function(err, attribute){
        if(err){
            result(null, err);
        } else{
            result(attribute);
        }
    });
}

module.exports = Attibute;