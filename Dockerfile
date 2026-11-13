# ==========================================
# Dockerfile cho Backend Smart CRM (Node.js)
# ==========================================
FROM node:20-alpine AS runner

# Đặt thư mục làm việc bên trong container
WORKDIR /app

# Thiết lập biến môi trường production
ENV NODE_ENV=production

# Copy package.json và package-lock.json trước để tận dụng Docker layer cache
COPY package*.json ./

# Cài đặt dependencies (chỉ production packages)
RUN npm ci --omit=dev || npm install --omit=dev

# Copy toàn bộ mã nguồn backend vào image
COPY . .

# Chuyển sang non-root user (node) để tăng cường bảo mật
USER node

# Mở cổng API của backend (mặc định 3000)
EXPOSE 3000

# Khởi chạy server
CMD ["node", "index.js"]
