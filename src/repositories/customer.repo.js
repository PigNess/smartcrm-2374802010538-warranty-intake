const pool = require('../config/db');

const createCustomer = async (name, phone, email) => {
    const result = await pool.query(
        'INSERT INTO customers (name, phone, email) VALUES ($1, $2, $3) RETURNING *',
        [name, phone, email]
    );
    return result.rows[0];
};

const getAllCustomers = async () => {
    const result = await pool.query('SELECT * FROM customers ORDER BY id DESC');
    return result.rows;
};

const updateCustomer = async (id, name, phone, email) => {
    const result = await pool.query(
        'UPDATE customers SET name = $1, phone = $2, email = $3 WHERE id = $4 RETURNING *',
        [name, phone, email, id]
    );
    return result.rows[0];
};

const deleteCustomer = async (id) => {
    const result = await pool.query('DELETE FROM customers WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
};

module.exports = {
    createCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer
};