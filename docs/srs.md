# BẢN ĐẶC TẢ YÊU CẦU PHẦN MỀM RÚT GỌN (SRS)

## 1. Thông tin chung
- **Học phần:** Chuyên đề Tốt nghiệp 1
- **Sinh viên:** Lê Quang Anh Tuấn
- **MSSV:** 2374802010538
- **Track:** SE (Software Engineering)
- **Bài toán:** Luồng L2 – Tiếp nhận và phân loại yêu cầu bảo hành (Hệ thống Smart CRM – Mekong Mobile)

---

## 2. Nội dung chi tiết SRS

### Mục 1.1: Giới thiệu và ranh giới phạm vi
- **Bối cảnh:** Tài liệu này đặc tả phân hệ Tiếp nhận và Phân loại yêu cầu bảo hành (Luồng L2) thuộc hệ thống Smart CRM nhằm chuẩn hóa quy trình đầu vào.
- **Luồng nghiệp vụ cốt lõi:** Tra cứu/tạo mới hồ sơ KH và định danh thiết bị -> Kiểm tra điều kiện bảo hành -> Phân loại nhóm sự cố, mức độ ưu tiên -> Hệ thống tự động tính hạn cam kết (SLA) & lập phiếu -> Quản lý duyệt phiếu ngoại lệ -> Kết thúc.
- **Điều KHÔNG LÀM (Mức WON'T):**
  - Không thực hiện phân công kỹ thuật viên (L4).
  - Không quản lý tồn kho và xuất/nhập linh kiện (L5).
  - Không thực hiện khảo sát độ hài lòng của khách hàng (L8).

**Bảng thuật ngữ:**

| Thuật ngữ | Ý nghĩa / Diễn giải |
| :--- | :--- |
| **Ticket (Phiếu bảo hành)** | Đơn điện tử trên hệ thống ghi nhận yêu cầu sửa chữa/bảo hành của khách hàng đối với một thiết bị cụ thể. |
| **SLA (Service Level Agreement)** | Hạn thời gian cam kết tối đa mà trung tâm phải xử lý xong Ticket tính từ lúc tiếp nhận (đơn vị: giờ). |
| **Issue Category** | Danh mục nhóm sự cố phần cứng/phần mềm chuẩn hóa (VD: Lỗi nguồn, Lỗi màn hình) do Quản lý trung tâm thiết lập. |
| **Phiếu ngoại lệ** | Ticket thuộc về thiết bị thiếu thông tin ngày mua (trống dữ liệu), hệ thống không tự động tính được thời hạn bảo hành. |
| **Serial/IMEI** | Chuỗi mã định danh duy nhất (Unique) của mỗi thiết bị phần cứng dùng để truy xuất lịch sử bảo hành. |
| **Audit Log (Nhật ký hệ thống)** | Cơ chế tự động ghi vết toàn bộ lịch sử thay đổi trạng thái của phiếu (bao gồm thời gian đổi, trạng thái cũ, trạng thái mới). |
| **CCU (Concurrent Users)** | Số lượng người dùng truy cập và thao tác trên hệ thống cùng một lúc (dùng để đo lường khả năng chịu tải). |

### Mục 1.2: Các bên liên quan và vai trò
- **Nhân viên tiếp nhận:** Có quyền tra cứu khách hàng, định danh thiết bị, lập Ticket và cập nhật trạng thái xử lý cơ bản. KHÔNG có quyền sửa đổi danh mục sự cố hay phê duyệt phiếu ngoại lệ.
- **Quản lý trung tâm:** Có quyền giám sát tiến độ SLA, phê duyệt/từ chối phiếu ngoại lệ, cập nhật danh mục nhóm sự cố và xem thông tin bảo mật KH. KHÔNG thao tác luồng tạo phiếu hàng ngày.
- **Hệ thống tính toán (System Timer):** Actor phụ trợ (hệ thống) đảm nhiệm việc tự động tính toán, đếm ngược và đối chiếu hạn SLA.

### Mục 1.3: Yêu cầu chức năng (FR)
- **FR01 (Quản lý khách hàng):** Hệ thống cho phép tra cứu và tạo mới hồ sơ khách hàng bằng Số điện thoại. `[Mã US: US01 | MoSCoW: MUST]`
- **FR02 (Định danh thiết bị):** Hệ thống cho phép ghi nhận thiết bị qua Serial/IMEI để đối chiếu hạn bảo hành. `[Mã US: US02 | MoSCoW: MUST]`
- **FR03 (Lập phiếu & tính SLA):** Hệ thống hỗ trợ tạo Ticket, chọn nhóm sự cố/mức ưu tiên và tự động xuất ra hạn cam kết. `[Mã US: US03 | MoSCoW: MUST]`
- **FR04 (Phê duyệt ngoại lệ):** Hệ thống cung cấp danh sách thiết bị khuyết ngày mua để quản lý duyệt tiếp nhận/từ chối. `[Mã US: US04 | MoSCoW: SHOULD]`
- **FR05 (Quản lý danh mục):** Hệ thống cho phép cập nhật trạng thái của Issue Category để chuẩn hóa phân loại lỗi. `[Mã US: US05 | MoSCoW: COULD]`

### Mục 1.4: Yêu cầu phi chức năng (NFR)
- **NFR01 (Hiệu năng):** Thời gian phản hồi của API tra cứu khách hàng/thiết bị phải **dưới 1.5 giây** trên CSDL quy mô 100.000 bản ghi.
- **NFR02 (Tính khả dụng):** Hệ thống API phải đáp ứng khả năng chịu tải đồng thời tối thiểu **150 CCU** (Concurrent Users) mà không gián đoạn.
- **NFR03 (Giao diện):** Danh sách Ticket hiển thị trên màn hình Quản lý phải tải và render hoàn tất trong vòng **dưới 2 giây**.

### Mục 1.5: Ràng buộc và quy tắc nghiệp vụ
- **QT-01 (Chuẩn hóa dữ liệu):** Số điện thoại đầu vào bắt buộc được hệ thống tự động chuẩn hóa định dạng 10 chữ số, bắt đầu bằng số `0`. Nhân viên thao tác chỉ được xem định dạng che giấu một phần (VD: `090****567`).
- **QT-04 (Thuật toán SLA):** Hạn cam kết SLA chỉ được cộng dồn theo ngày làm việc, hệ thống bắt buộc tự động bỏ qua ngày Chủ Nhật khi tính hạn chót.
- **QT-06 (Bảo toàn tiến trình):** Trạng thái Ticket diễn ra theo một chiều tiến lên, nghiêm cấm các thao tác quay lui. Mọi sự thay đổi bắt buộc được hệ thống ghi vết tự động (Audit Log) kèm timestamp.

### Mục 1.6: Bảng truy vết yêu cầu
| Mã FR | Tên Yêu Cầu Chức Năng | Mã User Story | Mã Use Case | Mức độ ưu tiên |
| :--- | :--- | :--- | :--- | :--- |
| FR01 | Quản lý khách hàng | US01 | UC01, UC02 | Must Have |
| FR02 | Định danh thiết bị | US02 | UC03 | Must Have |
| FR03 | Lập phiếu & tính SLA | US03 | UC04 | Must Have |
| FR04 | Phê duyệt ngoại lệ | US04 | UC06 | Should Have |
| FR05 | Quản lý danh mục | US05 | UC08 | Could Have |
