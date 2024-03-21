const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();


router.post('/refresh-token', (req, res) => {
    console.log(req.body);
    const refreshToken = req.body.refreshToken;

    // 检查刷新令牌是否存在
    if (!refreshToken) {
        return res.status(400).json({ error: 'Refresh token not provided.' });
    }

    // 验证刷新令牌
    try {
        const decoded = jwt.verify(refreshToken, 'your_refresh_token_secret');

        // 这里可以根据需要进行其他验证或检查

        // 生成新的访问令牌
        const accessToken = jwt.sign({ userId: decoded.userId }, 'your_access_token_secret', { expiresIn: '15m' });
        // 返回新的访问令牌
        res.json({ accessToken });
    } catch (err) {
        return res.status(401).json({ error: 'Invalid refresh token.' });
    }
});

module.exports = router;