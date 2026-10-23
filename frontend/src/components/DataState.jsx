import React from 'react';

export function DataState({ loading, error, data, empty, children }) {
  // 1. Trạng thái ĐANG TẢI (Loading)
  if (loading) {
    return (
      <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>
        <div className="skeleton-loader">⏳ Đang tải dữ liệu từ hệ thống...</div>
      </div>
    );
  }

  // 2. Trạng thái BỊ LỖI (Error)
  if (error) {
    return (
      <div style={{ padding: '20px', border: '1px solid #ff4d4f', backgroundColor: '#fff2f0', borderRadius: '8px', margin: '16px 0' }}>
        <h4 style={{ color: '#cf1322', margin: '0 0 8px 0' }}>⚠️ Không thể tải dữ liệu</h4>
        <p style={{ color: '#434343', margin: '0 0 12px 0' }}>{error.message || 'Lỗi kết nối tới server.'}</p>
        <button 
          onClick={() => window.location.reload()}
          style={{ padding: '6px 16px', backgroundColor: '#ff4d4f', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          🔄 Thử lại
        </button>
      </div>
    );
  }

  const isEmpty = !data || (Array.isArray(data) && data.length === 0);

  // 3. Trạng thái RỖNG (Empty)
  if (isEmpty) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', border: '1px dashed #d9d9d9', borderRadius: '8px', margin: '16px 0' }}>
        <p style={{ fontSize: '15px', color: '#595959', marginBottom: '12px' }}>
          {empty?.message || 'Chưa có dữ liệu nào.'}
        </p>
        {empty?.action && <div>{empty.action}</div>}
      </div>
    );
  }

  // 4. CÓ DỮ LIỆU: Render nội dung chính
  return typeof children === 'function' ? children(data) : children;
}