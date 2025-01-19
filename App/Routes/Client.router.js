module.exports = function(router){
    var ProductControler = require('../Controllers/Product.controller');
    var CategoryControler = require('../Controllers/Category.controller');
    router.get('/api/ListProductByCategory/:category_id', ProductControler.getProductByCategory);
    router.get('/api/:name/:id', ProductControler.detail);
    router.get('/api/list-category', CategoryControler.listCategory);
}