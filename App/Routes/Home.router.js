module.exports = function(router){
    var HomeController = require('../Controllers/Home.controller');

    router.get('/', HomeController.home);

    router.get('/api', HomeController.about);
};