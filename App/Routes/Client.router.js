module.exports = function(router){
    var ProductControler = require('../Controllers/Product.controller');
    var CategoryControler = require('../Controllers/Category.controller');
    router.get('/api/ListProductByCategory/:category_id', ProductControler.getProductByCategory);
    router.get('/api/list-product', ProductControler.list);
    router.get('/:name/:id', ProductControler.detail);
    router.get('', CategoryControler.listCategory);
}