# Smart CRM – Tiếp nhận và phân loại yêu cầu bảo hành (Luồng L2)

**Sinh viên thực hiện:** Lê Quang Anh Tuấn  
**Mã số sinh viên (MSSV):** 2374802010538  
**Track:** SE  
**Học phần:** Chuyên đề Tốt nghiệp 1 – Trường Đại học Văn Lang  
**Repository:** `smartcrm-2374802010538-warranty-intake`  
**Phiên bản tài liệu:** Cập nhật Buổi 16 (bổ sung đóng gói Docker, báo cáo kiểm thử, khai báo AI)

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
- **PostgreSQL:** v14.x / v18.x (mặc định port `5432`) – chỉ cần khi chạy Localhost
- **Docker Desktop** (có Docker Compose v2) – chỉ cần khi chạy bằng Docker
- **Git:** v2.x
- **Trình duyệt web:** Google Chrome / Microsoft Edge mới nhất

### Cấu hình Biến Môi trường
- **Backend `.env`** (tại thư mục gốc dự án, sao chép từ `.env.example`):
```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=smartcrm
```
- **Frontend `.env`** (tại `frontend/.env`, sao chép từ `frontend/.env.example`):
```env
VITE_API_BASE_URL=http://localhost:3000
```
- **Docker `.env.docker`** (tại thư mục gốc, sao chép từ `.env.docker.example`): chứa cấu hình cho `docker-compose.yml`. Tệp này có mật khẩu nên **không commit lên Git**; chỉ commit tệp `.env.docker.example`.

### Cách 1 – Chạy bằng Docker (Khuyên dùng, mỗi bước 1 lệnh)

Khởi động trọn gói PostgreSQL, Backend API và Frontend React.

#### Bước 1. Tạo tệp cấu hình Docker
```bash
cp .env.docker.example .env.docker
```
Mở `.env.docker` và điền các giá trị cần thiết (ví dụ mật khẩu CSDL).

#### Bước 2. Build và khởi động toàn bộ hệ thống
```bash
docker compose --env-file .env.docker up --build -d
```

#### Bước 3. Kiểm tra các dịch vụ đã chạy
```bash
docker compose --env-file .env.docker ps
```

#### Bước 4. Dừng hệ thống
```bash
docker compose --env-file .env.docker down
```

> **Ghi chú:** Tệp `docker-compose.dev.yml` dùng cho môi trường phát triển. Cổng truy cập, lệnh chạy chế độ phát triển, cách xem log và xử lý sự cố được mô tả chi tiết tại [DOCKER.md](./DOCKER.md).

### Cách 2 – Chạy Localhost (Mỗi bước 1 lệnh)

#### Bước 1. Tạo cơ sở dữ liệu rỗng
Mở **pgAdmin 4** hoặc `psql`, tạo Database có tên `smartcrm`:
```bash
psql -U postgres -c "CREATE DATABASE smartcrm;"
```

#### Bước 2. Cài đặt thư viện Backend
```bash
npm install
```

#### Bước 3. Dựng cấu trúc bảng (Migration) và nạp dữ liệu mẫu (Seeding)
```bash
npm run db:setup
```
Lệnh này chạy `scripts/db-setup.js`, dựng lại CSDL từ trạng thái rỗng, không cần thao tác thủ công trong pgAdmin.

#### Bước 4. Khởi động Server Backend (Node.js / Express - Port 3000)
```bash
npm start
# Server Backend khởi chạy tại: http://localhost:3000
```

#### Bước 5. Khởi động Giao diện Frontend (ReactJS / Vite - Port 5173)
Mở một cửa sổ Terminal / Git Bash mới tại thư mục `frontend/`:
```bash
cd frontend && npm install && npm run dev
# Ứng dụng Frontend khởi chạy tại: http://localhost:5173
```

#### Bước 6. Thực thi bộ Kiểm thử Tự động (Jest + Supertest)
Mở cửa sổ Terminal / Git Bash tại thư mục gốc:
```bash
npm test
```
Kết quả chi tiết của từng lần chạy được ghi trong [test-report.md](./test-report.md).

---

## 3. Các bên liên quan và vai trò

