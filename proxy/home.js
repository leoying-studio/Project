var ArticleModel = require("./../models/article");

exports.getAll = function(callback) {
    var navs = ArticleModel.getNavs();
    var recommend = ArticleModel.find({}).sort({"createdTime": 1}).limit(7);
    return Promise.all([navs, recommend]).then(function(values, state) {
        callback({
            navs: values[0],
            banners: values[1]
        });
    });
}

exports.getBanners = function(callback) {
    ArticleModel.find({
        recommend: true
    }).sort({"createdTime": 1}).limit(7).lean().then(function(data) {
        if (data.length === 0) {
            ArticleModel.find({}).sort({"createdTime": 1}).limit(7).lean().then(function(data) {
                callback(data);
            });
        } 
        callback(data);
    });
}