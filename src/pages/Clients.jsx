import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import StatCard from '../components/Common/StatCard';
import StatusBadge from '../components/Common/StatusBadge';
import { UserPlus, FileText, Edit2, Zap, Loader2, Trash2, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/Common/Toast';
import './Clients.css';

const INITIAL_CLIENT = {
  name: '', company: '', gstin: '', email: '', phone: '', address: '', state: '', is_gst_registered: false
};

const STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Delhi','Goa','Gujarat','Haryana',
  'Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya',
  'Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura',
  'Uttar Pradesh','Uttarakhand','West Bengal','Jammu & Kashmir','Ladakh','Chandigarh','Puducherry',
  'Lakshadweep','Andaman & Nicobar','Dadra & Nagar Haveli'
];

const Clients = () => {
  const toast = useToast();
  const [clients, setClients] = useState([]);
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [editingClient, setEditingClient] = useState(INITIAL_CLIENT);
  const [editingId, setEditingId] = useState(null);

  const fetchClients = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('clients').select('*').order('name');
      if (error) throw error;
      setClients(data || []);

      const registeredCount = (data || []).filter(c => c.is_gst_registered).length;
      const totalBilled = (data || []).reduce((sum, c) => sum + Number(c.total_billed || 0), 0);
      setStats([
        { title: 'Total Clients', value: `${(data || []).length}`, subValue: '', trendColor: 'muted' },
        { title: 'Total Billed', value: `₹${totalBilled.toLocaleString('en-IN')}`, subValue: '', trendColor: 'info' },
        { title: 'GST Registered', value: `${registeredCount}`, subValue: '', trendColor: 'info' },
      ]);
    } catch (err) {
      toast.error('Failed to load clients');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchClients(); }, []);

  const openAddModal = () => {
    setEditingClient(INITIAL_CLIENT);
    setEditingId(null);
    setModalMode('add');
  };

  const openEditModal = (client) => {
    setEditingClient({
      name: client.name || '',
      company: client.company || '',
      gstin: client.gstin || '',
      email: client.email || '',
      phone: client.phone || '',
      address: client.address || '',
      state: client.state || '',
      is_gst_registered: client.is_gst_registered || false,
    });
    setEditingId(client.id);
    setModalMode('edit');
  };

  const handleSaveClient = async (e) => {
    e.preventDefault();
    try {
      if (modalMode === 'add') {
        const { data: { user } } = await supabase.auth.getUser();
        const { error } = await supabase.from('clients').insert([{ ...editingClient, user_id: user.id }]);
        if (error) throw error;
        toast.success('Client added successfully!');
      } else {
        const { error } = await supabase.from('clients').update(editingClient).eq('id', editingId);
        if (error) throw error;
        toast.success('Client updated successfully!');
      }
      setModalMode(null);
      fetchClients();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const deleteClient = async (id) => {
    if (!confirm('Delete this client? This cannot be undone.')) return;
    try {
      const { error } = await supabase.from('clients').delete().eq('id', id);
      if (error) throw error;
      toast.success('Client deleted');
      fetchClients();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading && clients.length === 0) {
    return <Layout title="Clients"><div className="loading-container"><Loader2 size={48} /></div></Layout>;
  }

  return (
    <Layout title="Clients">
      <div className="section-description">
        <div className="section-info">
          <p className="text-p">Manage your business partners and tax information</p>
        </div>
        <button className="btn btn-primary" onClick={openAddModal}>
          <UserPlus size={18} /><span>Add Client</span>
        </button>
      </div>

      <div className="clients-header-grid">
        <div className="stats-row">
          {stats.map((stat, i) => <StatCard key={i} {...stat} />)}
        </div>
        <div className="insight-card genie-insight">
          <div className="insight-header"><Zap size={18} className="zap-icon" /><span>GENIE INSIGHTS</span></div>
          <div className="insight-body">
            <p className="insight-text">
              {clients.filter(c => !c.is_gst_registered).length} unregistered clients detected.
            </p>
          </div>
        </div>
      </div>

      <div className="dashboard-section">
        <div className="card table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>CLIENT & COMPANY</th>
                <th>GSTIN STATUS</th>
                <th>TOTAL BILLED</th>
                <th>PHONE / EMAIL</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    <div className="client-cell">
                      <div className="client-avatar" style={{ backgroundColor: '#DBEAFE' }}>{client.name.charAt(0)}</div>
                      <div className="client-info">
                        <span className="client-name">{client.name}</span>
                        <span className="client-company">{client.company}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="gstin-cell">
                      <StatusBadge status={client.is_gst_registered ? 'GST REGISTERED' : 'UNREGISTERED'} />
                      {client.gstin && <span className="gstin-no">{client.gstin}</span>}
                    </div>
                  </td>
                  <td className="amount-cell">₹{Number(client.total_billed || 0).toLocaleString('en-IN')}</td>
                  <td>
                    <div className="client-contact-info">
                      <p>{client.phone || '-'}</p>
                      <p className="text-xs text-muted">{client.email || '-'}</p>
                    </div>
                  </td>
                  <td className="actions-cell-group">
                    <button className="action-btn" onClick={() => openEditModal(client)} title="Edit"><Edit2 size={16} /></button>
                    <button className="action-btn text-red-500" onClick={() => deleteClient(client.id)} title="Delete"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {clients.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">👥</div>
              <h3>No clients yet</h3>
              <p>Add your first business partner to get started</p>
              <button className="btn btn-primary mt-4" onClick={openAddModal}><UserPlus size={18} /><span>Add Client</span></button>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Client Modal */}
      {modalMode && (
        <div className="modal-overlay">
          <div className="modal-content card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 className="text-h2">{modalMode === 'add' ? 'New Client' : 'Edit Client'}</h3>
              <button onClick={() => setModalMode(null)} style={{ padding: '4px', borderRadius: '6px', color: '#999' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveClient}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>CLIENT NAME</label>
                  <input type="text" required value={editingClient.name} onChange={e => setEditingClient({...editingClient, name: e.target.value})} placeholder="Client name" />
                </div>
                <div className="form-group">
                  <label>COMPANY NAME</label>
                  <input type="text" value={editingClient.company} onChange={e => setEditingClient({...editingClient, company: e.target.value})} placeholder="Company" />
                </div>
                <div className="form-group">
                  <label>GSTIN</label>
                  <input type="text" value={editingClient.gstin} onChange={e => setEditingClient({...editingClient, gstin: e.target.value})} placeholder="22AAAAA0000A1Z5" />
                </div>
                <div className="form-group">
                  <label>GST REGISTERED?</label>
                  <select value={editingClient.is_gst_registered ? 'yes' : 'no'} onChange={e => setEditingClient({...editingClient, is_gst_registered: e.target.value === 'yes'})}>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>EMAIL</label>
                  <input type="email" value={editingClient.email} onChange={e => setEditingClient({...editingClient, email: e.target.value})} placeholder="client@company.com" />
                </div>
                <div className="form-group">
                  <label>PHONE</label>
                  <input type="text" value={editingClient.phone} onChange={e => setEditingClient({...editingClient, phone: e.target.value})} placeholder="+91 9876543210" />
                </div>
                <div className="form-group col-span-2">
                  <label>ADDRESS</label>
                  <textarea value={editingClient.address} onChange={e => setEditingClient({...editingClient, address: e.target.value})} placeholder="Full address" rows="2"></textarea>
                </div>
                <div className="form-group col-span-2">
                  <label>STATE</label>
                  <select value={editingClient.state} onChange={e => setEditingClient({...editingClient, state: e.target.value})}>
                    <option value="">Select State</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div className="modal-actions mt-8">
                <button type="button" className="btn btn-outline" onClick={() => setModalMode(null)}>Cancel</button>
                <button type="submit" className="btn btn-primary">{modalMode === 'add' ? 'Create Client' : 'Save Changes'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Clients;
