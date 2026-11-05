-- Chèn dữ liệu mẫu cho danh mục sự cố (Nếu bạn có bảng này, nếu không có thể bỏ qua đoạn này)
-- INSERT INTO issue_categories (code, name) VALUES ('ERR01', 'Lỗi Màn Hình'), ('ERR02', 'Lỗi Nguồn');

-- Chèn dữ liệu mẫu Khách hàng
INSERT INTO customers (name, phone, email) VALUES 
('Nguyễn Văn Khách', '0901234567', 'khachhang1@gmail.com'),
('Trần Thị Hàng', '0918765432', 'khachhang2@gmail.com');

-- Chèn dữ liệu mẫu Thiết bị
-- Lưu ý: Hãy điều chỉnh tên cột cho đúng với schema thực tế của bạn
INSERT INTO devices (serial_number, customer_id, device_name, purchase_date) VALUES 
('SN-IP13-001', 1, 'iPhone 13 Pro Max', '2025-01-10'),
('SN-MAC-002', 2, 'MacBook Air M1', '2024-05-20');

-- Chèn dữ liệu mẫu Phiếu bảo hành (Tickets)
INSERT INTO tickets (customer_name, phone, email, device_name, issue_description, status) VALUES 
('Nguyễn Văn Khách', '0901234567', 'khachhang1@gmail.com', 'iPhone 13 Pro Max', 'Màn hình bị sọc xanh lá cây', 'OPEN'),
('Trần Thị Hàng', '0918765432', 'khachhang2@gmail.com', 'MacBook Air M1', 'Máy bật không lên nguồn', 'IN_PROGRESS'),
('Lê Minh Test', '0987654321', 'test@gmail.com', 'Samsung S23 Ultra', 'Loa bị rè', 'COMPLETED');