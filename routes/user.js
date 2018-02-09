var mongoose = require('mongoose'),
    DB_URL = 'mongodb://blogUser:blogUser@localhost:27017/blog';

/**
* 连接
*/
mongoose.connect(DB_URL);
var userSchema = require('../schema/userSchema')
var db = mongoose.createConnection(DB_URL);
var User = db.model('user', userSchema);

exports.login = function (req, res) {
    User.findOne({ userName: req.body.userName }, function (err, userInfo) {
        if (!err) {
            if (!userInfo) {
                res.json({ code: 10, message: "用户名或密码错误" })
                return;
            }
            if (userInfo.password === req.body.password) {
                req.session.regenerate(function (err) {
                    if (err) {
                        return res.json({ code: 2, message: '登录失败' });
                    }
                    req.session.loginUser = userInfo.userName;
                    res.json({ code: 0, message: "登录成功" })
                });
            } else
                res.json({ code: 10, message: "密码错误" })
        } else {
            res.json({ code: err.code, message: err.message })
        }
    })
}

exports.logout = function (req, res, next) {
    // 备注：这里用的 session-file-store 在destroy 方法里，并没有销毁cookie
    // 所以客户端的 cookie 还是存在，导致的问题 --> 退出登陆后，服务端检测到cookie
    // 然后去查找对应的 session 文件，报错
    // session-file-store 本身的bug    

    req.session.destroy(function (err) {
        if (err) {
            res.json({ ret_code: 2, ret_msg: '退出登录失败' });
            return;
        }
        res.clearCookie("connect.sid");
        res.redirect('/');
    });
};

exports.getUserInfo = function (req, res) {
    User.findOne({ userName: req.session.loginUser }, function (err, userInfo) {
        console.log(userInfo)
        if (!err) {
            let data = {
                userName: userInfo.userName,
                realName: userInfo.realName,
                avater: userInfo.avater
            }
            res.json({ code: 0, data })
        } else {
            res.json({ code: 1, message: '查询失败' })
        }
    })
};


exports.sign = function (req, res) {
    var userInsert = new User(req.body)
    userInsert.save(function (err) {
        if (!err) {
            res.json({ code: 0, message: "注册成功" })
        } else {
            res.json({ code: err.code, message: err.message })
        }
    })
}

