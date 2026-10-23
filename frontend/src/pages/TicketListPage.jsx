import React, { useState } from 'react';
import { useTickets } from '../hooks/useTickets';
import { DataState } from '../components/DataState';
import { ticketsApi } from '../api/tickets.api';

export default function TicketListPage() {
  const [filters, setFilters] = useState({ trang: 1, trangThai: '', tuKhoa: '' });
  const [formData, setFormData] = useState({ customerName: '', deviceName: '', issueDescription: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: tickets, loading, error, refetch } = useTickets(filters);

  const handleCreateTicket = async (e) => {
    e.preventDefault();
    if (!formData.customerName || !formData.deviceName) return;
    setIsSubmitting(true);
    try {
      await ticketsApi.tiepNhan({
        customer_name: formData.customerName,
        device_name: formData.deviceName,
        issue_description: formData.issueDescription
      });
      setFormData({ customerName: '', deviceName: '', issueDescription: '' });
      refetch();
    } catch (err) {
      alert(`Lỗi tạo phiếu: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasActiveFilter = filters.trangThai !== '' || filters.tuKhoa !== '';

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#1B365D' }}>Smart CRM - Quản lý Tiếp nhận Bảo hành</h2>

      {/* Form Tạo Phiếu */}
      <form onSubmit={handleCreateTicket} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Tên khách hàng"
          value={formData.customerName}
          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
          style={{ flex: 1, padding: '8px' }}
          required
        />
        <input
          type="text"
          placeholder="Tên thiết bị"
          value={formData.deviceName}
          onChange={(e) => setFormData({ ...formData, deviceName: e.target.value })}
          style={{ flex: 1, padding: '8px' }}
          required
        />
        <input
          type="text"
          placeholder="Mô tả lỗi"
          value={formData.issueDescription}
          onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" disabled={isSubmitting} style={{ padding: '8px 16px', backgroundColor: '#1890ff', color: '#fff', border: 'none', cursor: 'pointer' }}>
          {isSubmitting ? 'Đang tạo...' : 'Tạo phiếu'}
        </button>
      </form>

      {/* Thanh Lọc Dữ Liệu */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '4px' }}>
        <input
          type="text"
          placeholder="Tìm theo tên KH hoặc thiết bị..."
          value={filters.tuKhoa}
          onChange={(e) => setFilters({ ...filters, tuKhoa: e.target.value, trang: 1 })}
          style={{ flex: 1, padding: '6px' }}
        />
        <select
          value={filters.trangThai}
          onChange={(e) => setFilters({ ...filters, trangThai: e.target.value, trang: 1 })}
          style={{ padding: '6px' }}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="OPEN">OPEN</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="CLOSED">CLOSED</option>
        </select>
        {hasActiveFilter && (
          <button 
            onClick={() => setFilters({ trang: 1, trangThai: '', tuKhoa: '' })}
            style={{ padding: '6px 12px', cursor: 'pointer' }}
          >
            ❌ Xóa bộ lọc
          </button>
        )}
      </div>

      {/* 3 Trạng Thái DataState */}
      <DataState
        loading={loading}
        error={error}
        data={tickets}
        empty={{
          message: hasActiveFilter 
            ? 'Không có phiếu nào khớp bộ lọc hiện tại.' 
            : 'Chưa có phiếu bảo hành nào trong hệ thống.',
          action: hasActiveFilter ? (
            <button 
              onClick={() => setFilters({ trang: 1, trangThai: '', tuKhoa: '' })}
              style={{ padding: '6px 12px', backgroundColor: '#1890ff', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
              🧹 Xóa bộ lọc để xem tất cả
            </button>
          ) : null
        }}
      >
        {(rows) => (
          <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
            <thead>
              <tr style={{ backgroundColor: '#f0f2f5' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>ID</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Khách hàng</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Thiết bị</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Mô tả lỗi</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} style={{ textAlign: 'center' }}>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.id}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.customer_name}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.device_name}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.issue_description || '---'}</td>
                  <td style={{ padding: '8px', border: '1px solid #ddd' }}>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </DataState>
    </div>
  );
}