const ticketRepo = require('../repositories/ticket.repo');

const createTicket = async (data) => {
    const { customer_name, device_name, issue_description } = data;
    
    if (!customer_name || !device_name) {
        throw new Error("Tên khách hàng và tên thiết bị là thông tin bắt buộc!");
    }
    
    return await ticketRepo.createTicket(customer_name, device_name, issue_description);
};

const getAllTickets = async () => {
    return await ticketRepo.getAllTickets();
};

const updateStatus = async (id, status) => {
    if (!status) {
        throw new Error("Trạng thái mới là bắt buộc!");
    }
    const updatedTicket = await ticketRepo.updateTicketStatus(id, status);
    if (!updatedTicket) {
        throw new Error("Không tìm thấy phiếu bảo hành với ID này!");
    }
    return updatedTicket;
};

const removeTicket = async (id) => {
    const deletedTicket = await ticketRepo.deleteTicket(id);
    if (!deletedTicket) {
        throw new Error("Không tìm thấy phiếu bảo hành với ID này!");
    }
    return deletedTicket;
};

// Đảm bảo có xuất đủ các hàm này ra
module.exports = { 
    createTicket, 
    getAllTickets, 
    updateStatus, 
    removeTicket 
};