# Smart CRM – Tiếp nhận và phân loại yêu cầu bảo hành (Luồng L2)

**Sinh viên:** Lê Quang Anh Tuấn – MSSV: 2374802010538
**Track:** SE
**Học phần:** Chuyên đề Tốt nghiệp 1 – Trường ĐH Văn Lang

## 1. Mô tả bài toán
Nhân viên tiếp nhận tra cứu thông tin khách hàng và thiết bị, phân loại nhóm sự cố kèm mức ưu tiên để hệ thống tự động sinh hạn cam kết (SLA) và tạo phiếu; tiếp theo Quản lý trung tâm phê duyệt các phiếu chưa xác minh bảo hành và giám sát tiến độ cam kết tại đơn vị, kết thúc tại bước phiếu bảo hành được xác nhận hợp lệ kèm lịch sử trạng thái.

## 2. Phạm vi
- **Làm:** Tra cứu/tạo khách hàng kèm chuẩn hóa SĐT (QT-01, QT-02), kiểm tra hạn bảo hành thiết bị (QT-03, QT-05), phân loại sự cố chuẩn hóa, tự động tính hạn cam kết SLA theo ngày làm việc (QT-04), chuyển trạng thái một chiều có lưu log (QT-06) và phê duyệt phiếu chưa xác minh bảo hành.
- **Không làm:** Phân công kỹ thuật viên sửa chữa (L4), quản lý tồn kho linh kiện (L5), khảo sát hài lòng sau bảo hành (L8).

## 3. Công nghệ sử dụng
| Thành phần | Công nghệ |
|---|---|
| Frontend | ReactJS, TailwindCSS |
| Backend | Node.js, Express.js |
| Cơ sở dữ liệu | PostgreSQL |
| Kiểm thử | Postman, Java, Selenium WebDriver |

## 4. Cấu trúc thư mục
- `docs/diagrams/`: Tài liệu SRS, sơ đồ Use Case, ERD
- `src/backend/`: Mã nguồn RESTful API
- `src/frontend/`: Mã nguồn giao diện người dùng
- `tests/`: Kịch bản và script kiểm thử

## 5. Hướng dẫn cài đặt & chạy
1. Tạo CSDL PostgreSQL tên `smartcrm` và cấu hình file `.env` từ `.env.example`.
2. Di chuyển vào `src/backend`, chạy `npm install` và `node index.js`.

## 6. Khai báo sử dụng công cụ AI
| Công cụ | Dùng vào việc gì | Cách tự kiểm chứng |
|---|---|---|
| Gemini | Hỗ trợ rà soát phạm vi luồng L2, chuẩn hóa User Stories và tạo khung README.md | Đối chiếu trực tiếp với tài liệu Case Study Smart CRM – Mekong Mobile (Mục 2, Mục 7, Mục 9) |