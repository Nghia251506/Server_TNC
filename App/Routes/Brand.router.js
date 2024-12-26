module.exports = function(router){
    var BrandController = require('../Controllers/Brand.controller');
    router.get('/brand/list', BrandController.list);
    router.get('/brand/detail/:id', BrandController.detail);
    router.post('/brand/add', BrandController.add);
    router.delete('/brand/delete/:id', BrandController.delete);
    router.put('/brand/update/:id', BrandController.update);
}