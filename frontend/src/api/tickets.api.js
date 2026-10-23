import { request } from './client';

export const ticketsApi = {
  // Lấy danh sách phiếu bảo hành có lọc & phân trang
  danhSach: ({ trang = 1, trangThai, tuKhoa } = {}) => {
    const q = new URLSearchParams({ trang: String(trang) });
    if (trangThai) q.set('trang_thai', trangThai);
    if (tuKhoa) q.set('tu_khoa', tuKhoa);
    return request(`/api/tickets?${q.toString()}`);
  },

  // Chi tiết 1 phiếu bảo hành
  chiTiet: (id) => request(`/api/tickets/${id}`),

  // Tiếp nhận (Tạo mới) phiếu bảo hành
  tiepNhan: (payload) => request('/api/tickets', {
    method: 'POST',
    body: JSON.stringify(payload),
  }),

  // Cập nhật trạng thái phiếu
  capNhatTrangThai: (id, status) => request(`/api/tickets/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  }),

  // Xóa phiếu (Xóa mềm)
  xoaTicket: (id) => request(`/api/tickets/${id}`, {
    method: 'DELETE',
  }),
};