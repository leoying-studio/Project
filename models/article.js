var mongoose = require('../db').mongoose;
var DBSuper = require('./super');
var Utils = require("./../utils/index");

// 定义映射的集合结构模型
var Scheam = new mongoose.Schema({
	title: String,
	description: String,
	img: { type: "string" },
	navId: String,
	serverTime: { type: String, default: Utils.getTime(new Date(), "s") },
	categoriesId: [
		{ id: { type: 'string' } }
	],
	recommend: {type: Boolean, default: false},
	content: String
});

Scheam.plugin(DBSuper.regNav);
Scheam.plugin(DBSuper.regFind);


var Article = mongoose.model('article', Scheam);
module.exports = Article;