const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'smartcrm' // Đổi tên database nếu của bạn khác
});

async function runDatabaseSetup() {
    try {
        console.log('⏳ Đang kết nối cơ sở dữ liệu...');
        
        // 1. Chạy file schema.sql để tạo bảng
        const schemaPath = path.join(__dirname, '../database/schema.sql');
        const schemaSql = fs.readFileSync(schemaPath, 'utf8');
        console.log('⏳ Đang tạo cấu trúc bảng (Migration)...');
        await pool.query(schemaSql);
        console.log('✅ Tạo bảng thành công!');

        // 2. Chạy file seed.sql để chèn dữ liệu
        const seedPath = path.join(__dirname, '../database/seed.sql');
        const seedSql = fs.readFileSync(seedPath, 'utf8');
        console.log('⏳ Đang chèn dữ liệu mẫu (Seeding)...');
        await pool.query(seedSql);
        console.log('✅ Chèn dữ liệu mẫu thành công!');

    } catch (error) {
        console.error('❌ Lỗi khi setup database:', error);
    } finally {
        await pool.end();
        console.log('Đã đóng kết nối CSDL.');
    }
}

runDatabaseSetup();