/**
 * Created by lutianyi on 2017/5/9.
 */
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/ezerdb';

var db;

MongoClient.connect(DB_CONN_STR, function(err, database) {

    db = database;

    console.log("连接成功！" + database);
});

var insertData = function(name, data, callback) {

    var collection = db.collection(name);

    collection.insert(data, function (err, result) {

        if(err) {

            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}

var findData = function(name, data, callback) {

    var collection = db.collection(name);

    collection.find(data, {"_id": 0}).toArray(function(err, result) {

        if(err) {

            console.log('Error:'+ err);
            return;
        }
        callback(result);
    });
}

exports.findData=findData;
exports.insertData=insertData;