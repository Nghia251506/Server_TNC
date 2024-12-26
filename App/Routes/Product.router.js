module.exports = function(router){
    var ProductControler = require('../Controllers/Product.controller');
    router.get('/api/list-product', ProductControler.list);
    router.get('/api/detail/:id', ProductControler.detail);
    router.post('/api/add-product', ProductControler.add);
    router.delete('/api/delete', ProductControler.delete);
    router.put('/api/update/:id', ProductControler.update);
}