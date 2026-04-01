import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import StatCard from '../components/Common/StatCard';
import StatusBadge from '../components/Common/StatusBadge';
import { Plus, Search, Filter, FileText, Trash2, Loader2, Copy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/Common/Toast';

const InvoiceList = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchInvoices = async () => {
    try {
      const { data, error } = await supabase
        .from('invoices')
        .select('*, clients(name, company)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInvoices(data || []);

      const totalInvoiced = (data || []).reduce((sum, inv) => sum + Number(inv.total), 0);
      const totalGST = (data || []).reduce((sum, inv) => sum + Number(inv.cgst) + Number(inv.sgst) + Number(inv.igst), 0);
      const pendingCount = (data || []).filter(inv => inv.status === 'PENDING' || inv.status === 'OVERDUE').length;

      setStats([
        { title: 'Total Invoiced', value: `₹${totalInvoiced.toLocaleString('en-IN')}`, subValue: `${(data || []).length} invoices`, trendColor: 'info' },
        { title: 'GST Collected', value: `₹${totalGST.toLocaleString('en-IN')}`, subValue: 'CGST + SGST + IGST', trendColor: 'muted' },
        { title: 'Pending / Overdue', value: `${pendingCount}`, subValue: pendingCount > 0 ? 'Requires attention' : 'All clear!', trendColor: pendingCount > 0 ? 'danger' : 'success' },
      ]);
    } catch (err) {
      toast.error('Failed to load invoices');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchInvoices(); }, []);

  const deleteInvoice = async (id) => {
    if (!confirm('Delete this invoice permanently?')) return;
    try {
      const { error } = await supabase.from('invoices').delete().eq('id', id);
      if (error) throw error;
      toast.success('Invoice deleted');
      fetchInvoices();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const duplicateInvoice = async (inv) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      // Get next invoice number
      const { data: profile } = await supabase
        .from('business_profile')
        .select('invoice_prefix, starting_number')
        .eq('user_id', user.id)
        .single();
      
      const prefix = profile?.invoice_prefix || 'INV-';
      const nextNum = (profile?.starting_number || 1001);
      const newInvNo = `${prefix}${nextNum}`;

      const duplicate = {
        user_id: user.id,
        client_id: inv.client_id,
        invoice_number: newInvNo,
        invoice_date: new Date().toISOString().split('T')[0],
        due_date: null,
        line_items: inv.line_items,
        supply_type: inv.supply_type,
        subtotal: inv.subtotal,
        cgst: inv.cgst,
        sgst: inv.sgst,
        igst: inv.igst,
        total: inv.total,
        status: 'PENDING',
        notes: inv.notes,
      };

      const { data, error } = await supabase.from('invoices').insert([duplicate]).select();
      if (error) throw error;

      // Increment starting number
      if (profile) {
        await supabase
          .from('business_profile')
          .update({ starting_number: nextNum + 1 })
          .eq('user_id', user.id);
      }

      toast.success(`Invoice duplicated as ${newInvNo}`);
      navigate(`/invoices/preview/${data[0].id}`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const filteredInvoices = invoices.filter(inv => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      inv.invoice_number?.toLowerCase().includes(query) ||
      inv.clients?.name?.toLowerCase().includes(query) ||
      inv.clients?.company?.toLowerCase().includes(query)
    );
  });

  if (loading) {
    return <Layout title="Invoices"><div className="loading-container"><Loader2 size={48} /></div></Layout>;
  }

  return (
    <Layout title="Invoices">
      <div className="section-description">
        <div className="section-info">
          <p className="text-p">Manage and track your business transactions</p>
        </div>
      </div>

      <div className="stats-row" style={{ marginBottom: '30px' }}>
        {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
      </div>

      <div className="dashboard-section">
        <div className="card table-container">
          <div className="table-header-actions">
            <div className="search-box">
              <Search size={16} />
              <input type="text" placeholder="Search by name, invoice no..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>CLIENT NAME</th>
                <th>INVOICE NO.</th>
                <th>DATE</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map(inv => (
                <tr key={inv.id}>
                  <td>
                    <div className="client-cell">
                      <div className="client-avatar" style={{ backgroundColor: '#DBEAFE' }}>
                        {(inv.clients?.name || 'U').charAt(0).toUpperCase()}
                      </div>
                      <span className="client-name">{inv.clients?.name || 'Unknown'}</span>
                    </div>
                  </td>
                  <td>{inv.invoice_number}</td>
                  <td>{inv.invoice_date ? new Date(inv.invoice_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</td>
                  <td className="amount-cell">₹{Number(inv.total).toLocaleString('en-IN')}</td>
                  <td><StatusBadge status={inv.status} /></td>
                  <td className="actions-cell-group">
                    <button className="action-btn" onClick={() => navigate(`/invoices/preview/${inv.id}`)} title="View"><FileText size={16} /></button>
                    <button className="action-btn" onClick={() => duplicateInvoice(inv)} title="Duplicate"><Copy size={16} /></button>
                    <button className="action-btn text-red-500" onClick={() => deleteInvoice(inv.id)} title="Delete"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredInvoices.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <h3>{searchQuery ? 'No matches found' : 'No invoices yet'}</h3>
              <p>{searchQuery ? 'Try a different search term' : 'Create your first invoice to get started'}</p>
              {!searchQuery && (
                <button className="btn btn-primary mt-4" onClick={() => navigate('/invoices/create')}>
                  <Plus size={18} /><span>Create Invoice</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default InvoiceList;
