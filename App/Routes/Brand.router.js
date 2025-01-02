module.exports = function(router){
    var BrandController = require('../Controllers/Brand.controller');
    router.get('/api/list-brand', BrandController.list);
    router.get('/api/detail/:id', BrandController.detail);
    router.post('/api/add-brand', BrandController.add);
    router.delete('/api/delete-brand', BrandController.delete);
    router.put('/api/update-brand', BrandController.update);
}