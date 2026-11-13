# TÀI LIỆU KỸ THUẬT - API THIẾT KẾ (TRACK SE)
**Dự án:** Smart CRM - Module Tiếp nhận bảo hành

---

### 1. Endpoint: Tạo phiếu bảo hành mới

#### 1. Phương thức và đường dẫn
* **Method:** `POST`
* **Path:** `/api/tickets`

#### 2. Mô tả nghiệp vụ
Tiếp nhận một thiết bị vào bảo hành, tự động đối chiếu thông tin khách hàng và thiết bị từ cơ sở dữ liệu, sau đó tạo phiếu và tính hạn xử lý theo mức độ ưu tiên.

#### 3. Yêu cầu xác thực và quyền
* **Xác thực:** Bắt buộc có token JWT.
* **Header:** `Authorization: Bearer <token>`
* **Vai trò cho phép:** `NHAN_VIEN` hoặc `QUAN_TRI`.

#### 4. Tham số và thân yêu cầu (Request Body)
Định dạng dữ liệu: `application/json`

| Trường (Field) | Kiểu dữ liệu | Bắt buộc | Ràng buộc / Mô tả |
| :--- | :--- | :--- | :--- |
| `customerId` | Number | Có | ID của khách hàng trong hệ thống |
| `serialNo` | String | Có | Số Serial của thiết bị bảo hành |
| `issueDescription` | String | Có | Mô tả tình trạng lỗi của thiết bị |
| `priority` | String | Không | Mức độ ưu tiên (`LOW`, `NORMAL`, `HIGH`, `URGENT`). Mặc định: `NORMAL` |

*Ví dụ Request Payload:*
```json
{
  "customerId": 1411,
  "serialNo": "TPLINK-AC54-9988",
  "issueDescription": "Mạng bị chập chờn, rớt kết nối liên tục không rõ nguyên nhân",
  "priority": "HIGH"
}
```

#### 5. Thân phản hồi khi thành công (Success Response)
* **Mã trạng thái:** `201 Created`

*Ví dụ Response JSON từ kết quả chạy thực tế:*
```json
{
  "status": "success",
  "message": "Tạo phiếu bảo hành thành công",
  "data": {
    "ticketId": 10538,
    "customerId": 1411,
    "serialNo": "TPLINK-AC54-9988",
    "status": "OPEN",
    "issueDescription": "Mạng bị chập chờn, rớt kết nối liên tục không rõ nguyên nhân",
    "dueDate": "2026-11-15T17:00:00.000Z",
    "createdAt": "2026-11-13T09:30:00.000Z"
  }
}
```

#### 6. Bảng mã lỗi có thể trả về (Error Codes)
| Mã HTTP | Tình huống lỗi |
| :--- | :--- |
| `400 Bad Request` | Thiếu trường thông tin bắt buộc (`customerId`, `serialNo`) hoặc sai định dạng. |
| `401 Unauthorized` | Không có token xác thực hoặc token đã hết hạn. |
| `403 Forbidden` | Tài khoản gọi API không có quyền thực hiện hành động này. |
| `404 Not Found` | Không tìm thấy `customerId` hoặc `serialNo` trong hệ thống. |
| `409 Conflict` | Thiết bị này hiện đang có một phiếu bảo hành khác ở trạng thái `OPEN`. |
| `500 Internal Error` | Lỗi truy vấn cơ sở dữ liệu hoặc lỗi server nội bộ. |

#### 7. Ghi chú về giới hạn hoặc hành vi đặc biệt
Nếu hệ thống phát hiện thiết bị (cùng số `serialNo`) đang có một phiếu bảo hành ở trạng thái `OPEN`, hệ thống sẽ từ chối tạo phiếu mới và trả về mã lỗi `409 Conflict` (đã xử lý tại Bug 03) để tránh trùng lặp dữ liệu.