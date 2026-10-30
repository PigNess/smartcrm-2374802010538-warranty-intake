const ticketRepo = require('../repositories/ticket.repo');

// ==========================================
// 1. CÁC HÀM XỬ LÝ CRUD PHIẾU BẢO HÀNH
// ==========================================

const createTicket = async (data) => {
    // Đã bổ sung nhận thêm phone và email từ data (req.body gửi lên)
    const { customer_name, phone, email, device_name, issue_description } = data;
    
    if (!customer_name || !device_name) {
        throw new Error("Tên khách hàng và tên thiết bị là thông tin bắt buộc!");
    }
    
    // Tự động chuẩn hóa số điện thoại (nếu người dùng có nhập)
    const validatedPhone = chuanHoaSoDienThoai(phone);

    // Truyền đủ các tham số xuống cho tầng repository
    return await ticketRepo.createTicket(customer_name, validatedPhone, email, device_name, issue_description);
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

// ==========================================
// 2. CÁC HÀM XỬ LÝ LOGIC NGHIỆP VỤ & QUY TẮC
// (Bổ sung để chạy Unit Test Buổi 10)
// ==========================================

// Quy tắc QT-05: Kiểm tra điều kiện bảo hành thiết bị
const kiemTraConBaoHanh = (thietBi, ngayKiemTraStr) => {
    if (!thietBi || !thietBi.ngayMua) {
        return {
            conBaoHanh: null,
            lyDo: 'CHUA_XAC_MINH_BAO_HANH'
        };
    }

    const ngayMua = new Date(thietBi.ngayMua);
    const ngayKiemTra = ngayKiemTraStr ? new Date(ngayKiemTraStr) : new Date();
    const soThangBaoHanh = thietBi.soThangBaoHanh || 12;

    const ngayHetHan = new Date(ngayMua);
    ngayHetHan.setMonth(ngayHetHan.getMonth() + soThangBaoHanh);

    if (ngayKiemTra <= ngayHetHan) {
        return {
            conBaoHanh: true,
            lyDo: 'CON_HAN_BAO_HANH'
        };
    } else {
        return {
            conBaoHanh: false,
            lyDo: 'HET_HAN_BAO_HANH'
        };
    }
};

// Quy tắc BR02: Tính hạn cam kết SLA (Bỏ qua ngày Chủ Nhật)
const tinhHanCamKetSLA = (ngayTaoStr, soGioSLA = 24) => {
    if (!ngayTaoStr) return null;

    let curr = new Date(ngayTaoStr);
    let remainingHours = soGioSLA;

    while (remainingHours > 0) {
        curr.setHours(curr.getHours() + 1);
        if (curr.getDay() !== 0) { // getDay() === 0 là ngày Chủ Nhật
            remainingHours -= 1;
        }
    }

    return curr.toISOString();
};

// Quy tắc QT-01/QT-02: Chuẩn hóa số điện thoại 10 số bắt đầu bằng 0
const chuanHoaSoDienThoai = (sdt) => {
    if (!sdt) return null;
    let clean = String(sdt).replace(/\D/g, '');
    if (clean.startsWith('84') && clean.length === 11) {
        clean = '0' + clean.slice(2);
    }
    if (clean.length === 10 && clean.startsWith('0')) {
        return clean;
    }
    return null;
};

// ==========================================
// XUẤT TOÀN BỘ CÁC HÀM
// ==========================================
module.exports = { 
    createTicket, 
    getAllTickets, 
    updateStatus, 
    removeTicket,
    kiemTraConBaoHanh,
    tinhHanCamKetSLA,
    chuanHoaSoDienThoai
};