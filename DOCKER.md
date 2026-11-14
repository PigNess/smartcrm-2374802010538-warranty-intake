# Hướng Dẫn Cấu Hình Và Vận Hành Docker – Smart CRM

Tài liệu này cung cấp hướng dẫn chi tiết về kiến trúc container và các lệnh vận hành toàn bộ hệ thống **Smart CRM (Tiếp nhận & Phân loại bảo hành - Luồng L2)** bằng Docker và Docker Compose.

---

## 1. Kiến Trúc Container (Architecture)

Hệ thống được đóng gói thành **3 dịch vụ độc lập** chạy trong cùng một mạng nội bộ (`smartcrm-net`):

```
                       [ Trình duyệt / Client ]
                                  │
          ┌───────────────────────┴───────────────────────┐
          │ :5173                                         │ :3000
          ▼                                               ▼
┌───────────────────┐    Reverse Proxy (/api/)    ┌───────────────────┐
│ smartcrm-frontend │ ──────────────────────────> │ smartcrm-backend  │
│  (ReactJS + Vite  │                             │ (Node.js/Express  │
│    trên Nginx)    │                             │      Port 3000)   │
└───────────────────┘                             └─────────┬─────────┘
                                                            │
                                                            │ :5432
                                                            ▼
                                                  ┌───────────────────┐
                                                  │ smartcrm-postgres │
                                                  │ (PostgreSQL 16    │
                                                  │  Auto-migration)  │
                                                  └───────────────────┘
```

| Dịch vụ | Container Name | Image / Base | Cổng Container | Cổng Host (Mặc định) | Chức năng |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`postgres`** | `smartcrm-postgres` | `postgres:16-alpine` | `5432` | `5432` | Cơ sở dữ liệu PostgreSQL, tự động nạp `schema.sql` và `seed.sql` lúc khởi tạo volume. |
| **`backend`** | `smartcrm-backend` | `node:20-alpine` (multi-stage) | `3000` | `3000` | REST API Node.js / Express, kiểm tra kết nối với DB trước khi nhận request. |
| **`frontend`** | `smartcrm-frontend` | `nginx:1.27-alpine` (multi-stage) | `80` | `5173` | Giao diện React SPA được build tĩnh và phục vụ bởi Nginx, hỗ trợ reverse proxy `/api/`. |

---

## 2. Danh Sách Các File Cấu Hình Docker Đã Tạo

1. **`Dockerfile`** (Root): Image cho Backend Node.js Express (chạy user `node` bảo mật, cache npm layers).
2. **`.dockerignore`** (Root): Loại trừ `node_modules`, `frontend/`, `tests/`, `.git`, file logs khỏi context backend.
3. **`frontend/Dockerfile`**: Multi-stage build (Node build React Vite ➔ Nginx Alpine phục vụ static file).
4. **`frontend/Dockerfile.dev`**: Image chạy trực tiếp Vite Dev Server cho chế độ lập trình hot-reload.
5. **`frontend/nginx.conf`**: Cấu hình Nginx (SPA fallback `try_files`, reverse proxy `/api/` ➔ backend, gzip compression, caching static assets, security headers).
6. **`frontend/.dockerignore`**: Loại bỏ `node_modules`, `dist/`, cache khỏi frontend image.
7. **`docker-compose.yml`**: Định nghĩa và liên kết toàn bộ 3 dịch vụ (Healthcheck PostgreSQL, network, persistent volume).
8. **`docker-compose.dev.yml`**: Cấu hình ghi đè dành riêng cho môi trường phát triển (mount volumes, nodemon, vite hmr).
9. **`.env.docker` / `.env.docker.example`**: Các biến môi trường mẫu dành cho Docker.

---

## 3. Hướng Dẫn Khởi Chạy (Quick Start)

### Yêu cầu tiên quyết
- Đã cài đặt **Docker Desktop** (trên Windows / macOS) hoặc **Docker Engine & Docker Compose** (trên Linux).

### Bước 1: Khởi động toàn bộ hệ thống (Production Mode)

Từ thư mục gốc dự án, thực hiện một lệnh duy nhất:

```bash
docker compose --env-file .env.docker up --build -d
```
*Hoặc sử dụng npm script:*
```bash
npm run docker:up
```

> **Ghi chú về cơ sở dữ liệu:**
> Trong lần chạy đầu tiên, container PostgreSQL sẽ tự động nạp cấu trúc bảng từ `database/schema.sql` và chèn dữ liệu mẫu từ `database/seed.sql` thông qua thư mục `/docker-entrypoint-initdb.d/`.

### Bước 2: Truy cập ứng dụng

- **Frontend (Giao diện React):** [http://localhost:5173](http://localhost:5173)
- **Backend API:** [http://localhost:3000/api/tickets](http://localhost:3000/api/tickets)
- **Kiểm tra trạng thái backend:** [http://localhost:3000/api/tickets](http://localhost:3000/api/tickets)
- **PostgreSQL Database:** `localhost:5432` (User: `smartcrm`, Password: `smartcrm_secret`, Database: `smartcrm`)

---

## 4. Các Lệnh Thường Dùng (Cheat Sheet)

### Xem trạng thái các container
```bash
docker compose ps
```

### Xem logs thời gian thực
```bash
# Xem logs toàn bộ hệ thống
docker compose logs -f

# Xem logs riêng backend
docker compose logs -f backend

# Xem logs riêng cơ sở dữ liệu
docker compose logs -f postgres
```

### Dừng toàn bộ hệ thống
```bash
docker compose down
# Hoặc:
npm run docker:down
```

### Dừng và xóa toàn bộ dữ liệu database để reset lại từ đầu (Fresh Reset)
```bash
docker compose down -v
docker compose --env-file .env.docker up --build -d
```

### Chạy trực tiếp lệnh trong container Backend
```bash
# Chạy migration/seed thủ công
docker compose exec backend npm run db:setup

# Mở shell bên trong backend container
docker compose exec backend sh
```

### Kết nối vào PostgreSQL trong container bằng `psql`
```bash
docker compose exec -it postgres psql -U smartcrm -d smartcrm
```

---

## 5. Môi Trường Phát Triển Với Hot-Reload (Dev Mode)

Khi cần chỉnh sửa code Frontend và Backend mà không muốn build lại Docker image mỗi lần:

```bash
docker compose -f docker-compose.yml -f docker-compose.dev.yml up --build
# Hoặc:
npm run docker:dev
```

- Mọi thay đổi trong `src/` hoặc `app.js` sẽ được **Nodemon** tự động reload.
- Mọi thay đổi trong `frontend/src/` sẽ được **Vite HMR** cập nhật ngay trên trình duyệt.

---

## 6. Tùy Biến Cổng và Cấu Hình (.env.docker)

Bạn có thể chỉnh sửa file `.env.docker` để đổi cổng nếu bị trùng với phần mềm khác trên máy:

```env
# Đổi cổng cơ sở dữ liệu
DB_PORT=5433

# Đổi cổng Backend
BACKEND_PORT=3001

# Đổi cổng Frontend
FRONTEND_PORT=8080
```
Sau khi đổi, chạy lại:
```bash
docker compose --env-file .env.docker up -d
```
