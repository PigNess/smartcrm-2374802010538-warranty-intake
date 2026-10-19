NHẬT KÝ THAY ĐỔI THIẾT KẾ & KHẮC PHỤC PHẢN HỒI BÀI TẬP 1 (BT1)

Dự án: Smart CRM - L2: Tiếp nhận & Phân loại Bảo hành

Mã học phần: CHUYÊN ĐỀ TỐT NGHIỆP / THỰC HÀNH TRIỂN KHAI HỆ THỐNG

Ngày cập nhật: 19/10/2026

I. TỔNG QUAN ĐÁNH GIÁ TỪ GIẢNG VIÊN (BT1)

Điểm tổng kết BT1: 6.5 / 10

Đầy đủ: 8.0 / 10

Kỹ thuật: 5.0 / 10

Nhất quán: 5.5 / 10

Trình bày: 6.0 / 10

Các điểm tốt đã ghi nhận:

NFR01–NFR03 có ngưỡng đo lường rõ ràng (<1.5s với 100.000 bản ghi, 150 CCU, danh sách 20 dòng/trang <2s). Lập luận kiến trúc đúng khuôn mẫu và có phân tích đánh đổi (B-Tree index làm chậm ghi, JWT tăng băng thông).

ERD thiết kế đủ 5 bảng có đầy đủ Khóa chính (PK), Khóa ngoại (FK); DDL PostgreSQL có tạo index idx_customer_phone đáp ứng NFR01; bảng ticket_status_log đáp ứng nghiệp vụ BR03.

Đặc tả UC04 có luồng ngoại lệ 4a.1, 4a.2 đánh số rõ ràng cho trường hợp khuyết ngày mua.

II. DANH SÁCH CHI TIẾT CÁC ĐIỂM CẦN KHẮC PHỤC (CHUẨN 4 DÒNG/MỤC)

1. Bổ sung Danh sách User Story và Phân loại MoSCoW

Phản hồi BT1: Bài không có danh sách User Story chi tiết, chỉ ghi mã US01–US06 trong ngoặc sau FR; thiếu nội dung dạng "Là... tôi muốn... để..." và mức ưu tiên MoSCoW cho từng story.

Phân tích: Thiếu định dạng User Story chuẩn làm giảm góc nhìn người dùng cuối đối với yêu cầu phần mềm và làm đứt gãy tính truy vết (traceability) từ Yêu cầu chức năng (FR) sang User Story.

