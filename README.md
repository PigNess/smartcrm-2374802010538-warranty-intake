# Smart CRM – Tiếp nhận và phân loại yêu cầu bảo hành (Luồng L2)

**Sinh viên thực hiện:** Lê Quang Anh Tuấn  
**Mã số sinh viên (MSSV):** 2374802010538  
**Track:** SE  
**Học phần:** Chuyên đề Tốt nghiệp 1 – Trường Đại học Văn Lang  
**Repository:** `smartcrm-2374802010538-warranty-intake`  

---

## 1. Mô tả bài toán và Phạm vi

### Mô tả cốt lõi
Nhân viên tiếp nhận tra cứu khách hàng & thiết bị ➔ Kiểm tra hạn bảo hành, phân loại nhóm sự cố & mức ưu tiên ➔ Hệ thống tự động tính hạn cam kết (SLA) & lập phiếu ➔ Quản lý trung tâm phê duyệt phiếu chưa xác minh bảo hành & giám sát hạn cam kết ➔ Kết thúc khi phiếu được xác nhận hợp lệ kèm lịch sử trạng thái.

### Phạm vi dự án (In-scope)
- **Quản lý khách hàng:** Tra cứu và tạo mới khách hàng kèm chuẩn hóa SĐT 10 số bắt đầu bằng 0 (QT-01, QT-02) và che SĐT đối với nhân viên tiếp nhận (QT-15).
- **Định danh thiết bị:** Quản lý thiết bị theo Serial/IMEI duy nhất (QT-03) và tự động kiểm tra điều kiện bảo hành dựa trên ngày mua (QT-05).
- **Lập phiếu & Tính SLA:** Lập phiếu bảo hành, phân loại sự cố theo danh mục chuẩn (`issue_category`) và tự động tính hạn cam kết SLA theo mức ưu tiên từ thứ Hai đến thứ Bảy (QT-04).
- **Phê duyệt & Giám sát:** Cập nhật trạng thái phiếu một chiều có ghi log (`ticket_status_log`) (QT-06), xóa mềm (QT-13), phân quyền theo trung tâm (QT-14) và luồng Quản lý trung tâm phê duyệt phiếu chưa xác minh bảo hành (QT-05).

### Ngoài phạm vi (Out-of-scope / Won't)
- Phân công kỹ thuật viên theo điểm tay nghề và ghi nhận sửa chữa (thuộc luồng L4).
- Quản lý tồn kho và xuất linh kiện bảo hành (thuộc luồng L5).
- Khảo sát mức độ hài lòng của khách hàng sau khi đóng phiếu (thuộc luồng L8).

---

## 2. Yêu cầu Môi trường & Hướng dẫn Khởi chạy

### Yêu cầu Hệ thống & Yêu cầu Môi trường
- **Node.js:** v18.x hoặc v20.x LTS trở lên
- **npm:** v9.x trở lên
- **PostgreSQL:** v14.x / v18.x (mặc định port `5432`)
- **Git:** v2.x

