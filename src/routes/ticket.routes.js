const express = require('express');
const router = express.Router();
const ticketService = require('../services/ticket.service');

// Import middleware xác thực Token (Bổ sung cho BUG-03)
const { verifyToken } = require('../middlewares/auth.middleware');
// ==========================================
// HÀM TIỆN ÍCH: CHE 4 SỐ GIỮA CỦA SĐT
// ==========================================
const maskPhone = (phone) => {
    // Nếu không có số điện thoại hoặc định dạng không đủ 10 số thì trả về nguyên bản
    if (!phone || phone.length < 10) return phone;
    // Cắt 3 số đầu + **** + lấy số từ vị trí thứ 7 đến hết. VD: 0901234567 -> 090****567
    return phone.slice(0, 3) + '****' + phone.slice(7);
};

// API Tạo phiếu bảo hành mới (Method: POST)
// Không gắn verifyToken ở đây để TC-01, TC-02, TC-03 vẫn pass bình thường
router.post('/', async (req, res) => {
    try {
        const newTicket = await ticketService.createTicket(req.body);
        res.status(201).json({ status: 'success', data: newTicket });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

// ==========================================
// API LẤY DANH SÁCH PHIẾU (BỔ SUNG BUG-03)
// Đã chèn thêm middleware 'verifyToken' vào tham số thứ 2
// ==========================================
router.get('/', verifyToken, async (req, res) => {
    try {
        let tickets = await ticketService.getAllTickets();

        // ÁP DỤNG LUẬT BẢO MẬT: CHE SĐT NẾU LÀ RECEPTIONIST
        // Chú ý: req.user lấy từ middleware verifyToken
        if (req.user && req.user.role === 'RECEPTIONIST') {
            tickets = tickets.map(ticket => ({
                ...ticket,
                // Lưu ý: Nếu cột số điện thoại trong DB của bạn tên khác, hãy đổi tên trường cho khớp
                phone: maskPhone(ticket.phone) 
            }));
        }

        res.status(200).json({ status: 'success', data: tickets });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Lỗi máy chủ nội bộ' });
    }
});

// API Cập nhật trạng thái phiếu (Method: PATCH)
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedTicket = await ticketService.updateStatus(id, status);
        res.status(200).json({ status: 'success', data: updatedTicket });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

// API Xóa phiếu bảo hành (Method: DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTicket = await ticketService.removeTicket(id);
        res.status(200).json({ status: 'success', message: 'Xóa phiếu thành công', data: deletedTicket });
    } catch (error) {
        res.status(404).json({ status: 'error', message: error.message });
    }
});

module.exports = router;