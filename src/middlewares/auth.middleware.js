const jwt = require('jsonwebtoken');
const SECRET_KEY = 'smartcrm_secret_key_2026'; // Khóa bí mật

const verifyToken = (req, res, next) => {
    // Đọc token từ header
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: 'Không tìm thấy token xác thực' });
    }

    const token = authHeader.split(' ')[1]; // Format: Bearer <token>
    
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Lưu thông tin user (gồm role) vào req để dùng sau
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};

module.exports = { verifyToken };