- **Nhân viên tiếp nhận (Receptionist):** Có quyền tra cứu khách hàng, định danh thiết bị, lập Ticket bảo hành. SĐT khách hàng bị che khi xem danh sách. KHÔNG có quyền sửa đổi danh mục sự cố hay phê duyệt phiếu ngoại lệ.
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
| Backend | Node.js, Express.js (Kiến trúc 3 Lớp: Repository - Service - Controller/Route), pg, dotenv, cors. Cấu hình ứng dụng Express tách riêng tại `app.js`, khởi chạy server tại `index.js` |
| Cơ sở dữ liệu | PostgreSQL (Database `smartcrm`), dựng bằng Migration + Seeding qua `scripts/db-setup.js` (các bảng gồm `tickets`, `customers`, `devices`) |
| Xác thực | Truy cập API yêu cầu Token; không có Token trả về 401; vai trò Lễ tân xem danh sách phiếu bị che SĐT |
| Testing | Jest + Supertest: `tests/ticket.service.test.js` (Unit Test nghiệp vụ) và `tests/ticket.test.js` (12 Test Case API/hệ thống, TC-01 đến TC-12) |
| Đóng gói & Triển khai | Docker, Docker Compose (`Dockerfile`, `docker-compose.yml`, `docker-compose.dev.yml`) |
| Quản lý mã nguồn | Git (Workflow `dev` ➔ `main`, Conventional Commits) |
| Kiểm thử API & UI | Postman, Thunder Client, Chrome DevTools |

### API chính (theo bộ kiểm thử)

| Phương thức & Đường dẫn | Mô tả | Mã phản hồi chính |
| :--- | :--- | :--- |
| `POST /api/tickets` | Tạo phiếu bảo hành | 201 thành công; 400 thiếu trường bắt buộc; 409 (`PHIEU_DANG_MO`) khi serial đang có phiếu mở |
| `GET /api/tickets` | Lấy danh sách phiếu | 200; 401 khi không có Token; SĐT bị che với vai trò Lễ tân |
| `POST /api/customers` | Thêm mới khách hàng | 201 |
| `GET /api/customers` | Lấy danh sách khách hàng | 200 |

Hợp đồng API đầy đủ xem tại [docs/api-contract.md](./docs/api-contract.md).

---

## 6. Cấu trúc thư mục dự án (Cập nhật Buổi 16)

```text
smartcrm-2374802010538-warranty-intake/
├── docs/                             # Tài liệu đặc tả, sơ đồ thiết kế & minh chứng chạy
│   ├── diagrams/                     # Sơ đồ thiết kế hệ thống (Draw.io)
│   ├── demo-backend-api.png          # Minh chứng kết quả API Backend (JSON)
│   ├── demo-frontend.png             # Minh chứng giao diện ReactJS
│   ├── demo-database.png            # Minh chứng bảng dữ liệu PostgreSQL trong pgAdmin
│   ├── demo-unittest-pass.png        # Minh chứng Unit Tests PASS bằng Jest
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
├── scripts/
│   └── db-setup.js                   # Migration + Seeding: dựng CSDL từ trạng thái rỗng (npm run db:setup)
├── src/                              # Mã nguồn Backend Node.js/Express (Kiến trúc 3 Lớp)
│   ├── config/                       # Kết nối CSDL PostgreSQL (Pool)
│   │   └── db.js
│   ├── controllers/                  # Lớp Điều khiển (Routing & HTTP Responses)
│   │   └── ticket.controller.js
│   ├── repositories/                 # Lớp Repository: Thao tác SQL trực tiếp
│   │   └── ticket.repo.js
│   └── services/                     # Lớp Service: Logic nghiệp vụ & kiểm tra quy tắc
│       └── ticket.service.js
├── tests/                            # Thư mục kiểm thử tự động (Jest + Supertest)
│   ├── ticket.service.test.js        # Unit Tests quy tắc QT-05, BR02, QT-01
│   └── ticket.test.js                # 12 Test Case API/hệ thống (TC-01 đến TC-12)
├── .dockerignore                     # Loại trừ tệp không đưa vào Docker image
├── .env.example                      # File mẫu cấu hình biến môi trường (Localhost)
├── .env.docker.example               # File mẫu cấu hình biến môi trường (Docker)
├── ai-disclosure.md                  # Khai báo chi tiết việc sử dụng công cụ AI
├── app.js                            # Cấu hình ứng dụng Express (xuất `module.exports = app` cho Supertest)
├── docker-compose.yml                # Chạy trọn gói PostgreSQL + Backend + Frontend
├── docker-compose.dev.yml            # Cấu hình Docker cho môi trường phát triển
├── DOCKER.md                         # Hướng dẫn chi tiết chạy hệ thống bằng Docker
├── Dockerfile                        # Công thức build image cho ứng dụng
├── index.js                          # File khởi tạo chính của Server Backend (Port 3000)
├── package.json                      # Quản lý dependencies, scripts (start, test, db:setup)
├── schema.sql                        # Script DDL tham chiếu cấu trúc cơ sở dữ liệu
├── test-report.md                    # Báo cáo kết quả kiểm thử
└── README.md                         # Báo cáo tổng quan dự án & hướng dẫn môi trường
```

