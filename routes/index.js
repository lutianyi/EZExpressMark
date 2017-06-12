var express = require('express');
var router = express.Router();
var database = require('./database');
var status = require('./status');

router.post('/register', function(req, res) {

  var body = req.body;

  if (!body.username || !body.password || !body.realPassword || !body.nickname) {

    res.jsonp(status.failure('参数错误', {}));

    return;
  }

  if (body.username.length < 8) {

    res.jsonp(status.failure('账号不能小于8位', {}));

    return;
  }

  if (body.password.length < 8) {

    res.jsonp(status.failure('密码不能小于8位', {}));

    return;
  }

  database.findData('user', {'username': body.username}, function (result) {

     if (result.length > 0) {

       res.jsonp(status.failure('该账号已被注册', {}));

     } else {

        if (body.password == body.realPassword) {

           database.insertData('user', {'username': body.username, 'password': body.password, 'nickname': body.nickname}, function (result) {

             res.jsonp(status.success('注册成功', {}));

           });

        } else {

          res.jsonp(status.failure('两次密码输入不一致', {}));

        }
    }
  });
});

// 以/login路径建立post请求
router.post('/login', function(req, res) {

  var body = req.body;

  // 判断是否有所有需要的参数
  if (!body.username || !body.password) {

    // 返回JSONP格式状态为失败的response
    res.jsonp(status.failure('参数错误', {}));

    return;
  }

  // 使用mongodb查询数据
  database.findData('user', {'username': body.username, 'password': body.password}, function (result) {

    if (result.length > 0) {

      res.jsonp(status.success('登录成功', {'nickname': result[0].nickname}));

    } else {

      res.jsonp(status.failure('账号或密码错误', {}));
    }
  });
});


module.exports = router;