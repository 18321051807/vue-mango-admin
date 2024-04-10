// responseHandler.js

const responseHandler = (req, res, next) => {
    // 添加成功响应方法
    res.success = (data) => {
        res.status(200).json({
            success: true,
            data: data,
            code: 200
        });
    };

    // 添加错误响应方法
    res.error = (message, statusCode = 500) => {
        res.status(statusCode).json({
            success: false,
            error: {
                message: message
            }
        });
    };

    next();
};

module.exports = responseHandler;