# DANH SÁCH LỖI (BUG LOG) - SMART CRM
**Sinh viên thực hiện:** Lê Quang Anh Tuấn
**Mã SV:** 2374802010538

---

### Bug 01 (Critical): Lỗi xung đột cấu trúc khởi chạy app.js và supertest
1. **Mô tả lỗi:** Khi chạy lệnh test tự động qua Jest, Supertest trả về lỗi `TypeError: app.address is not a function`.
2. **Các bước tái lập:** Thực thi lệnh `npx jest tests/ticket.test.js` từ terminal.
3. **Kết quả thực tế:** Test suite sập ngay từ khâu khởi tạo kết nối ứng dụng HTTP ảo.
4. **Kết quả mong đợi:** Supertest liên kết thành công với ứng dụng Express và thực thi các HTTP request.
5. **Nguyên nhân:** File `app.js` ban đầu chứa các đoạn logic xử lý database/service thay vì khai báo đối tượng ứng dụng Express độc lập.
6. **Hướng giải quyết / Fix:** Tách biệt rõ ràng file `app.js` chỉ làm nhiệm vụ cấu hình Express, route middleware và xuất `module.exports = app`.
7. **Link commit: https://github.com/PigNess/smartcrm-2374802010538-warranty-intake/commit/d831cf97f4589e1a00df5335f0ec17cde808d0e0
---

### Bug 02 (Major): Lỗi thiếu thông tin liên kết cơ sở dữ liệu khi tạo phiếu bảo hành
1. **Mô tả lỗi:** Các test case tạo phiếu TC-01 và TC-02 trả về mã lỗi 400 thay vì mã thành công hoặc mã xung đột trùng lặp.
2. **Các bước tái lập:** Gửi request POST `/api/tickets` với payload chứa `customerId` và `serialNo`.
3. **Kết quả thực tế:** Controller và Service không tự động phân giải tên khách hàng từ bảng `customers`.
4. **Kết quả mong đợi:** Hệ thống tự động truy vấn thông tin khách hàng và thiết bị dựa vào khóa ngoại.
5. **Nguyên nhân:** Thiếu tầng xử lý logic truy vấn bảng `customers` và `devices` trong service.
6. **Hướng giải quyết / Fix:** Bổ sung logic tra cứu dữ liệu `pool.query` trong `ticket.service.js` và tạo `ticket.controller.js`.
7. **Link commit: https://github.com/PigNess/smartcrm-2374802010538-warranty-intake/commit/d831cf97f4589e1a00df5335f0ec17cde808d0e0

---

### Bug 03 (Moderate): Lỗi lệch định dạng mã trạng thái HTTP 409 khi trùng lặp phiếu mở
1. **Mô tả lỗi:** Khi tạo phiếu với serial đang có phiếu mở (OPEN), hệ thống trả về mã lỗi chung thay vì mã 409 Conflict.
2. **Các bước tái lập:** Gửi liên tiếp 2 request tạo phiếu bảo hành có cùng số `serialNo`.
3. **Kết quả thực tế:** Trả về mã lỗi 400 kèm thông báo lỗi mặc định.
4. **Kết quả mong đợi:** Trả về mã trạng thái 409 kèm thông điệp `PHIEU_DANG_MO` theo TC-02.
5. **Nguyên nhân:** Tầng service và controller chưa bắt mã lỗi `statusCode = 409` và từ khóa định danh.
6. **Hướng giải quyết / Fix:** Thêm điều kiện kiểm tra trạng thái phiếu trong service, gán `error.statusCode = 409` và cấu hình controller trả về đúng mã 409.
7. **Link commit: https://github.com/PigNess/smartcrm-2374802010538-warranty-intake/commit/d831cf97f4589e1a00df5335f0ec17cde808d0e0
