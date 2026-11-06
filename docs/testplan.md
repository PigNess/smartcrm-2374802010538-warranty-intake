# Test Plan Rút Gọn - Dự Án Smart CRM

## 1. Phạm vi kiểm thử (Scope) & Phần chú ý không kiểm thử (Out of Scope)
- **Phạm vi kiểm thử (In-Scope):**
  - Kiểm thử chức năng API quản lý Phiếu bảo hành (Tickets): Tạo mới, lấy danh sách, cập nhật trạng thái, xóa.
  - Kiểm thử chức năng API quản lý Khách hàng (Customers): CRUD đầy đủ.
  - Kiểm thử cơ chế xác thực tài khoản (Authentication) và phân quyền bảo mật dữ liệu dựa trên vai trò (`RECEPTIONIST` và `MANAGER`).
  - Kiểm thử các quy tắc nghiệp vụ cốt lõi: Chuẩn hóa số điện thoại, tính hạn cam kết SLA (bỏ qua Chủ Nhật), kiểm tra điều kiện bảo hành theo thời hạn (QT-05).
- **Phần chú ý không kiểm thử (Out of Scope):**
  - Không kiểm thử hiệu năng chịu tải cao (Load Testing / Stress Testing) với hàng nghìn request đồng thời trên giây.
  - Không kiểm thử giao diện người dùng trên các thiết bị di động (Mobile Responsive UI) ở giai đoạn này do tập trung vào Backend API.
  - Không kiểm thử tích hợp cổng thanh toán bên thứ ba hoặc dịch vụ gửi SMS thực tế.

## 2. Loại test và số lượng mỗi tầng (Test Types & Counts)
Hệ thống áp dụng 4 loại test bắt buộc cho phần mềm:
- **Positive Test (Kiểm thử luồng đúng):** 4 test case (Đăng nhập đúng, tạo phiếu thành công, CRUD khách hàng chuẩn, lấy danh sách đúng quyền).
- **Negative Test (Kiểm thử luồng sai / lỗi):** 4 test case (Thiếu trường bắt buộc, sai mật khẩu đăng nhập, truy cập không có token, thao tác ID không tồn tại).
- **Boundary Test (Kiểm thử giá trị biên):** 2 test case (Kiểm tra đúng ngày hết hạn bảo hành và quá hạn 1 ngày theo QT-05).
- **Look & Feel / Security Test (Kiểm thử bảo mật & chất lượng dữ liệu):** 2 test case (Kiểm tra cơ chế che 4 số giữa SĐT với role `RECEPTIONIST` và hiển thị đầy đủ với `MANAGER`).
- **Tổng số lượng:** 12 Test Case.

## 3. Tiêu chí thành công đo được (Success Criteria)
- Tỷ lệ thực thi test case đạt 100%.
- Các test case thuộc luồng đúng (Positive) và nghiệp vụ cốt lõi phải đạt kết quả **PASS**.
- Hệ thống trả về đúng mã trạng thái HTTP (200, 201, 400, 401, 404, 409) và thông điệp lỗi chuẩn xác khi gặp dữ liệu sai.
- Chức năng phân quyền che số điện thoại hoạt động chính xác 100% theo đúng phân quyền vai trò đăng nhập.

## 4. Môi trường và dữ liệu thử (Environment & Test Data)
- **Môi trường thực thi:**
  - Hệ điều hành: Windows 11.
  - Môi trường Runtime: Node.js (v18+), cơ sở dữ liệu PostgreSQL.
  - Công cụ kiểm thử API: Postman / Jest.
- **Kỹ thuật chọn dữ liệu thử:**
  - *Phân vùng tương đương (Equivalence Partitioning):* Phân loại dữ liệu đầu vào thành hợp lệ (chuỗi đúng định dạng, số điện thoại 10 số bắt đầu bằng 0) và không hợp lệ (thiếu trường, sai định dạng).
  - *Giá trị biên (Boundary Value Analysis):* Kiểm tra các mốc thời gian bảo hành chính xác tại ngày hết hạn (`ngayKiemTra == ngayHetHan`) và ngay sau biên (`ngayKiemTra > ngayHetHan`).
  - *Dữ liệu mẫu giả lập:* Được khởi tạo tự động thông qua script migration và seed data (`npm run db:setup`).