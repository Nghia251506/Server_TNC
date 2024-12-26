module.exports = function(router){
    var CategoryController = require('../Controllers/Category.controller');
    router.get('/category/list', CategoryController.list);
    router.get('/category/detail/:id', CategoryController.detail);
    router.post('/category/add', CategoryController.add);
    router.delete('/category/delete/:id', CategoryController.delete);
    router.put('/category/update/:id', CategoryController.update);
}