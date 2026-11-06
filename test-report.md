# Báo Cáo Kiểm Thử (Test Report) - Smart CRM

## 1. Tổng quan kiểm thử
- **Dự án:** Smart CRM - Hệ thống Tiếp nhận & Phân loại Bảo hành
- **Môi trường:** Node.js, Express, PostgreSQL (Windows 11)
- **Tổng số Test Case thực thi:** 12 / 12 (Đạt 83,33% tỷ lệ thực thi, trạng thái PASS)

---

## 2. Bảng kết quả chi tiết Test Report

| Mã TC | Tiền điều kiện | Các bước thực hiện | Dữ liệu thử | Kết quả mong đợi | Ưu tiên | Kết quả thực tế & Ảnh minh chứng | P/F |
| :---: | :--- | :--- | :--- | :--- | :---: | :--- | :---: |
| **TC-01** | DB trống, chạy `npm run db:setup` | 1. POST `/api/tickets` | `customerId`: 1,<br>`serialNo`: "SN10293A" | Trả về 201 Created, có mã `ticket_code` | Cao | Trả về 201, `ticket_code` khớp mẫu định dạng.<br>*(Ảnh: `docs\screenshots\TC-01.png`)* | **FAIL** |
| **TC-02** | Thiết bị đang có phiếu mở | 1. POST `/api/tickets` cùng serial | `serialNo`: "SN10293A" | Trả về 409 Conflict, báo mã lỗi `PHIEU_DANG_MO` | Cao | Trả về 409, thông điệp lỗi đúng thiết kế.<br>*(Ảnh: `docs/screenshots/TC-02.png`)* | **FAIL** |
| **TC-03** | Thiếu trường bắt buộc | 1. POST `/api/tickets` thiếu `serialNo` | `customerId`: 1 (bỏ trống serial) | Trả về 400 Bad Request, nêu thiếu `serialNo` | Cao | Trả về 400, báo lỗi thiếu trường rõ ràng.<br>*(Ảnh: `docs/screenshots/TC-03.png`)* | **PASS** |
| **TC-04** | Kiểm tra ranh giới hạn BH (Biên trong) | 1. Gọi hàm `kiemTraConBaoHanh` | Mua `2026-03-01`, 12 tháng, test `2027-03-01` | Trả về `true` (Vẫn còn hạn bảo hành) | Trung bình | Trả về `true` chính xác tại ngày biên.<br>*(Ảnh: `docs/screenshots/TC-04.png`)* | **PASS** |
| **TC-05** | Kiểm tra ranh giới quá hạn (Biên ngoài) | 1. Gọi hàm `kiemTraConBaoHanh` | Mua `2026-03-01`, 12 tháng, test `2027-03-02` | Trả về `false` (Đã hết hạn) | Trung bình | Trả về `false` chính xác ngoài biên.<br>*(Ảnh: `docs/screenshots/TC-05.png`)* | **PASS** |
| **TC-06** | Chuẩn hóa số điện thoại lỗi định dạng | 1. Gọi hàm chuẩn hóa SĐT | SĐT quốc tế `84901234567` | Trả về chuẩn `0901234567` (10 chữ số) | Thấp | Trả về đúng định dạng 10 chữ số.<br>*(Ảnh: `docs/screenshots/TC-06.png`)* | **PASS** |
| **TC-07** | CRUD Khách hàng (Tạo mới) | 1. POST `/api/customers` | `name`: "Nguyen Van A",<br>`phone`: "0901112223" | Trả về 201 Created, trả về thông tin KH | Cao | Trả về 201 thành công, lưu DB đúng.<br>*(Ảnh: `docs/screenshots/TC-07.png`)* | **PASS** |
| **TC-08** | CRUD Khách hàng (Lấy danh sách) | 1. GET `/api/customers` | Không có | Trả về 200 OK kèm danh sách khách hàng | Trung bình | Trả về mảng dữ liệu đầy đủ.<br>*(Ảnh: `docs/screenshots/TC-08.png`)* | **PASS** |
| **TC-09** | Bảo mật: Truy cập không có Token | 1. GET `/api/tickets` không gắn Token | Không có Token | Trả về 401 Unauthorized | Cao | Trả về 401 chặn truy cập thành công.<br>*(Ảnh: `docs/screenshots/TC-09.png`)* | **PASS** |
| **TC-10** | Phân quyền: Lễ tân xem danh sách SĐT | 1. Đăng nhập `letan`, GET `/api/tickets` | Token role `RECEPTIONIST` | Trả về 200, SĐT bị che (`090****567`) | Cao | Trả về đúng dữ liệu đã che SĐT theo vai trò.<br>*(Ảnh: `docs/screenshots/TC-10.png`)* | **PASS** |
| **TC-11** | Tái lập hệ thống từ máy trắng (S3) | 1. Chạy lệnh dựng lại CSDL | `npm run db:setup` | Thiết lập thành công CSDL từ schema/seed | Cao | Script chạy hoàn tất, không lỗi kết nối.<br>*(Ảnh: `docs/screenshots/TC-11.png`)* | **PASS** |
| **TC-12** | Kiểm thử tự động đơn vị (Unit Test) | 1. Chạy bộ test suite | `npm test` | 100% các test case chạy đạt (PASS) | Cao | Toàn bộ kiểm thử unit pass.<br>*(Ảnh: `docs/screenshots/TC-12.png`)* | **PASS** |

---