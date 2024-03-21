
const express = require('express');
const app = express();

// 中间件用于解析请求的 JSON 数据
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 添加 cors 中间件
const cors = require('cors');
app.use(cors());

// 应用中间件
const responseHandler = require("./modules/responseHandler")
app.use(responseHandler);

const generateToken = require("./modules/generateToken")

const refreshTokenRouter = require("./modules/refreshTokenRouter")


app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === '123456') {

        const user = {
            id: 1,
            username: 'admin',
            role: ["admin"]
        };
        const token = generateToken(user.id, user.role);
        const expires = Date.now() + 60 * 60 * 2
        let data = {
            ...user, token, expires
        }
        res.success(data);
    }
});

// 错误处理中间件
app.use((err, req, res, next) => {
    res.error(err.message);
});

const port = 8099; // 或你想要监听的端口号
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});