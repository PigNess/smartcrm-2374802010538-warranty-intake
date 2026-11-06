const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Kết nối CSDL PostgreSQL
require('./src/config/db');

const app = express();

// Cấu hình Middleware
app.use(cors());
app.use(express.json());

// 1. Khai báo Routes cho Auth (Đăng nhập - Không cần bảo vệ)
const authRoutes = require('./src/routes/auth.routes');
app.use('/api/auth', authRoutes);

// 2. Khai báo Routes cho Customers
const customerRoutes = require('./src/routes/customer.routes');
app.use('/api/customers', customerRoutes);

// 3. Khai báo Routes cho Tickets (ĐÃ BẢO VỆ BẰNG TOKEN & PHÂN QUYỀN)
const { verifyToken } = require('./src/middlewares/auth.middleware');
const ticketRoutes = require('./src/routes/ticket.routes');
app.use('/api/tickets', verifyToken, ticketRoutes); 

// Khởi động Server
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});