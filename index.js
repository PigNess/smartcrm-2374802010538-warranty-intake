const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Kết nối CSDL PostgreSQL
require('./src/config/db');

const app = express();

// Cấu hình Middleware
app.use(cors());
app.use(express.json());

// Khai báo Routes cho Tickets
const ticketRoutes = require('./src/routes/ticket.routes');
app.use('/api/tickets', ticketRoutes);

// Khởi động Server
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server đang chạy tại http://localhost:${PORT}`);
});