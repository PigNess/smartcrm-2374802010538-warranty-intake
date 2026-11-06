// app.js
const express = require('express');
const app = express();

app.use(express.json());

// Gắn kết các routes chính thức của ứng dụng
const ticketRoutes = require('./src/routes/ticket.routes');
const customerRoutes = require('./src/routes/customer.routes');
const authRoutes = require('./src/routes/auth.routes');

app.use('/api/tickets', ticketRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/auth', authRoutes);

module.exports = app;