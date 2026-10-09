CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(10) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE issue_category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE device (
    device_id SERIAL PRIMARY KEY,
    customer_id INT NOT NULL REFERENCES customer(customer_id),
    serial_imei VARCHAR(50) UNIQUE NOT NULL,
    purchase_date DATE,
    warranty_months INT DEFAULT 12
);

CREATE TABLE ticket (
    ticket_id SERIAL PRIMARY KEY,
    device_id INT NOT NULL REFERENCES device(device_id),
    category_id INT NOT NULL REFERENCES issue_category(category_id),
    priority VARCHAR(20) NOT NULL, 
    sla_deadline TIMESTAMP,
    status VARCHAR(50) DEFAULT 'RECEIVED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ticket_status_log (
    log_id SERIAL PRIMARY KEY,
    ticket_id INT NOT NULL REFERENCES ticket(ticket_id) ON DELETE CASCADE,
    old_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Chỉ mục đáp ứng yêu cầu NFR01 (< 1.5 giây)
CREATE INDEX idx_customer_phone ON customer(phone);
CREATE INDEX idx_device_serial ON device(serial_imei);