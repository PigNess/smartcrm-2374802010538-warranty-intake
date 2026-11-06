const jwt = require('jsonwebtoken');
const SECRET_KEY = 'smartcrm_secret_key_2026';

// Dữ liệu người dùng mẫu (Role)
const users = [
    { id: 1, username: 'letan', password: '123', role: 'RECEPTIONIST' },
    { id: 2, username: 'quanly', password: '123', role: 'MANAGER' }
];

const login = (req, res) => {
    const { username, password } = req.body;
    
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ error: 'Sai tài khoản hoặc mật khẩu' });
    }

    // Tạo token chứa ID và Vai trò (Role)
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
    
    res.status(200).json({ 
        message: 'Đăng nhập thành công', 
        token: token,
        role: user.role
    });
};

module.exports = { login };