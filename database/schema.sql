-- Xóa bảng cũ để làm mới cấu trúc hoàn toàn
DROP TABLE IF EXISTS tickets CASCADE;
DROP TABLE IF EXISTS devices CASCADE;
DROP TABLE IF EXISTS customers CASCADE;

-- 1. Bảng Khách hàng
CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Thiết bị
CREATE TABLE devices (
    id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customers(id) ON DELETE CASCADE,
    device_name VARCHAR(100),
    serial_number VARCHAR(100) UNIQUE NOT NULL,
    purchase_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Bảng Phiếu bảo hành (Chuẩn hóa lại để khớp với API Test)
CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    ticket_code VARCHAR(50) UNIQUE,
    customer_id INT REFERENCES customers(id) ON DELETE CASCADE,
    serial_no VARCHAR(100) NOT NULL,
    issue_description TEXT,
    status VARCHAR(50) DEFAULT 'OPEN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);