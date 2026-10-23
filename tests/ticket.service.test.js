// Mock repository để Unit Test không kết nối CSDL PostgreSQL ngầm
jest.mock('../src/repositories/ticket.repo', () => ({}));

const { kiemTraConBaoHanh, tinhHanCamKetSLA, chuanHoaSoDienThoai } = require('../src/services/ticket.service');

describe('Kiểm thử Lớp Nghiệp vụ Ticket Service (Checklist Buổi 10)', () => {

  // --- 1. Test Quy tắc QT-05 (Kiểm tra điều kiện bảo hành) ---
  describe('Quy tắc QT-05: kiemTraConBaoHanh', () => {
    test('1. ĐÚNG: Trả về true khi thiết bị mua chưa quá hạn bảo hành', () => {
      const thietBi = { ngayMua: '2026-01-15', soThangBaoHanh: 12 };
      const res = kiemTraConBaoHanh(thietBi, '2026-09-08');
      expect(res.conBaoHanh).toBe(true);
      expect(res.lyDo).toBe('CON_HAN_BAO_HANH');
    });

    test('2. SAI: Trả về false khi thiết bị đã quá số tháng bảo hành', () => {
      const thietBi = { ngayMua: '2024-01-15', soThangBaoHanh: 12 };
      const res = kiemTraConBaoHanh(thietBi, '2026-09-08');
      expect(res.conBaoHanh).toBe(false);
      expect(res.lyDo).toBe('HET_HAN_BAO_HANH');
    });

    test('3. BIÊN: Trả về null khi thiết bị không có ngày mua (Chưa xác minh)', () => {
      const thietBi = { ngayMua: null, soThangBaoHanh: 12 };
      const res = kiemTraConBaoHanh(thietBi, '2026-09-08');
      expect(res.conBaoHanh).toBeNull();
      expect(res.lyDo).toBe('CHUA_XAC_MINH_BAO_HANH');
    });
  });

  // --- 2. Test Quy tắc BR02 (Tính SLA bỏ qua Chủ Nhật) ---
  describe('Quy tắc BR02: tinhHanCamKetSLA', () => {
    test('4. BIÊN: Tính SLA 24h tạo từ Thứ 7 sẽ được cộng thêm 24h của ngày Chủ Nhật', () => {
      const ngayTao = '2026-10-24T08:00:00.000Z'; // Thứ Bảy
      const hanCamKet = tinhHanCamKetSLA(ngayTao, 24);
      expect(new Date(hanCamKet).getDay()).toBe(1); // Rơi vào Thứ Hai (getDay() === 1)
    });
  });

  // --- 3. Test Quy tắc QT-01/QT-02 (Chuẩn hóa Số điện thoại) ---
  describe('Quy tắc QT-01: chuanHoaSoDienThoai', () => {
    test('5. DỮ LIỆU SAI: Trả về null khi chuỗi SĐT không đủ 10 số hoặc chứa ký tự lỗi', () => {
      expect(chuanHoaSoDienThoai('12345')).toBeNull();
      expect(chuanHoaSoDienThoai('abcxyz')).toBeNull();
    });

    test('6. ĐÚNG: Tự động đổi đầu 84 thành 0 cho SĐT 11 số', () => {
      expect(chuanHoaSoDienThoai('84901234567')).toBe('0901234567');
    });
  });

});