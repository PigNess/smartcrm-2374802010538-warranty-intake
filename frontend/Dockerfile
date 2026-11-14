# ==========================================
# Multi-stage Dockerfile cho Frontend React (Vite + Nginx)
# ==========================================

# --- GIAI ĐOẠN 1: BUILD REACT APP ---
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Cài đặt dependencies
RUN npm ci || npm install

# Copy toàn bộ mã nguồn frontend
COPY . .

# Biến môi trường lúc build (Vite nhúng vào static bundle)
ARG VITE_API_BASE_URL=""
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Thực hiện build ra thư mục dist
RUN npm run build

# --- GIAI ĐOẠN 2: SERVE BẰNG NGINX ---
FROM nginx:1.27-alpine AS production

# Copy cấu hình Nginx tùy biến
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy kết quả build từ giai đoạn 1 vào thư mục web root của Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose cổng HTTP tiêu chuẩn của Nginx
EXPOSE 80

# Chạy Nginx ở chế độ foreground
CMD ["nginx", "-g", "daemon off;"]
