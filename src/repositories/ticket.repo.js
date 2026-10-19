const pool = require('../config/db');

const createTicket = async (customerName, deviceName, issueDescription) => {
    const result = await pool.query(
        'INSERT INTO tickets (customer_name, device_name, issue_description) VALUES ($1, $2, $3) RETURNING *',
        [customerName, deviceName, issueDescription]
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

// Đặt toàn bộ module.exports xuống tận cùng bên dưới cùng một lúc
module.exports = {
    createTicket,
    getAllTickets,
    updateTicketStatus,
    deleteTicket
};