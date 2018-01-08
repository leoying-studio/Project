var UsersModel = require("./../models/users");
var Body = require("./body");
var Utils = require("./../utils");

exports.loginView = function(req, res, next) {
    UsersModel.getNavs().then(function(doc) {
		res.render("login", Body({navs: doc}));
	});
}

exports.registerView = function(req, res, next) {
    UsersModel.getNavs().then(function(doc) {
		res.render("register", Body({navs: doc}));
	});
}

exports.registerSubmit = function(req, res) {
	var query = req.query;
    var username = query.username;
    var password = query.password;
    var passAgain = query.passAgain;
    var email = query.email;
    try {
        if (!username) {
            throw new Error("用户名不能为空!");
        }
        if (password.length < 6) {
            throw new Error("密码长度不能小于6个!");
        }
        if (password !== passAgain) {
            throw new Error("两次密码输入不一致");
        }
        if (!email) {
            throw new Error("邮箱不能为空");
        } 
        // if (!Utils.validateEmail(email)) {
        //     throw new Error("邮箱格式不合法");
        // }
    } catch(e) {
        req.flash("error", e.message);
        return res.redirect("/user/register/view");
    }

    // 查询当前用户名是否注册
    UsersModel.findOne({username}).then((error, user) => {
        if (user) {
            req.flash("error", "当前用户名已经存在");
            res.redirect("/regview");
        }
        if (!error) {
            // 开始注册
            new UsersModel({
                username,
                password,
                passAgain,
                email,
            }).save((err, res) => {
                if (err) {
                    req.flash("error", "注册失败");
                } else {
                    req.flash("success", "注册成功");
                }
                res.redirect("/user/reigster/view");
            })
        }
    });
}


exports.loginSubmit = function(req, res, next) {
	var body = req.body;
	var username = body.username;
	var password = body.password
	try {
		if (!username) {
			throw new Error("用户名不能为空");
		}
		if (!password) {
			throw new Error("密码不能为空");
		}
	
	}catch(e) {
		req.flash("error", e.message);
		res.redirect("/user/login/view");
	}

	username = username.replace(/\s/g, "");
	password = password.replace(/\s/g, "");

	UsersModel.findOne({
        username,
        password
	}, function(err, doc) {
        if (err) {
           return res.redirect("/user/login/view");
        }
        if (doc) {
			req.session.user = username;
			if (username !== "admin") {
				return res.redirect("/");
			}
			return res.redirect("/manager");
        }
        req.flash('error', '用户名不存在或密码错误');
        return res.redirect("/user/login/view");
    });
}