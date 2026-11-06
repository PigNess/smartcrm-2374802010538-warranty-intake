// src/controllers/ticket.controller.js
const ticketService = require('../services/ticket.service');

const createTicket = async (req, res) => {
    try {
        const ticket = await ticketService.createTicket(req.body);
        return res.status(201).json({
            status: 'success',
            message: 'Tạo phiếu bảo hành thành công',
            data: ticket
        });
    } catch (error) {
        // Nếu là lỗi trùng serial đang có phiếu mở (TC-02), trả về mã 409
        if (error.statusCode === 409 || error.message === 'PHIEU_DANG_MO') {
            return res.status(409).json({
                status: 'error',
                message: 'PHIEU_DANG_MO'
            });
        }
        // Các lỗi validation đầu vào khác trả về 400
        return res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

const getAllTickets = async (req, res) => {
    try {
        const tickets = await ticketService.getAllTickets();
        return res.status(200).json({
            status: 'success',
            data: tickets
        });
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
};

const updateTicketStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updated = await ticketService.updateTicketStatus(id, status);
        return res.status(200).json({
            status: 'success',
            data: updated
        });
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

const deleteTicket = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ticketService.deleteTicket(id);
        return res.status(200).json({
            status: 'success',
            data: deleted
        });
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
};

module.exports = {
    createTicket,
    getAllTickets,
    updateTicketStatus,
    deleteTicket
};