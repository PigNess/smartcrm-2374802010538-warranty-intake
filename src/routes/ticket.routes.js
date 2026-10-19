const express = require('express');
const router = express.Router();
const ticketService = require('../services/ticket.service');

// API Tạo phiếu bảo hành mới (Method: POST)
router.post('/', async (req, res) => {
    try {
        const newTicket = await ticketService.createTicket(req.body);
        res.status(201).json({ status: 'success', data: newTicket });
    } catch (error) {
        res.status(400).json({ status: 'error', message: error.message });
    }
});

// API Lấy danh sách phiếu (Method: GET)
router.get('/', async (req, res) => {
    try {
        const tickets = await ticketService.getAllTickets();
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