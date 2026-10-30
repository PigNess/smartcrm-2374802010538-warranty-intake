import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/tickets';

function TicketManager() {
    const [tickets, setTickets] = useState([]);
    // 1. Thêm phone và email vào state form
    const [form, setForm] = useState({ customer_name: '', phone: '', email: '', device_name: '', issue_description: '' });

    // Lấy danh sách phiếu bảo hành từ Backend (GET)
    const fetchTickets = async () => {
        try {
            const res = await axios.get(API_URL);
            if (res.data.status === 'success') {
                setTickets(res.data.data);
            }
        } catch (error) {
            console.error('Lỗi khi tải danh sách:', error);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    // Tạo phiếu bảo hành mới (POST)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(API_URL, form);
            // Reset form gồm cả phone và email
            setForm({ customer_name: '', phone: '', email: '', device_name: '', issue_description: '' });
            fetchTickets(); 
        } catch (error) {
            console.error('Lỗi khi tạo phiếu:', error);
        }
    };

    // Cập nhật trạng thái phiếu (PATCH)
    const handleUpdateStatus = async (id, currentStatus) => {
        const nextStatus = currentStatus === 'PENDING' ? 'IN_PROGRESS' : 'COMPLETED';
        try {
            await axios.patch(`${API_URL}/${id}/status`, { status: nextStatus });
            fetchTickets();
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái:', error);
        }
    };

    // Xóa phiếu bảo hành (DELETE)
    const handleDelete = async (id) => {
        if (window.confirm('Bạn có chắc muốn xóa phiếu này không?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchTickets();
            } catch (error) {
                console.error('Lỗi khi xóa phiếu:', error);
            }
        }
    };

    return (
        <div style={{ padding: '30px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{ color: '#1e293b' }}>Smart CRM - Quản lý Tiếp nhận Bảo hành</h2>

            {/* Form nhập phiếu mới có thêm Số điện thoại và Email */}
            <form onSubmit={handleSubmit} style={{ marginBottom: '25px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <input 
                    type="text" 
                    placeholder="Tên khách hàng" 
                    value={form.customer_name} 
                    onChange={e => setForm({...form, customer_name: e.target.value})} 
                    required 
                    style={{ padding: '10px', flex: '1', minWidth: '150px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input 
                    type="text" 
                    placeholder="Số điện thoại" 
                    value={form.phone} 
                    onChange={e => setForm({...form, phone: e.target.value})} 
                    style={{ padding: '10px', flex: '1', minWidth: '130px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={form.email} 
                    onChange={e => setForm({...form, email: e.target.value})} 
                    style={{ padding: '10px', flex: '1', minWidth: '150px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input 
                    type="text" 
                    placeholder="Tên thiết bị" 
                    value={form.device_name} 
                    onChange={e => setForm({...form, device_name: e.target.value})} 
                    required 
                    style={{ padding: '10px', flex: '1', minWidth: '150px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <input 
                    type="text" 
                    placeholder="Mô tả lỗi" 
                    value={form.issue_description} 
                    onChange={e => setForm({...form, issue_description: e.target.value})} 
                    style={{ padding: '10px', flex: '2', minWidth: '200px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                    Tạo phiếu
                </button>
            </form>

            {/* Bảng hiển thị danh sách có thêm cột Số điện thoại và Email */}
            <table border="1" cellPadding="12" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f1f5f9' }}>
                        <th>ID</th>
                        <th>Khách hàng</th>
                        <th>Số điện thoại</th>
                        <th>Email</th>
                        <th>Thiết bị</th>
                        <th>Mô tả lỗi</th>
                        <th>Trạng thái</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.length > 0 ? (
                        tickets.map(ticket => (
                            <tr key={ticket.id}>
                                <td>{ticket.id}</td>
                                <td>{ticket.customer_name}</td>
                                <td>{ticket.phone || '---'}</td>
                                <td>{ticket.email || '---'}</td>
                                <td>{ticket.device_name}</td>
                                <td>{ticket.issue_description}</td>
                                <td>
                                    <span style={{ 
                                        padding: '4px 8px', 
                                        borderRadius: '4px', 
                                        fontSize: '12px',
                                        backgroundColor: ticket.status === 'COMPLETED' ? '#dcfce7' : ticket.status === 'IN_PROGRESS' ? '#fef9c3' : '#e2e8f0',
                                        color: ticket.status === 'COMPLETED' ? '#166534' : ticket.status === 'IN_PROGRESS' ? '#854d0e' : '#475569',
                                        fontWeight: 'bold'
                                    }}>
                                        {ticket.status}
                                    </span>
                                </td>
                                <td>
                                    <button onClick={() => handleUpdateStatus(ticket.id, ticket.status)} style={{ marginRight: '8px', padding: '6px 10px', cursor: 'pointer' }}>
                                        Chuyển trạng thái
                                    </button>
                                    <button onClick={() => handleDelete(ticket.id)} style={{ color: 'red', padding: '6px 10px', cursor: 'pointer' }}>
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="8" style={{ textAlign: 'center' }}>Chưa có phiếu bảo hành nào.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TicketManager;