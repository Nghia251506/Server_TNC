module.exports = function(router){
    var CategoryController = require('../Controllers/Category.controller');
    router.get('/api/list-category', CategoryController.list);
    router.get('/api/detail/:id', CategoryController.detail);
    router.post('/api/add-category', CategoryController.add);
    router.delete('/api/delete-category/:id', CategoryController.delete);
    router.put('/api/update-category/:id', CategoryController.update);
}