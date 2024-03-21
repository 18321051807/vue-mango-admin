
const jwt = require('jsonwebtoken');
const generateToken = (userId, role) => {
    // 定义令牌的有效负载（Payload）
    const payload = {
        userId: userId,
        role: role
    };
    const options = {
        // 令牌的过期时间为1小时
        expiresIn: '1h'
    };
    const token = jwt.sign(payload, 'your_private_key', options);
    return token;
}

module.exports = generateToken