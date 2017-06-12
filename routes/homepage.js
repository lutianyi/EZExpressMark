/**
 * Created by lutianyi on 2017/5/9.
 */
var express = require('express');
var router = express.Router();
var database = require('./database');
var status = require('./status');
var multiparty = require('multiparty');
var fs = require('fs');

router.post('/homepage', function (req, res) {

    var body = req.body;

    if (!body.username) {

        res.jsonp(status.failure('参数错误', {}));

        return;
    }

    database.findData('homepage', {}, function (result) {

        console.log(result);

        res.jsonp(status.success('请求成功', result));
    })
});

router.post('/update', function (req, res) {

    var form = new multiparty.Form({uploadDir: '/Users/lutianyi/WebServer/'});

    //设置编辑
    form.encoding = 'utf-8';
    //设置单文件大小限制
    form.maxFilesSize = 5 * 1024 * 1024;
    //form.maxFields = 1000;  设置所以文件的大小总和

    form.parse(req, function(err, fields, files) {

        var images = new Array();

        for (var i = 0; i < files.image.length; i++) {

            var file = files.image[i];

            //获取路径
            var oldpath = file.path;

            //文件后缀处理格式
            if (oldpath.indexOf('.jpg') >= 0) {

                var suffix = '.jpg';

            } else if (oldpath.indexOf('.png') >= 0) {

                var suffix = '.png';

            } else if (oldpath.indexOf('.jpeg') >= 0) {

                var suffix = '.jpeg';

            } else {

                res.jsonp(status.failure('请传入正确格式的图片', {}));
                return;
            }

            var timestamp = new Date().getTime();

            var filename = timestamp + i + suffix;

            fs.renameSync(file.path, form.uploadDir + filename);

            images.push('http://127.0.0.1/' + filename);
        }

        var data = {'title': fields.title[0], 'description': fields.description[0], 'nickname': fields.nickname[0], 'images': images};

        console.log(data);

        database.insertData('homepage', data, function (result) {

            res.jsonp(status.success('上传成功', {}));
        })
    });
});

module.exports = router;