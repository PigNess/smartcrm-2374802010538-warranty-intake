# ĐẶC TẢ YÊU CẦU PHẦN MỀM (SRS) - LUỒNG L2
**Bài toán:** Tiếp nhận và phân loại yêu cầu bảo hành (Smart CRM)

## 1. Bảng thuật ngữ
| Thuật ngữ | Ý nghĩa / Diễn giải |
| :--- | :--- |
| **Ticket (Phiếu bảo hành)** | Đơn điện tử ghi nhận yêu cầu sửa chữa/bảo hành của khách hàng đối với một thiết bị. |
| **SLA (Service Level Agreement)** | Hạn thời gian cam kết tối đa mà trung tâm phải xử lý xong Ticket tính từ lúc tiếp nhận (tính bằng giờ). |
| **Issue Category** | Danh mục nhóm sự cố chuẩn hóa (ví dụ: Lỗi nguồn, Lỗi màn hình, Khác). |
| **Phiếu ngoại lệ** | Ticket thuộc về thiết bị thiếu thông tin ngày mua, hệ thống không tự động tính được hạn bảo hành. |

## 2. Các bên liên quan và vai trò
- **Nhân viên tiếp nhận:** Có quyền tra cứu khách hàng, định danh thiết bị, lập Ticket và cập nhật trạng thái xử lý cơ bản. KHÔNG có quyền thay đổi danh mục sự cố hay phê duyệt phiếu ngoại lệ.
- **Quản lý trung tâm:** Có quyền giám sát tiến độ SLA, phê duyệt/từ chối phiếu ngoại lệ, cập nhật danh mục sự cố. KHÔNG thao tác luồng tạo phiếu hàng ngày.
- **Hệ thống tính toán (System Timer):** Actor phụ trợ đảm nhiệm việc tự động tính toán và đối chiếu hạn SLA.

## 3. Yêu cầu chức năng (FR) & User Story
| Mã FR | Tên Yêu Cầu | Mã US | Mức độ ưu tiên |
| :--- | :--- | :--- | :--- |
| FR01 | Quản lý khách hàng | US01: Tra cứu và tạo mới KH | MUST |
| FR02 | Định danh thiết bị | US02: Ghi nhận qua Serial/IMEI | MUST |
| FR03 | Lập phiếu & tính SLA | US03: Lập Ticket và tự tính SLA | MUST |
| FR04 | Phê duyệt ngoại lệ | US04: Duyệt thiết bị khuyết ngày mua | SHOULD |
| FR05 | Quản lý danh mục | US05: Cập nhật Issue Category | COULD |

## 4. Yêu cầu phi chức năng (NFR)
- **NFR01 (Hiệu năng):** Thời gian phản hồi của API tra cứu khách hàng/thiết bị phải dưới **1.5 giây** trên CSDL quy mô 100.000 bản ghi.
- **NFR02 (Tính khả dụng):** Hệ thống API phải đáp ứng khả năng chịu tải đồng thời tối thiểu **150 CCU** mà không gián đoạn.
- **NFR03 (Giao diện):** Danh sách Ticket trên màn hình Quản lý phải tải và hiển thị hoàn tất dưới **2 giây**.

## 5. Bảng truy vết yêu cầu
| Mã FR | Tên FR | Mã US | Mã Use Case | Mức ưu tiên |
| :--- | :--- | :--- | :--- | :--- |
| FR01 | Quản lý KH | US01 | UC01, UC02 | Must |
| FR02 | Định danh thiết bị | US02 | UC03 | Must |
| FR03 | Lập phiếu & tính SLA | US03 | UC04 | Must |
| FR04 | Phê duyệt ngoại lệ | US04 | UC06 | Should |
| FR05 | Quản lý danh mục | US05 | UC08 | Could |

## 6. Đặc tả Use Case cốt lõi
*(Lưu ý: Sơ đồ Use Case tổng quan được đính kèm trong file `.drawio` tại thư mục này).*

