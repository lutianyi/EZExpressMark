/**
 * Created by lutianyi on 2017/5/9.
 */
function success(message, data) {

    return {

        'status' : 1,
        'message': message,
        'data' : data
    }
};

function failure(message, data) {

    return {

        'status' : 0,
        'message': message,
        'data' : data
    }
};

exports.success = success;
exports.failure = failure;