### Cấu hình Biến Môi trường (`.env`)
Tạo tệp `.env` tại thư mục gốc dự án:
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=smartcrm
```

### Hướng dẫn Khởi chạy Dự án (Chạy Localhost)

#### 1. Khởi tạo Cơ sở dữ liệu PostgreSQL
- Mở **pgAdmin 4** hoặc `psql`, tạo Database có tên `smartcrm`.
- Thực thi câu lệnh DDL khởi tạo cấu trúc bảng trong tệp `schema.sql`:
```sql
CREATE TABLE IF NOT EXISTS tickets (
    id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    device_name VARCHAR(100) NOT NULL,
    issue_description TEXT,
    status VARCHAR(20) DEFAULT 'OPEN',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. Khởi động Server Backend (Node.js / Express)
```bash
npm install
npm start
# Server Backend khởi chạy tại: http://localhost:3000
```

#### 3. Khởi động Giao diện Frontend (ReactJS / Vite)
```bash
cd frontend
npm install
npm run dev
# Ứng dụng Frontend khởi chạy tại: http://localhost:5173
```

---

## 3. Các bên liên quan và vai trò

- **Nhân viên tiếp nhận (Receptionist):** Có quyền tra cứu khách hàng, định danh thiết bị, lập Ticket bảo hành. KHÔNG có quyền sửa đổi danh mục sự cố hay phê duyệt phiếu ngoại lệ.
- **Quản lý trung tâm (Center Manager):** Có quyền giám sát tiến độ cam kết SLA, phê duyệt/từ chối phiếu ngoại lệ, cập nhật danh mục nhóm sự cố.
- **System Timer (Hệ thống):** Tự động tính toán, đếm ngược và đối chiếu hạn thời gian cam kết SLA.

---

## 4. Bảng truy vết yêu cầu (Traceability Matrix)

| Mã FR | Tên Yêu Cầu Chức Năng | Mã User Story | Mã Use Case | Mức độ ưu tiên |
| :--- | :--- | :--- | :--- | :--- |
| FR01 | Quản lý thông tin khách hàng | US01 | UC01, UC02 | Must Have |
| FR02 | Định danh & kiểm tra thiết bị | US02 | UC03 | Must Have |
| FR03 | Lập phiếu bảo hành & tính SLA | US03 | UC04 | Must Have |
| FR04 | Phê duyệt phiếu ngoại lệ | US04 | UC06 | Should Have |
| FR05 | Quản lý danh mục sự cố | US05 | UC08 | Could Have |

---

## 5. Công nghệ sử dụng (Tech Stack)

| Thành phần | Công nghệ / Thư viện sử dụng |
| :--- | :--- |
| Frontend | ReactJS, Vite, TailwindCSS, Axios |
| Backend | Node.js, Express.js (Kiến trúc 3 Lớp: Repository - Service - Route), pg, dotenv, cors |
| Cơ sở dữ liệu | PostgreSQL (Database `smartcrm`, Bảng `tickets`) |
| Quản lý mã nguồn | Git (Workflow `dev` ➔ `main`, Conventional Commits) |
| Kiểm thử API & UI | Postman, Thunder Client, Chrome DevTools |

---

## 6. Cấu trúc thư mục dự án (Cập nhật Buổi 8)

```text
smartcrm-2374802010538-warranty-intake/
├── docs/                             # Tài liệu đặc tả, sơ đồ thiết kế & minh chứng chạy
│   ├── diagrams/                    # Sơ đồ thiết kế hệ thống (Draw.io)
│   ├── demo-backend-api.png          # Minh chứng kết quả API Backend (JSON)
│   ├── demo-frontend.png             # Minh chứng giao diện ReactJS
│   ├── demo-database.png             # Minh chứng bảng dữ liệu PostgreSQL trong pgAdmin
│   ├── thay-doi-thiet-ke.md          # Nhật ký thay đổi thiết kế (Chuẩn 4 dòng/góp ý BT1)
│   ├── srs.md                        # Đặc tả yêu cầu phần mềm
│   └── api-contract.md              # Hợp đồng giao tiếp API RESTful
├── frontend/                         # Mã nguồn Giao diện Người dùng (ReactJS + Vite)
│   ├── src/                         # Chứa React Components, Axios Services & CSS
│   ├── package.json
│   └── vite.config.js
├── src/                              # Mã nguồn Backend Node.js/Express (Kiến trúc 3 Lớp)
│   ├── repositories/                # Lớp Repository: Thao tác dữ liệu SQL trực tiếp
│   ├── services/                    # Lớp Service: Xử lý logic nghiệp vụ & kiểm tra dữ liệu
│   └── routes/                      # Lớp Route/Controller: Tiếp nhận & trả về API RESTful
├── .env                              # Cấu hình biến môi trường
├── index.js                          # File khởi tạo chính của Server Backend (Port 3000)
├── package.json                      # Quản lý dependencies dự án
├── schema.sql                        # Script DDL khởi tạo cơ sở dữ liệu PostgreSQL
└── README.md                         # Báo cáo tổng quan dự án & hướng dẫn môi trường
```

---

## 7. Trạng thái Dự án (Cập nhật Tiến độ Buổi 8)

- [x] **Xử lý Phản hồi BT1 (`docs/thay-doi-thiet-ke.md`):** Đã phân tích toàn bộ nhận xét của Giảng viên và lập nhật ký thay đổi thiết kế đầy đủ 4 dòng cho từng điểm góp ý (User Story/MoSCoW, Lệch mã UC, Bảng chú thích ERD, Khai báo AI & PDF, Merge dev/main).
- [x] **Áp dụng Kiến trúc 3 Lớp Backend:** Mã nguồn `src/` được cấu hình chuẩn phân lớp tách biệt trách nhiệm: `Repository` (SQL), `Service` (Business logic), và `Route` (REST API).
- [x] **Quản lý Môi trường & Thư viện:** Đã cài đặt và kiểm thử thành công `express`, `pg`, `cors`, `dotenv`, `react`, `vite`, `axios` không sinh lỗi kết nối hay lỗi import.
- [x] **Cơ sở dữ liệu PostgreSQL:** Đã thiết lập bảng `tickets` bằng mã DDL trong `schema.sql` và thực thi truy vấn `SELECT` kiểm thử thành công.
- [x] **Tích hợp E2E (End-to-End):** Giao diện Frontend ReactJS (`http://localhost:5173`) tương tác trực tiếp với API Backend (`http://localhost:3000`), thực hiện tạo và hiển thị danh sách phiếu bảo hành mượt mà.
- [x] **Minh chứng Hình ảnh (`docs/`):** Đã lưu trữ đủ 3 file ảnh chụp minh chứng kết quả chạy thực tế: `demo-frontend.png`, `demo-backend-api.png`, `demo-database.png`.
- [x] **Quy trình Git Workflow:** Đã commit theo đúng quy ước Conventional Commits (`feat`, `docs`), thực hiện merge từ nhánh `dev` sang `main` và đồng bộ 100% lên Remote Repository.

---

## 8. Khai báo sử dụng công cụ AI (AI Disclosure)

| Công cụ | Dùng vào việc gì | Cách tự kiểm chứng |
| :--- | :--- | :--- |
| Gemini | Hỗ trợ rà soát phạm vi luồng L2, chuẩn hóa User Stories, tạo khung README.md và SQL DDL | Đối chiếu trực tiếp với tài liệu Case Study Smart CRM – Mekong Mobile và kiểm tra các nguyên tắc 3NF của CSDL |
