# Smart CRM – Tiếp nhận và phân loại yêu cầu bảo hành (Luồng L2)

**Sinh viên:** Lê Quang Anh Tuấn – MSSV: 2374802010538
**Track:** SE
**Học phần:** Chuyên đề Tốt nghiệp 1 – Trường ĐH Văn Lang

## 1. Mô tả bài toán
Nhân viên tiếp nhận tra cứu khách hàng & thiết bị -> Kiểm tra hạn bảo hành, phân loại nhóm sự cố & mức ưu tiên -> Hệ thống tự động tính hạn cam kết (SLA) & lập phiếu -> Quản lý trung tâm phê duyệt phiếu chưa xác minh bảo hành & giám sát hạn cam kết -> Kết thúc khi phiếu được xác nhận hợp lệ kèm lịch sử trạng thái.

## 2. Phạm vi
- Làm:
  - Tra cứu và tạo mới khách hàng kèm chuẩn hóa SĐT 10 số bắt đầu bằng 0 (QT-01, QT-02) và che SĐT đối với nhân viên (QT-15).
  - Quản lý thiết bị theo Serial/IMEI duy nhất (QT-03) và tự động kiểm tra điều kiện bảo hành dựa trên ngày mua (QT-05).
  - Lập phiếu bảo hành, phân loại sự cố theo danh mục chuẩn (issue_category) và tự động tính hạn cam kết SLA theo mức ưu tiên từ thứ Hai đến thứ Bảy (QT-04).
  - Cập nhật trạng thái phiếu một chiều có ghi log (QT-06), xóa mềm (QT-13), phân quyền theo trung tâm (QT-14) và luồng Quản lý trung tâm phê duyệt phiếu chưa xác minh bảo hành (QT-05).
- Không làm:
  - Phân công kỹ thuật viên theo điểm tay nghề và ghi nhận sửa chữa (thuộc luồng L4).
  - Quản lý tồn kho và xuất linh kiện bảo hành (thuộc luồng L5).
  - Khảo sát mức độ hài lòng của khách hàng sau khi đóng phiếu (thuộc luồng L8).

## 3. Công nghệ sử dụng
| Thành phần | Công nghệ |
|---|---|
| Frontend | ReactJS, TailwindCSS |
| Backend | Node.js, Express.js |
| Cơ sở dữ liệu | PostgreSQL |
| Kiểm thử | Postman, Java, Selenium WebDriver |

## 4. Cấu trúc thư mục
- `docs/diagrams/`: Tài liệu đặc tả yêu cầu (SRS), sơ đồ Use Case, ERD, khai báo AI
- `src/backend/`: Mã nguồn RESTful API (Node.js / Express)
- `src/frontend/`: Mã nguồn giao diện người dùng (ReactJS)
- `tests/`: Kịch bản và script kiểm thử

## 5. Hướng dẫn cài đặt & chạy

## 6. Khai báo sử dụng công cụ AI
| Công cụ | Dùng vào việc gì | Cách tự kiểm chứng |
|---|---|---|
| Gemini | Hỗ trợ rà soát phạm vi luồng L2, chuẩn hóa User Stories và tạo khung README.md | Đối chiếu trực tiếp với tài liệu Case Study Smart CRM – Mekong Mobile và kiểm tra thực tế trên GitHub repo |