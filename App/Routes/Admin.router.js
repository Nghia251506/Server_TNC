module.exports = function(router){
    var ProductControler = require('../Controllers/Product.controller');
    var DetailController = require('../Controllers/ProductDetail.controller');
    var BrandController = require('../Controllers/Brand.controller');
    var CategoryController = require('../Controllers/Category.controller');
    var BillController = require('../Controllers/Bill.controller');
    var CustomerController = require('../Controllers/Customer.controller');
    router.get('/admin/list-product', ProductControler.list);
    router.post('/admin/add-detail', DetailController.add);
    router.post('/admin/detailbyproductid', DetailController.DetailByProductId);
    router.post('/admin/add-product', ProductControler.add);
    router.get('/api/detail/:id', ProductControler.detail);
    router.delete('/admin/delete', ProductControler.delete);
    router.put('/admin/add-product/:id', ProductControler.update);
    router.get('/admin/customers',CustomerController.list);
    router.post('/admin/add-customer', CustomerController.add);
    router.get('/admin/list-brand', BrandController.list);
    router.post('/admin/add-brand', BrandController.add);
    router.delete('/admin/delete-brand', BrandController.delete);
    router.put('/admin/update-brand', BrandController.update);
    router.get('/admin/list-category', CategoryController.listCategory);
    router.post('/admin/add-category', CategoryController.add);
    router.delete('/admin/delete-category', CategoryController.delete);
    router.put('/admin/update-category/:id', CategoryController.update);
    router.post('/admin/add-bill', ProductControler.getProductByCode);
    router.get('/admin/list-bill', BillController.list);
    router.post('/admin/add-bill', BillController.add);
}