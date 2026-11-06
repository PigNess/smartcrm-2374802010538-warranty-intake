-- Chèn dữ liệu mẫu Khách hàng
INSERT INTO customers (name, phone, email) VALUES 
('Nguyễn Văn Khách', '0901234567', 'khachhang1@gmail.com'),
('Trần Thị Hàng', '0918765432', 'khachhang2@gmail.com');

-- Chèn dữ liệu mẫu Thiết bị
-- Bổ sung thêm 2 thiết bị SN10293A và SN10293B để phục vụ riêng cho TC-01 và TC-02 chạy qua
INSERT INTO devices (serial_number, customer_id, device_name, purchase_date) VALUES 
('SN10293A', 1, 'Thiết bị Test TC01', '2025-01-10'),
('SN10293B', 1, 'Thiết bị Test TC02', '2025-01-10'),
('SN-IP13-001', 1, 'iPhone 13 Pro Max', '2025-01-10'),
('SN-MAC-002', 2, 'MacBook Air M1', '2024-05-20');

-- Chèn dữ liệu mẫu Phiếu bảo hành (Đã chuẩn hóa dùng customer_id và serial_no)
INSERT INTO tickets (ticket_code, customer_id, serial_no, issue_description, status) VALUES 
('TCK-1001', 1, 'SN-IP13-001', 'Màn hình bị sọc xanh lá cây', 'OPEN'),
('TCK-1002', 2, 'SN-MAC-002', 'Máy bật không lên nguồn', 'IN_PROGRESS');