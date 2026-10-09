# Smart CRM – Tiếp nhận và phân loại yêu cầu bảo hành (Luồng L2)

**Sinh viên:** Lê Quang Anh Tuấn – MSSV: 2374802010538  
**Track:** SE  
**Học phần:** Chuyên đề Tốt nghiệp 1 – Trường ĐH Văn Lang  

---

## 1. Mô tả bài toán và Phạm vi (Mục 1)
**Mô tả cốt lõi:**
Nhân viên tiếp nhận tra cứu khách hàng & thiết bị -> Kiểm tra hạn bảo hành, phân loại nhóm sự cố & mức ưu tiên -> Hệ thống tự động tính hạn cam kết (SLA) & lập phiếu -> Quản lý trung tâm phê duyệt phiếu chưa xác minh bảo hành & giám sát hạn cam kết -> Kết thúc khi phiếu được xác nhận hợp lệ kèm lịch sử trạng thái.

**Phạm vi (In-scope):**
- Tra cứu và tạo mới khách hàng kèm chuẩn hóa SĐT 10 số bắt đầu bằng 0 (QT-01, QT-02) và che SĐT đối với nhân viên (QT-15).
- Quản lý thiết bị theo Serial/IMEI duy nhất (QT-03) và tự động kiểm tra điều kiện bảo hành dựa trên ngày mua (QT-05).
- Lập phiếu bảo hành, phân loại sự cố theo danh mục chuẩn (issue_category) và tự động tính hạn cam kết SLA theo mức ưu tiên từ thứ Hai đến thứ Bảy (QT-04).
- Cập nhật trạng thái phiếu một chiều có ghi log (QT-06), xóa mềm (QT-13), phân quyền theo trung tâm (QT-14) và luồng Quản lý trung tâm phê duyệt phiếu chưa xác minh bảo hành (QT-05).

**Ngoài phạm vi (Out-of-scope / Won't):**
- Phân công kỹ thuật viên theo điểm tay nghề và ghi nhận sửa chữa (thuộc luồng L4).
- Quản lý tồn kho và xuất linh kiện bảo hành (thuộc luồng L5).
- Khảo sát mức độ hài lòng của khách hàng sau khi đóng phiếu (thuộc luồng L8).

## 2. Các bên liên quan và vai trò (Mục 2)
- **Nhân viên tiếp nhận:** Có quyền tra cứu khách hàng, định danh thiết bị, lập Ticket. KHÔNG có quyền sửa đổi danh mục sự cố hay phê duyệt phiếu ngoại lệ.
- **Quản lý trung tâm:** Có quyền giám sát tiến độ SLA, phê duyệt/từ chối phiếu ngoại lệ, cập nhật danh mục nhóm sự cố. 
- **System Timer (Hệ thống):** Tự động tính toán, đếm ngược và đối chiếu hạn SLA.

## 3. Bảng truy vết yêu cầu (Mục 6)
| Mã FR | Tên Yêu Cầu Chức Năng | Mã User Story | Mã Use Case | Mức độ ưu tiên |
| :--- | :--- | :--- | :--- | :--- |
| FR01 | Quản lý khách hàng | US01 | UC01, UC02 | Must Have |
| FR02 | Định danh thiết bị | US02 | UC03 | Must Have |
| FR03 | Lập phiếu & tính SLA | US03 | UC04 | Must Have |
| FR04 | Phê duyệt ngoại lệ | US04 | UC06 | Should Have |
| FR05 | Quản lý danh mục | US05 | UC08 | Could Have |

## 4. Công nghệ sử dụng
| Thành phần | Công nghệ |
|---|---|
| Frontend | ReactJS, TailwindCSS |
| Backend | Node.js, Express.js |
| Cơ sở dữ liệu | PostgreSQL |
| Kiểm thử | Postman, Java, Selenium WebDriver |

## 5. Cấu trúc thư mục (Giai đoạn BT1)
- `docs/`: Chứa tài liệu đặc tả yêu cầu (srs.md), sơ đồ Use Case, ERD, Kiến trúc, Wireframe và api-contract.
- `src/`: Thư mục mã nguồn (hiện tại còn rỗng ở BT1).
- `tests/`: Thư mục kịch bản kiểm thử (hiện tại còn rỗng ở BT1).

## 6. Khai báo sử dụng công cụ AI
| Công cụ | Dùng vào việc gì | Cách tự kiểm chứng |
|---|---|---|
| Gemini | Hỗ trợ rà soát phạm vi luồng L2, chuẩn hóa User Stories, tạo khung README.md và SQL DDL | Đối chiếu trực tiếp với tài liệu Case Study Smart CRM – Mekong Mobile và kiểm tra các nguyên tắc 3NF của CSDL |