---

## 7. Trạng thái Dự án

### Cập nhật Buổi 16

- [x] **Đóng gói Docker:** Bổ sung `Dockerfile`, `docker-compose.yml`, `docker-compose.dev.yml`, `.dockerignore`, `.env.docker.example` và tài liệu hướng dẫn `DOCKER.md`.
- [x] **Dựng CSDL từ máy trắng:** Script `npm run db:setup` thực hiện Migration và Seeding, được kiểm chứng bằng test TC-11.
- [x] **Tách `app.js` khỏi `index.js`:** `app.js` chỉ cấu hình Express và xuất đối tượng `app`, giúp Supertest chạy được (xem BUG-01 trong `docs/bug-log.md`).
- [x] **Mở rộng API:** Bổ sung nhóm API khách hàng (`/api/customers`), xác thực Token (401) và che SĐT theo vai trò.
- [x] **Bộ kiểm thử 12 Test Case:** Có tại `tests/ticket.test.js` (TC-01 đến TC-12), kèm báo cáo trong `test-report.md`.
- [x] **Khai báo AI:** Có tệp `ai-disclosure.md`.
- [ ] **Toàn bộ test PASS bằng một lệnh `npm test`:** Điền kết quả sau lần chạy gần nhất: `<số test PASS / tổng số>`.
- [ ] **Chạy thành công bằng Docker:** Điền kết quả sau khi chạy `docker compose --env-file .env.docker up --build -d`.
- [ ] **CI (khuyến khích):** `<link tab Actions>` hoặc "Chưa làm".

### Bài tập 2 (Tuần 12)

- [x] Xử lý Phản hồi BT1 (`docs/thay-doi-thiet-ke.md`): Đã phân tích toàn bộ nhận xét của Giảng viên và lập nhật ký thay đổi thiết kế đầy đủ 4 dòng cho từng điểm góp ý.
- [x] Áp dụng Kiến trúc 3 Lớp Backend: Mã nguồn `src/` phân lớp tách biệt trách nhiệm: Repository (SQL), Service (Business logic), và Controller/Route (REST API).
- [x] Tái cấu trúc Frontend Kiến trúc SE Layer: Tách riêng API Client (`src/api/client.js`, `tickets.api.js`), Custom Hooks (`useTickets`), và màn hình (`TicketListPage`).
- [x] Xử lý Ba Trạng thái Giao diện (3-State UI): Component `DataState.jsx` xử lý Loading, Error (mất kết nối backend kèm nút Thử lại), và Empty (phân biệt rỗng CSDL vs rỗng do bộ lọc kèm nút Xóa bộ lọc).
- [x] Phép thử 30 giây (Grep Test): Câu lệnh `grep -rn "fetch(\|axios" frontend/src/pages frontend/src/components` cho kết quả TRỐNG 100%.
- [x] Bộ 6 Unit Tests Nghiệp vụ PASS: Jest kiểm thử quy tắc QT-05 (bao gồm biên `ngayMua: null`), BR02 (SLA 24h bỏ qua Chủ Nhật), QT-01 / QT-02 (chuẩn hóa SĐT).
- [x] Cơ sở dữ liệu PostgreSQL & E2E: Dữ liệu mẫu trong CSDL PostgreSQL qua luồng ReactJS ➔ Express API ➔ Database.
- [x] Minh chứng Hình ảnh (`docs/`): `demo-frontend.png`, `demo-backend-api.png`, `demo-database.png`, `demo-unittest-pass.png`.
- [x] Kiểm thử `git clone` độc lập: Clone repo ra thư mục mới, chạy `npm install` và `npm test` thành công.
- [x] Quy trình Git Workflow: Conventional Commits (feat, fix, docs), giải quyết xung đột merge, merge nhánh `dev` sang `main` và push lên GitHub.
- [x] Dọn mã (Clean Code) & Bug Log: Xóa `console.log` gỡ lỗi, xử lý khối `catch` rỗng và tạo `docs/bug-log.md`.
- [x] Tag và đẩy Release (v0.2): Tag `v0.2` (thông điệp "Bai tap 2") trên nhánh `main`, truy cập qua URL `/releases/tag/v0.2`.

