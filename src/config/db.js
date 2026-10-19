const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('❌ Lỗi kết nối CSDL PostgreSQL:', err);
    } else {
        console.log(`✅ Đã kết nối thành công tới CSDL: ${process.env.DB_NAME}`);
        release();
    }
});

module.exports = pool;