**Đặc tả UC04: Lập phiếu yêu cầu bảo hành (Ticket)**
- **Actor chính:** Nhân viên tiếp nhận.
- **Actor phụ:** Hệ thống tính toán (System Timer).
- **Mục tiêu:** Ghi nhận yêu cầu sự cố hợp lệ và hệ thống tự xuất ra hạn xử lý cam kết.
- **Luồng chính:**
  1. Nhân viên tiếp nhận yêu cầu tạo phiếu bảo hành mới cho thiết bị đã chọn.
  2. Hệ thống yêu cầu cung cấp thông tin sự cố.
  3. Nhân viên tiếp nhận cung cấp mô tả lỗi, chọn nhóm sự cố và mức độ ưu tiên.
  4. Hệ thống kiểm tra điều kiện bảo hành dựa trên ngày mua của thiết bị.
  5. Hệ thống (System Timer) tính toán hạn cam kết SLA cộng vào thời gian hiện tại (bỏ qua Chủ Nhật) và ghi nhận phiếu bảo hành mới.
  6. Hệ thống tạo lịch sử trạng thái ban đầu là "Đã tiếp nhận" và thông báo tạo phiếu thành công.
- **Luồng ngoại lệ (4a - Khuyết thông tin ngày mua):**
  - 4a.1. Ở bước 4, hệ thống phát hiện thiết bị không có dữ liệu ngày mua.
  - 4a.2. Hệ thống cảnh báo không thể tự động tính hạn SLA và tự động chuyển trạng thái phiếu thành "Chờ phê duyệt ngoại lệ".
  - 4a.3. Phiếu được lưu tạm chờ Quản lý trung tâm xét duyệt (Kết thúc Use Case).

## 7. Thiết kế Kiến trúc
- **Quyết định 1:** Vì **NFR01** yêu cầu API tra cứu phản hồi **dưới 1.5 giây**, tôi chọn **PostgreSQL và đánh chỉ mục (B-Tree Index) trực tiếp trên cột Phone, Serial**, đánh đổi là **tốn thêm không gian lưu trữ và làm chậm nhẹ tốc độ Insert**.
- **Quyết định 2:** Vì **NFR02** yêu cầu chịu tải **150 CCU**, tôi chọn **kiến trúc Backend RESTful API Stateless kết hợp JWT**, đánh đổi là **Client phải liên tục gửi Token trong Header làm tăng payload mạng**.
- **Quyết định 3:** Vì **NFR03** yêu cầu danh sách hiển thị **dưới 2 giây**, tôi chọn **cơ chế Pagination kết hợp lazy-loading ở ReactJS**, đánh đổi là **tốn effort lập trình xử lý logic state phức tạp hơn**.

## 8. Mô hình Dữ liệu (ERD) & SQL Skeleton
```sql
-- 1. Bảng Khách hàng
CREATE TABLE customer (
    customer_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone VARCHAR(10) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Bảng Nhóm sự cố
CREATE TABLE issue_category (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- 3. Bảng Thiết bị
CREATE TABLE device (
    device_id SERIAL PRIMARY KEY,
    customer_id INT REFERENCES customer(customer_id),
    serial_imei VARCHAR(50) UNIQUE NOT NULL,
    purchase_date DATE,
    warranty_months INT DEFAULT 12
);

-- 4. Bảng Phiếu bảo hành (Ticket)
CREATE TABLE ticket (
    ticket_id SERIAL PRIMARY KEY,
    device_id INT REFERENCES device(device_id),
    category_id INT REFERENCES issue_category(category_id),
    priority VARCHAR(20) NOT NULL, 
    sla_deadline TIMESTAMP,
    status VARCHAR(50) DEFAULT 'RECEIVED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Bảng Lịch sử trạng thái (Audit Log)
CREATE TABLE ticket_status_log (
    log_id SERIAL PRIMARY KEY,
    ticket_id INT REFERENCES ticket(ticket_id) ON DELETE CASCADE,
    old_status VARCHAR(50),
    new_status VARCHAR(50) NOT NULL,
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);