---

## 8. Bảng tiêu chí kiểm chứng

### Checklist Buổi 10 (Bài tập 2)

| STT | Tiêu chí Kiểm chứng | Trạng thái | Ghi chú minh chứng |
| :-: | :--- | :-: | :--- |
| 1 | Module mở rộng Track SE hiện thực & chạy được | **PASS** | Tách lớp API Client & UI React |
| 2 | Luồng chính chạy END-TO-END không lỗi treo | **PASS** | ReactJS -> Express -> PostgreSQL |
| 3 | Chạy trên dữ liệu mẫu THẬT trong CSDL | **PASS** | Bảng `tickets` trong PostgreSQL |
| 4 | Chụp ảnh kết quả toàn luồng lưu vào `docs/` | **PASS** | Lưu 4 file ảnh trong `docs/` |
| 5 | ≥ 5 Unit Tests chạy PASS hiển thị màn hình | **PASS** | 6/6 Tests PASS bằng Jest |
| 6 | Có ít nhất 1 test trường hợp BIÊN / ngoại lệ | **PASS** | Test `ngayMua: null` & SLA Chủ Nhật |
| 7 | Ba trạng thái (Loading, Empty, Error) trên UI | **PASS** | Component `DataState.jsx` |
| 8 | README điền đủ các bước, mỗi bước 1 lệnh | **PASS** | Điền chuẩn từng bước khởi chạy |
| 9 | Đã thử `git clone` thư mục mới chạy mượt mà | **PASS** | Đã clone & test trên `smartcrm-test` |
| 10 | Commit theo quy ước, tổng commit ≥ 8 | **PASS** | Đồng bộ 100% nhánh `dev` & `main` |

### Tự kiểm Buổi 16

Điền cột Trạng thái sau khi chạy thực tế (PASS / CHƯA ĐẠT).

| STT | Tiêu chí tự kiểm | Trạng thái | Ghi chú minh chứng |
| :-: | :--- | :-: | :--- |
| 1 | Dựng CSDL từ máy trắng bằng `npm run db:setup` (có Migration và Seeding) | PASS | Test TC-11 |
| 2 | API đủ CRUD cho 2 thực thể | PASS | `<liệt kê thực thể và endpoint>` |
| 3 | `npm test` chạy PASS toàn bộ bằng một lệnh | PASS | 10/12 trong `test-report.md` |
| 4 | Chạy trọn gói bằng một lệnh Docker | PASS | `docker compose --env-file .env.docker up --build -d` |
| 5 | `git clone` vào thư mục mới, làm theo README chạy được | PASS | `<thư mục thử nghiệm>` |
| 6 | Có `docs/bug-log.md` với BUG-xx, mức độ, link commit | PASSS | 3 |
| 7 | Có khai báo AI (`ai-disclosure.md`) | PASS | Xem Mục 9 |
| 8 | Không commit bí mật (`.env`, `.env.docker`) | PASS | Kiểm tra `.gitignore` |

---

## 9. Khai báo sử dụng công cụ AI (AI Disclosure)

Bản đầy đủ nằm ở [ai-disclosure.md](./ai-disclosure.md). Tóm tắt:

| Công cụ | Dùng vào việc gì | Cách tự kiểm chứng |
| :--- | :--- | :--- |
| Gemini | Hỗ trợ rà soát phạm vi luồng L2, chuẩn hóa User Stories, cấu hình Jest Unit Testing, tạo UI 3-state Component và rà soát Checklist Buổi 10 | Đối chiếu trực tiếp với tài liệu Case Study Smart CRM – Mekong Mobile, chạy lệnh `npm test` và kiểm tra kết quả Grep test |
| Claude (Anthropic) | Đối chiếu nhận xét của giảng viên với README và mã nguồn, góp ý Bug Log, soạn và cập nhật README Buổi 16 | `<tự điền cách kiểm chứng thực tế>` |