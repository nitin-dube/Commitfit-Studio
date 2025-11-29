import { useState } from 'react';
import { FiDollarSign, FiFileText, FiAlertCircle, FiCheckCircle } from 'react-icons/fi';
import Card from '../../components/ui/Card';
import './BillingPage.css';

// Dummy billing data
const dummyInvoices = [
    { id: 'INV-001', member: 'Rajesh Kumar', plan: 'Monthly', amount: 2000, dueDate: '2024-12-05', status: 'Paid', paidDate: '2024-12-01' },
    { id: 'INV-002', member: 'Priya Sharma', plan: 'Quarterly', amount: 5400, dueDate: '2024-12-10', status: 'Pending', paidDate: null },
    { id: 'INV-003', member: 'Sneha Reddy', plan: 'Annual', amount: 18000, dueDate: '2024-11-28', status: 'Overdue', paidDate: null },
    { id: 'INV-004', member: 'Vikram Singh', plan: 'Monthly', amount: 2000, dueDate: '2024-12-15', status: 'Pending', paidDate: null },
    { id: 'INV-005', member: 'Amit Patel', plan: 'Monthly', amount: 2000, dueDate: '2024-11-25', status: 'Overdue', paidDate: null },
    { id: 'INV-006', member: 'Anita Desai', plan: 'Free Trial', amount: 0, dueDate: '2024-12-02', status: 'Paid', paidDate: '2024-11-30' }
];

const BillingPage = () => {
    const [invoices] = useState(dummyInvoices);
    const [filter, setFilter] = useState('all');

    const filteredInvoices = filter === 'all' ? invoices : invoices.filter(inv => inv.status.toLowerCase() === filter);

    const totalRevenue = invoices.filter(i => i.status === 'Paid').reduce((sum, i) => sum + i.amount, 0);
    const pendingAmount = invoices.filter(i => i.status === 'Pending').reduce((sum, i) => sum + i.amount, 0);
    const overdueAmount = invoices.filter(i => i.status === 'Overdue').reduce((sum, i) => sum + i.amount, 0);

    return (
        <div className="billing-page fade-in">
            <div className="page-header">
                <div>
                    <h1>Billing & Payments</h1>
                    <p className="page-subtitle">Track invoices and payment status</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="billing-summary">
                <Card className="summary-card-mini">
                    <div className="summary-icon" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
                        <FiDollarSign />
                    </div>
                    <div>
                        <p className="summary-label">Total Revenue</p>
                        <p className="summary-value">₹{totalRevenue.toLocaleString()}</p>
                    </div>
                </Card>
                <Card className="summary-card-mini">
                    <div className="summary-icon" style={{ background: 'linear-gradient(135deg, #f59e0b, #d97706)' }}>
                        <FiAlertCircle />
                    </div>
                    <div>
                        <p className="summary-label">Pending Payments</p>
                        <p className="summary-value">₹{pendingAmount.toLocaleString()}</p>
                    </div>
                </Card>
                <Card className="summary-card-mini">
                    <div className="summary-icon" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)' }}>
                        <FiFileText />
                    </div>
                    <div>
                        <p className="summary-label">Overdue</p>
                        <p className="summary-value">₹{overdueAmount.toLocaleString()}</p>
                    </div>
                </Card>
            </div>

            {/* Filters */}
            <div className="billing-filters">
                <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Invoices</button>
                <button className={`filter-btn ${filter === 'paid' ? 'active' : ''}`} onClick={() => setFilter('paid')}>Paid</button>
                <button className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Pending</button>
                <button className={`filter-btn ${filter === 'overdue' ? 'active' : ''}`} onClick={() => setFilter('overdue')}>Overdue</button>
            </div>

            {/* Invoices Table */}
            <Card>
                <div className="invoices-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Invoice ID</th>
                                <th>Member</th>
                                <th>Plan</th>
                                <th>Amount</th>
                                <th>Due Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredInvoices.map(invoice => (
                                <tr key={invoice.id}>
                                    <td className="invoice-id">{invoice.id}</td>
                                    <td>{invoice.member}</td>
                                    <td>{invoice.plan}</td>
                                    <td className="amount">₹{invoice.amount.toLocaleString()}</td>
                                    <td>{invoice.dueDate}</td>
                                    <td>
                                        <span className={`status-badge ${invoice.status.toLowerCase()}`}>
                                            {invoice.status === 'Paid' && <FiCheckCircle />}
                                            {invoice.status === 'Overdue' && <FiAlertCircle />}
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-link">View</button>
                                        {invoice.status !== 'Paid' && (
                                            <button className="action-link primary">Mark Paid</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default BillingPage;
