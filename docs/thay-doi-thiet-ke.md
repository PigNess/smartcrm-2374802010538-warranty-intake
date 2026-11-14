Cập nhật thiết kế: đóng gói và triển khai bằng Docker (Buổi 3)

Ngày cập nhật: 14/11/2026

Sau khi xử lý các thiếu sót kỹ thuật của Bài tập 2 (S3, S1, tài liệu AI, xác thực), hệ thống được bổ sung lớp đóng gói Docker để mọi máy đều dựng và chạy được cùng một môi trường. Các thay đổi dưới đây không làm đổi nghiệp vụ hay thiết kế cơ sở dữ liệu, chỉ bổ sung cách triển khai và tài liệu đi kèm.

1. Đóng gói hệ thống bằng Docker
Lý do thay đổi: Chạy Localhost buộc người dùng tự cài Node.js, PostgreSQL, tạo database smartcrm và cấu hình .env, dễ phát sinh sai khác giữa các máy.
Quyết định xử lý:
Thêm Dockerfile để build image cho ứng dụng và .dockerignore để loại các tệp không cần thiết khỏi image.
Thêm docker-compose.yml chạy trọn gói PostgreSQL, Backend API và Frontend React bằng một lệnh: docker compose --env-file .env.docker up --build -d.
Thêm docker-compose.dev.yml cho môi trường phát triển.
Viết DOCKER.md hướng dẫn chi tiết cách chạy, dừng và xử lý sự cố.
Đánh đổi: Môi trường nhất quán và dựng nhanh trên máy mới, nhưng cần cài Docker Desktop, lần build đầu tiên lâu hơn và có thêm các tệp cấu hình phải bảo trì.
Trạng thái: Đã hoàn thành các tệp cấu hình. Kết quả chạy thực tế: <điền kết quả chạy lệnh docker compose>.
2. Tách cấu hình môi trường cho Docker
Lý do thay đổi: Cấu hình chạy Localhost và chạy trong container khác nhau (ví dụ địa chỉ máy chủ cơ sở dữ liệu), đồng thời mật khẩu không được đưa lên Git.
Quyết định xử lý:
Dùng .env.docker (sao chép từ .env.docker.example) cho Docker; giữ .env và .env.example cho chế độ Localhost.
Chỉ commit các tệp .example; .env và .env.docker được loại trừ khỏi Git qua .gitignore.
Trạng thái: Đã hoàn thành. Đã kiểm tra .gitignore loại trừ đúng hai tệp trên: <Có>.
3. Đồng bộ tài liệu sau thay đổi
Lý do thay đổi: Bài tập 1 bị nhận xét về tính Nhất quán giữa các tài liệu, nên mọi thay đổi triển khai phải được phản ánh đồng thời vào các tệp liên quan.
Quyết định xử lý:
Cập nhật README.md: Mục 2 (hai cách chạy Docker và Localhost), Mục 5 (công nghệ), Mục 6 (cây thư mục), Mục 7 đến 9 (trạng thái, tiêu chí tự kiểm, khai báo AI).
Bổ sung test-report.md ghi kết quả kiểm thử và cập nhật ai-disclosure.md.
Ghi nhận các thay đổi này vào nhật ký thiết kế.
Trạng thái: Đã hoàn thành.