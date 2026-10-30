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

### Yêu cầu Hệ thống & Phiên bản Runtime
- **Node.js:** v18.x hoặc v20.x LTS trở lên
- **npm:** v9.x trở lên
- **PostgreSQL:** v14.x / v18.x (mặc định port `5432`)
- **Git:** v2.x
- **Trình duyệt web:** Google Chrome / Microsoft Edge mới nhất

### Cấu hình Biến Môi trường (`.env`)
- **Backend `.env`** (tại thư mục gốc dự án):
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=smartcrm

```
- **Frontend `.env`** (tại `frontend/.env`):
```env
VITE_API_BASE_URL=http://localhost:3000
```

### Hướng dẫn Khởi chạy Dự án (Chạy Localhost - Mỗi bước 1 lệnh)

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

#### 2. Khởi động Server Backend (Node.js / Express - Port 3000)
```bash
npm install
npm start
# Server Backend khởi chạy tại: http://localhost:3000
```

#### 3. Khởi động Giao diện Frontend (ReactJS / Vite - Port 5173)
Mở một cửa sổ Terminal / Git Bash mới tại thư mục `frontend/`:
```bash
cd frontend
npm install
npm run dev
# Ứng dụng Frontend khởi chạy tại: http://localhost:5173
```

#### 4. Thực thi bộ Kiểm thử Tự động (Jest Unit Tests)
Mở cửa sổ Terminal / Git Bash tại thư mục gốc:
```bash
npm test
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
| Frontend | ReactJS, Vite, Fetch Client (`src/api/client.js`), Custom Hooks (`useTickets`), Component `DataState.jsx` |
| Backend | Node.js, Express.js (Kiến trúc 3 Lớp: Repository - Service - Route), pg, dotenv, cors |
| Cơ sở dữ liệu | PostgreSQL (Database `smartcrm`, Bảng `tickets`) |
| Testing | Jest (`tests/ticket.service.test.js` - 6 Unit Tests PASS) |
| Quản lý mã nguồn | Git (Workflow `dev` ➔ `main`, Conventional Commits) |
| Kiểm thử API & UI | Postman, Thunder Client, Chrome DevTools |

---

## 6. Cấu trúc thư mục dự án (Cập nhật Buổi 10)

```text
smartcrm-2374802010538-warranty-intake/
├── docs/                             # Tài liệu đặc tả, sơ đồ thiết kế & minh chứng chạy
│   ├── diagrams/                     # Sơ đồ thiết kế hệ thống (Draw.io)
│   ├── demo-backend-api.png          # Minh chứng kết quả API Backend (JSON)
│   ├── demo-frontend.png             # Minh chứng giao diện ReactJS
│   ├── demo-database.png             # Minh chứng bảng dữ liệu PostgreSQL trong pgAdmin
│   ├── demo-unittest-pass.png        # Minh chứng 6 Unit Tests PASS bằng Jest
│   ├── thay-doi-thiet-ke.md          # Nhật ký thay đổi thiết kế
│   ├── srs.md                        # Đặc tả yêu cầu phần mềm
│   ├── api-contract.md               # Hợp đồng giao tiếp API RESTful
│   └── bug-log.md                    # Nhật ký theo dõi lỗi và cách xử lý
├── frontend/                         # Mã nguồn Giao diện Người dùng (ReactJS + Vite)
│   ├── .env.example
│   ├── src/
│   │   ├── api/                      # Lớp giao tiếp API tập trung (Client Layer)
│   │   │   ├── client.js             # Cấu hình Fetch, ApiError & Lỗi 401
│   │   │   └── tickets.api.js        # Các hàm gọi API nghiệp vụ Ticket
│   │   ├── components/               # Components dùng chung
│   │   │   └── DataState.jsx         # Xử lý 3 trạng thái: Loading, Empty, Error
│   │   ├── hooks/                    # Custom React Hooks
│   │   │   └── useTickets.js         # Fetching & State Management
│   │   ├── pages/                    # Các trang màn hình
│   │   │   └── TicketListPage.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── src/                              # Mã nguồn Backend Node.js/Express (Kiến trúc 3 Lớp)
│   ├── config/                       # Kết nối CSDL PostgreSQL (Pool)
│   │   └── db.js
│   ├── controllers/                  # Lớp Điều khiển (Routing & HTTP Responses)
│   │   └── ticket.controller.js
│   ├── repositories/                 # Lớp Repository: Thao tác SQL trực tiếp
│   │   └── ticket.repo.js
│   └── services/                     # Lớp Service: Logic nghiệp vụ & kiểm tra quy tắc
│       └── ticket.service.js
├── tests/                            # Thư mục kiểm thử tự động Unit Tests (Jest)
│   └── ticket.service.test.js        # 6 Unit Tests kiểm thử quy tắc QT-05, BR02, QT-01
├── .env.example                      # File mẫu cấu hình biến môi trường
├── index.js                          # File khởi tạo chính của Server Backend (Port 3000)
├── package.json                      # Quản lý dependencies dự án & Jest test script
├── schema.sql                        # Script DDL khởi tạo cơ sở dữ liệu PostgreSQL
└── README.md                         # Báo cáo tổng quan dự án & hướng dẫn môi trường
```

---

## 7. Trạng thái Dự án (Cập nhật Tiến độ Tuần 12 - Bài tập 2)

