const customerRepo = require('../repositories/customer.repo');

const createCustomer = async (req, res) => {
    try {
        const { name, phone, email } = req.body;
        if (!name || !phone) {
            return res.status(400).json({ error: "Tên và số điện thoại là bắt buộc!" });
        }
        const customer = await customerRepo.createCustomer(name, phone, email);
        res.status(201).json({ message: "Tạo khách hàng thành công", data: customer });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllCustomers = async (req, res) => {
    try {
        const customers = await customerRepo.getAllCustomers();
        res.status(200).json({ data: customers });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, phone, email } = req.body;
        const updated = await customerRepo.updateCustomer(id, name, phone, email);
        if (!updated) return res.status(404).json({ error: "Không tìm thấy khách hàng!" });
        res.status(200).json({ message: "Cập nhật thành công", data: updated });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCustomer = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await customerRepo.deleteCustomer(id);
        if (!deleted) return res.status(404).json({ error: "Không tìm thấy khách hàng!" });
        res.status(200).json({ message: "Xóa thành công" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createCustomer,
    getAllCustomers,
    updateCustomer,
    deleteCustomer
};