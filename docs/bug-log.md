# Nhật Ký Sửa Lỗi (Bug Log) - Smart CRM

## BUG-01: Lỗi kết nối và thiếu khởi tạo cấu trúc quan hệ bảng dữ liệu khi khởi chạy
1. **Mã và mức độ:** BUG-01 - Major (Lỗi cấu hình / Môi trường CSDL)
2. **Phát hiện bởi:** Lê Quang Anh Tuấn
3. **Triệu chứng:** Khi khởi chạy ứng dụng lần đầu trên môi trường trống, hệ thống báo lỗi `relation "tickets" does not exist` do cơ sở dữ liệu PostgreSQL chưa được thiết lập bảng.
4. **Cách tái lập:** Tạo một database PostgreSQL mới, cấu hình file `.env` rồi chạy lệnh `npm start` mà không chạy trước script tạo bảng.
5. **Nguyên nhân:** Thiếu tập lệnh tự động hóa migration cấu trúc `schema.sql` và dữ liệu mồi `seed.sql` khiến ứng dụng không tự động dựng sẵn schema.
6. **Cách sửa:** Xây dựng script tự động hóa tại `scripts/db-setup.js` đọc và thực thi các tệp SQL cấu trúc, đồng thời tích hợp lệnh `"db:setup"` vào `package.json`.
7. **Commit và xác nhận:** Commit `fix: bổ sung migration, seed data và script tự động dựng CSDL (BUG-01)` [Nhớ dán link commit thực tế của bạn] -> Chạy `npm run db:setup` thành công, các bảng được tạo đầy đủ.

## BUG-02: Lỗi 404 Not Found khi gọi các phương thức CRUD của thực thể Khách hàng
1. **Mã và mức độ:** BUG-02 - Major (Lỗi thiếu sót tuyến đường API)
2. **Phát hiện bởi:** Lê Quang Anh Tuấn
3. **Triệu chứng:** Khi gửi yêu cầu HTTP đến các endpoint quản lý khách hàng (`/api/customers`), Postman trả về mã lỗi `404 Not Found`.
4. **Cách tái lập:** Gửi request `GET /api/customers` hoặc `POST /api/customers` khi hệ thống chưa định nghĩa router cho thực thể khách hàng.
5. **Nguyên nhân:** Dự án ban đầu chỉ tập trung xây dựng module cho phiếu bảo hành (`tickets`), chưa hoàn thiện tầng Repository, Controller và Routes cho thực thể phụ (`customers`).
6. **Cách sửa:** Lập trình bổ sung `customer.repo.js`, `customer.controller.js`, `customer.routes.js` và đăng ký tuyến đường vào `index.js`.
7. **Commit và xác nhận:** Commit `fix: bổ sung đủ API CRUD cho thực thể Khách hàng (BUG-02)` [Nhớ dán link commit thực tế của bạn] -> Kiểm chứng các API trả về mã trạng thái 200/201 thành công.

## BUG-03: Lỗi rò rỉ dữ liệu nhạy cảm (SĐT) do chưa tích hợp Middleware xác thực phân quyền
1. **Mã và mức độ:** BUG-03 - Critical (Lỗ hổng bảo mật & Phân quyền)
2. **Phát hiện bởi:** Lê Quang Anh Tuấn
3. **Triệu chứng:** Các endpoint danh sách phiếu bảo hành trả về toàn bộ số điện thoại khách hàng mà không kiểm tra xem người gọi API có quyền hạn hay vai trò tương ứng hay không.
4. **Cách tái lập:** Gửi request `GET /api/tickets` mà không đính kèm Token xác thực trong Header -> Hệ thống vẫn trả về dữ liệu bình thường.
6. **Nguyên nhân:** Thiếu tầng kiểm tra JWT (`auth.middleware.js`) và logic xử lý ẩn bớt ký tự số điện thoại (Masking) dựa trên phân quyền vai trò (`RECEPTIONIST`).
7. **Cách sửa:** Xây dựng cơ chế đăng nhập cấp token, bổ sung middleware `verifyToken` vào route tickets và viết hàm logic tự động che 4 số giữa của SĐT nếu role là nhân viên lễ tân.
7. **Commit và xác nhận:** Commit `fix: hoàn thiện bảo mật phân quyền, đăng nhập và che SĐT (BUG-03)` [Nhớ dán link commit thực tế của bạn] -> Test thực tế: tài khoản lễ tân bị che SĐT, tài khoản quản lý hiển thị đầy đủ, chưa đăng nhập bị chặn (401).