# Nhật ký lỗi (Bug Log)

## 1. Lỗi git commit khi gõ dính lệnh
- **Triệu chứng:** Báo lỗi `unknown switch 'm'` khi chạy git add và git commit.
- **Nguyên nhân:** Gõ liền `git add .env.examplegit commit -m ...` thiếu toán tử `&&` để ngăn cách 2 lệnh.
- **Cách giải quyết:** Tách thành 2 dòng lệnh riêng biệt hoặc dùng `git add .env.example && git commit -m "..."`.