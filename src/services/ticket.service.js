// src/services/ticket.service.js
const pool = require('../config/db');

const createTicket = async (ticketData) => {
    const customerId = ticketData.customerId || ticketData.customer_id;
    const serialNo = ticketData.serialNo || ticketData.serial_no;
    const issueDescription = ticketData.issueDescription || ticketData.issue_description || 'Không có mô tả';

    if (!customerId || !serialNo) {
        throw new Error('Mã khách hàng và số serial thiết bị là thông tin bắt buộc!');
    }

    const customerRes = await pool.query('SELECT * FROM customers WHERE id = $1', [customerId]);
    if (customerRes.rows.length === 0) {
        throw new Error('Khách hàng không tồn tại!');
    }
    const customer = customerRes.rows[0];

    const deviceRes = await pool.query('SELECT * FROM devices WHERE serial_number = $1 OR serial_no = $1', [serialNo]);
    const deviceName = deviceRes.rows.length > 0 ? deviceRes.rows[0].device_name : 'Thiết bị bảo hành';

    const existingTicket = await pool.query(
        'SELECT * FROM tickets WHERE serial_no = $1 AND status IN ($2, $3)', 
        [serialNo, 'OPEN', 'MO']
    );
    if (existingTicket.rows.length > 0) {
        const error = new Error('PHIEU_DANG_MO');
        error.statusCode = 409;
        throw error;
    }

    const ticketCode = 'TCK-' + Date.now().toString().slice(-6);

    const result = await pool.query(
        `INSERT INTO tickets (ticket_code, customer_id, serial_no, customer_name, phone, email, device_name, issue_description, status) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
        [ticketCode, customerId, serialNo, customer.name, customer.phone, customer.email, deviceName, issueDescription, 'OPEN']
    );

    return result.rows[0];
};

const getAllTickets = async () => {
    const result = await pool.query('SELECT * FROM tickets ORDER BY created_at DESC');
    return result.rows;
};

const updateTicketStatus = async (id, status) => {
    const result = await pool.query(
        'UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *',
        [status, id]
    );
    return result.rows[0];
};

const deleteTicket = async (id) => {
    const result = await pool.query(
        'DELETE FROM tickets WHERE id = $1 RETURNING *',
        [id]
    );
    return result.rows[0];
};

module.exports = {
    createTicket,
    getAllTickets,
    updateTicketStatus,
    deleteTicket
};