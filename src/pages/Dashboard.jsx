import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import StatCard from '../components/Common/StatCard';
import StatusBadge from '../components/Common/StatusBadge';
import Onboarding from '../components/Onboarding/Onboarding';
import { TrendingUp, AlertCircle, Calendar, Clock, MoreVertical, Loader2, Plus } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import './Dashboard.css';

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState([]);
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingChecked, setOnboardingChecked] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      if (!user) return;
      
      // Check if user already skipped
      const skipped = localStorage.getItem(`gstgenie_onboarding_skipped_${user.id}`);
      
      const { data: profile } = await supabase
        .from('business_profile')
        .select('business_name, owner_name')
        .eq('user_id', user.id)
        .single();

      if (!profile && !skipped) {
        setShowOnboarding(true);
        setDisplayName(user.email?.split('@')[0] || 'there');
      } else {
        setDisplayName(profile?.owner_name || profile?.business_name || user.email?.split('@')[0] || 'there');
      }
      setOnboardingChecked(true);
    };
    checkOnboarding();
  }, [user]);

  useEffect(() => {
    if (!onboardingChecked || showOnboarding) return;
    
    const fetchDashboardData = async () => {
      try {
        const { data: invoices, error } = await supabase
          .from('invoices')
          .select('*, clients(name)')
          .order('created_at', { ascending: false });

        if (error) throw error;

        const allInvoices = invoices || [];
        const totalBilled = allInvoices.reduce((sum, inv) => sum + Number(inv.total), 0);
        const pendingAmount = allInvoices
          .filter(inv => inv.status === 'PENDING' || inv.status === 'OVERDUE')
          .reduce((sum, inv) => sum + Number(inv.total), 0);
        const overdueCount = allInvoices.filter(inv => inv.status === 'OVERDUE').length;
        const pendingCount = allInvoices.filter(inv => inv.status === 'PENDING').length;
        const totalTax = allInvoices.reduce((sum, inv) => sum + (Number(inv.cgst) + Number(inv.sgst) + Number(inv.igst)), 0);

        setStats([
          { title: 'Total Billed', value: `₹${totalBilled.toLocaleString('en-IN')}`, subValue: `${allInvoices.length} invoices total`, trend: <TrendingUp size={14} />, trendColor: 'success' },
          { title: 'Pending Amount', value: `₹${pendingAmount.toLocaleString('en-IN')}`, subValue: overdueCount > 0 ? `${overdueCount} overdue, ${pendingCount} pending` : `${pendingCount} pending`, trend: <AlertCircle size={14} />, trendColor: pendingAmount > 0 ? 'danger' : 'success' },
          { title: 'GST Liability', value: `₹${totalTax.toLocaleString('en-IN')}`, subValue: 'Total tax collected', trend: <Calendar size={14} />, trendColor: 'info' },
          { title: 'Invoices Sent', value: `${allInvoices.length}`, subValue: allInvoices.length === 0 ? 'Create your first!' : 'All time', trend: <Clock size={14} />, trendColor: 'muted' },
        ]);

        setRecentInvoices(allInvoices.slice(0, 5).map(inv => ({
          id: inv.id,
          name: inv.clients?.name || 'Unknown Client',
          invNo: inv.invoice_number,
          date: inv.invoice_date ? new Date(inv.invoice_date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-',
          amount: `₹${Number(inv.total).toLocaleString('en-IN')}`,
          status: inv.status,
          initial: (inv.clients?.name || 'U').charAt(0).toUpperCase(),
          color: '#E0E7FF'
        })));
      } catch (err) {
        console.error('Error fetching dashboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [onboardingChecked, showOnboarding]);

  if (!onboardingChecked) {
    return (
      <Layout title="Overview">
        <div className="loading-container"><Loader2 size={48} /></div>
      </Layout>
    );
  }

  if (showOnboarding) {
    return (
      <>
        <Layout title="Overview">
          <div style={{ opacity: 0.3, pointerEvents: 'none' }}>
            <div className="dashboard-grid">
              {[1,2,3,4].map(i => <div key={i} className="stat-card" style={{ height: 120 }} />)}
            </div>
          </div>
        </Layout>
        <Onboarding onComplete={() => { setShowOnboarding(false); window.location.reload(); }} />
      </>
    );
  }

  if (loading) {
    return (
      <Layout title="Overview">
        <div className="loading-container"><Loader2 size={48} /></div>
      </Layout>
    );
  }

  return (
    <Layout title="Overview">
      {/* Personal Greeting */}
      <div className="dashboard-greeting">
        <div>
          <h1 className="greeting-text">{getGreeting()}, {displayName} 👋</h1>
          <p className="greeting-sub">Here's what's happening with your business today</p>
        </div>
      </div>

      <div className="dashboard-grid">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="dashboard-section">
        <div className="section-header">
          <div className="section-info">
            <h3 className="text-h2">Recent Invoices</h3>
            <p className="text-p">Real-time status of your latest transactions</p>
          </div>
          <button className="view-all" onClick={() => navigate('/invoices')}>View All Invoices ›</button>
        </div>

        <div className="card table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>CLIENT NAME</th>
                <th>INVOICE NO.</th>
                <th>DATE</th>
                <th>AMOUNT</th>
                <th>STATUS</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recentInvoices.map((inv) => (
                <tr key={inv.id} style={{ cursor: 'pointer' }} onClick={() => navigate(`/invoices/preview/${inv.id}`)}>
                  <td>
                    <div className="client-cell">
                      <div className="client-avatar" style={{ backgroundColor: inv.color }}>{inv.initial}</div>
                      <span className="client-name">{inv.name}</span>
                    </div>
                  </td>
                  <td>{inv.invNo}</td>
                  <td>{inv.date}</td>
                  <td className="amount-cell">{inv.amount}</td>
                  <td><StatusBadge status={inv.status} /></td>
                  <td className="actions-cell"><MoreVertical size={16} /></td>
                </tr>
              ))}
            </tbody>
          </table>
          {recentInvoices.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <h3>No invoices yet</h3>
              <p>Create your first invoice to see it here</p>
              <button className="btn btn-primary mt-4" onClick={() => navigate('/invoices/create')}>
                <Plus size={18} />
                <span>Create Invoice</span>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="ai-insight-banner">
        <div className="insight-content">
          <div className="insight-icon">✨</div>
          <p>AI-powered GST insights coming soon. <button className="insight-btn" onClick={() => navigate('/invoices/create')}>Create an invoice</button></p>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