- [x] Xử lý Phản hồi BT1 (docs/thay-doi-thiet-ke.md): Đã phân tích toàn bộ nhận xét của Giảng viên và lập nhật ký thay đổi thiết kế đầy đủ 4 dòng cho từng điểm góp ý.

- [x] Áp dụng Kiến trúc 3 Lớp Backend: Mã nguồn src/ được cấu hình chuẩn phân lớp tách biệt trách nhiệm: Repository (SQL), Service (Business logic), và Route (REST API).

- [x] Tái cấu trúc Frontend Kiến trúc SE Layer: Tách riêng API Client (src/api/client.js, tickets.api.js), Custom Hooks (useTickets), và màn hình (TicketListPage).

- [x] Xử lý Ba Trạng thái Giao diện (3-State UI): Component DataState.jsx xử lý chuẩn trạng thái Loading (khung chờ), Error (mất kết nối backend kèm nút Thử lại), và Empty (phân biệt rỗng CSDL vs rỗng do bộ lọc kèm nút Xóa bộ lọc).

- [x] Phép thử 30 giây (Grep Test): Đã kiểm tra câu lệnh grep -rn "fetch(\|axios" frontend/src/pages frontend/src/components cho kết quả TRỐNG 100%.

- [x] Bộ 6 Unit Tests Nghiệp vụ PASS (100%): Viết bằng Jest kiểm thử thành công các quy tắc nghiệp vụ QT-05 (bao gồm trường hợp biên ngayMua: null), BR02 (trường hợp biên SLA 24h bỏ qua ngày Chủ Nhật), QT-01 / QT-02 (chuẩn hóa SĐT).

- [x] Cơ sở dữ liệu PostgreSQL & E2E: Tích hợp mượt mà dữ liệu mẫu THẬT trong CSDL PostgreSQL qua luồng E2E từ ReactJS ➔ Express API ➔ Database.

- [x] Minh chứng Hình ảnh (docs/): Đã lưu trữ đủ 4 file ảnh chụp minh chứng kết quả chạy thực tế: demo-frontend.png, demo-backend-api.png, demo-database.png, demo-unittest-pass.png.

- [x] Kiểm thử git clone Độc lập: Đã thử nghiệm clone repo ra thư mục mới, chạy npm install và npm test thành công mượt mà 100%.

- [x] Quy trình Git Workflow: Commit chuẩn Conventional Commits (feat, fix, docs), giải quyết xung đột merge conflict, merge nhánh dev sang main và push đồng bộ 100% lên GitHub.

- [x] Dọn mã (Clean Code) & Bug Log: Đã xóa toàn bộ print/console.log gỡ lỗi, xử lý các khối catch rỗng và tạo tệp docs/bug-log.md ghi nhận lỗi thực tế.

- [x] Tag và đẩy Release (v0.2): Đã tạo tag v0.2 (thông điệp "Bai tap 2") và đẩy thành công lên nhánh main, cho phép truy cập phiên bản qua URL /releases/tag/v0.2.

---

## 8. Bảng tiêu chí kiểm chứng Bài tập 2 (Checklist Buổi 10)

| STT | Tiêu chí Kiểm chứng (Buổi 10) | Trạng thái | Ghi chú minh chứng |
| :-: | :--- | :-: | :--- |
| 1 | Module mở rộng Track SE hiện thực & chạy được | **PASS** | Tách lớp API Client & UI React |
| 2 | Luồng chính chạy END-TO-END không lỗi treo | **PASS** | ReactJS -> Express -> PostgreSQL |
| 3 | Chạy trên dữ liệu mẫu THẬT trong CSDL | **PASS** | Bảng `tickets` trong PostgreSQL |
| 4 | Chụp ảnh kết quả toàn luồng lưu vào `docs/` | **PASS** | Lưu 4 file ảnh trong `docs/` |
| 5 | ≥ 5 Unit Tests chạy PASS hiển thị màn hình | **PASS** | 6/6 Tests PASS bằng Jest |
| 6 | Có ít nhất 1 test trường hợp BIÊN / ngoại lệ | **PASS** | Test `ngayMua: null` & SLA Chủ Nhật |
| 7 | Ba trạng thái (Loading, Empty, Error) trên UI | **PASS** | Component `DataState.jsx` |
| 8 | README Mục 3 điền đủ các bước, mỗi bước 1 lệnh | **PASS** | Điền chuẩn từng bước khởi chạy |
| 9 | Đã thử `git clone` thư mục mới chạy mượt mà | **PASS** | Đã clone & test trên `smartcrm-test` |
| 10 | Commit theo quy ước, tổng commit ≥ 8 | **PASS** | Đồng bộ 100% nhánh `dev` & `main` |

---

## 9. Khai báo sử dụng công cụ AI (AI Disclosure)

| Công cụ | Dùng vào việc gì | Cách tự kiểm chứng |
| :--- | :--- | :--- |
| Gemini | Hỗ trợ rà soát phạm vi luồng L2, chuẩn hóa User Stories, cấu hình Jest Unit Testing, tạo UI 3-state Component và rà soát Checklist Buổi 10 | Đối chiếu trực tiếp với tài liệu Case Study Smart CRM – Mekong Mobile, chạy lệnh `npm test` hiển thị 6/6 PASS và kiểm tra kết quả Grep test |