Giải pháp xử lý: Đã bổ sung bảng chi tiết 6 User Stories (US01 đến US06) theo cấu trúc "Là [Actor], tôi muốn [Hành động] để [Mục tiêu]" kèm theo gán nhãn ưu tiên MoSCoW (Must, Should, Could, Won't) vào tài liệu docs/srs.md.

Trạng thái: Đã hoàn thành (Cập nhật trong Buổi 8).

2. Chuẩn hóa & Đồng bộ Mã Use Case (UC) giữa SRS, Bảng truy vết và Sơ đồ

Phản hồi BT1: Mã UC lệch giữa Bảng truy vết và Sơ đồ: SRS ghi FR04->UC05, FR05->UC06 nhưng Sơ đồ thể hiện UC05 = Cập nhật trạng thái, UC06 = Phê duyệt phiếu ngoại lệ, UC08 = Cập nhật danh mục; bước 4a.2 đặc tả UC04 ghi chuyên sang UC05 thay vì UC06 cho QLTT.

Phân tích: Việc lệch mã giữa các file thiết kế (srs.md, PDF và UseCaseDiagram.drawio) làm suy giảm trực tiếp điểm Nhất quán (5.5/10) và gây hiểu nhầm luồng xử lý hệ thống.

Giải pháp xử lý: Đã rà soát lại toàn bộ Bảng truy vết, đồng bộ hóa mã UC trên sơ đồ và tài liệu SRS: Gán cố định UC05 = Cập nhật trạng thái phiếu, UC06 = Phê duyệt phiếu ngoại lệ, UC08 = Cập nhật danh mục nhóm sự cố; đồng thời sửa luồng 4a.2 trong UC04 chuyển chính xác sang UC06.

Trạng thái: Đã hoàn thành (Cập nhật trong Buổi 8).

3. Bổ sung Bảng Chú thích Ký hiệu (Legend) và Ánh xạ Wireframe

Phản hồi BT1: ERD và sơ đồ kiến trúc chưa có bảng chú thích ký hiệu; sơ đồ kiến trúc chỉ có ghi trách nhiệm; wireframe chưa ghi rõ màn hình thuộc Use Case nào.

Phân tích: Sơ đồ kỹ thuật thiếu Legend làm cho người đọc/đội ngũ phát triển khó nhận biết chính xác các ký hiệu quan hệ (PK, FK, 1-N) hoặc các tầng kiến trúc.

Giải pháp xử lý: Đã bổ sung khối Chú thích ký hiệu (Legend) vào góc sơ đồ trong các file ERD.drawio và Archi.drawio; bổ sung tiêu đề ánh xạ Use Case tương ứng (ví dụ: [UC01] Màn hình tiếp nhận phiếu) lên trên từng khung Wireframe trong Wireframe1-3.drawio.

Trạng thái: Đã hoàn thành (Cập nhật trong Buổi 8).

4. Bổ sung Cột Mô tả lỗi (issue_description) vào Bảng tickets

Phản hồi BT1: Wireframe thể hiện trường ghi nhận mô tả lỗi (như "Vỡ kính") nhưng trong ERD và bảng tickets của Cơ sở dữ liệu lại không có cột lưu trữ thông tin này.

Phân tích: Sự bất bất đồng bộ giữa Giao diện người dùng (UI Wireframe) và Cơ sở dữ liệu (Database Schema) khiến dữ liệu mô tả sự cố của khách hàng không có nơi lưu trữ.

Giải pháp xử lý: Đã cập nhật bảng tickets bổ sung cột issue_description TEXT đồng bộ trên ERD, file DDL schema.sql, lớp Repository/Service ở Backend Node.js và Form nhập liệu phía ReactJS Frontend.

Trạng thái: Đã hoàn thành (Cập nhật trong Buổi 8).

5. Bổ sung Tệp schema.sql và Chuẩn hóa Tệp Khai báo AI (ai-disclosure.md)

Phản hồi BT1: Thiếu file schema.sql trong thư mục docs/ (mặc dù trong file PDF báo cáo có ghi); Phụ lục khai báo AI chỉ viết 1 dòng chung chung cho toàn bộ mục 1-5.

Phân tích: Khai báo AI quá ngắn làm giảm tính minh bạch trong quá trình thực hiện đồ án; thiếu tệp DDL gốc làm người khác không thể khởi tạo lại CSDL đúng chuẩn.

Giải pháp xử lý: Tạo tệp schema.sql lưu toàn bộ câu lệnh DDL PostgreSQL (gồm 5 bảng, PK/FK, Trigger, Index idx_customer_phone); tạo tệp docs/ai-disclosure.md trình bày chi tiết từng mục AI hỗ trợ (gợi ý kiến trúc, viết test, sinh code mẫu) và các phần sinh viên tự thực hiện/kiểm chứng.

Trạng thái: Đã hoàn thành (Cập nhật trong Buổi 8).

6. Khắc phục Quy trình Quản lý Git Repository & Merging

Phản hồi BT1: Nhánh main chỉ có skeleton từ 25/09, toàn bộ nội dung nằm ở nhánh dev; lịch sử commit bị dồn (2 commit cuối 'Hoan thanh Bai Tap 1...' gộp toàn bộ nội dung).

Phân tích: Không thực hiện Git flow chuẩn làm nhánh chính main bị lỗi thời, đồng thời commit message dồn đống vi phạm quy tắc Conventional Commits.

Giải pháp xử lý: Đã chia nhỏ các thay đổi và commit theo chuẩn Conventional Commits (feat:, docs:, fix:); thực hiện thao tác git checkout main -> git merge dev -> git push origin main để đồng bộ toàn bộ mốc phát triển mới nhất lên nhánh main.

Trạng thái: Đã hoàn thành (Cập nhật trong Buổi 8).

7. Sửa lỗi Định dạng File Nộp bài và Màu nền Sơ đồ

Phản hồi BT1: Nộp file .docx thay vì xuất PDF (bị trừ -1.5 điểm theo quy định TC1); sơ đồ chụp từ canvas nền đen gây khó đọc khi in ấn tài liệu.

Phân tích: File .docx dễ vỡ khung và nhảy trang khi mở trên các thiết bị khác nhau; sơ đồ nền đen không phù hợp cho in ấn tài liệu kỹ thuật.

Giải pháp xử lý: Đã chuyển toàn bộ background canvas trong Draw.io sang nền trắng/sáng; thiết lập quy trình xuất bản báo cáo ra file .pdf cho tất cả các đợt nộp bài tiếp theo.

Trạng thái: Đã hoàn thành (Cập nhật trong Buổi 8).

III. KẾ HOẠCH N HÀNH ĐỘNG CHO BÀI TẬP 2 (BT2)

Dựa trên các gợi ý trực tiếp từ Giảng viên cho giai đoạn BT2:

Quản lý Mã nguồn: Duy trì việc gộp mã nguồn từ dev về main sau mỗi buổi làm việc.

Cơ sở dữ liệu & Tài liệu AI: Đảm bảo duy trì cập nhật tệp schema.sql và docs/ai-disclosure.md liên tục theo các tính năng mới.

Kiểm thử Đơn vị (Unit Test): Viết unit test cho hàm tính toán thời hạn SLA bảo hành, trong đó bắt buộc có logic bỏ qua ngày Chủ nhật (đáp ứng Quy định nghiệp vụ BR02).