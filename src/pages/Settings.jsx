import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import { 
  Zap, 
  Save, 
  Building2, 
  CreditCard, 
  Settings2, 
  History,
  Loader2,
  ChevronDown
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/Common/Toast';
import './Settings.css';

const Settings = () => {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    business_name: '',
    owner_name: '',
    gstin: '',
    address: '',
    city: '',
    state: '',
    pin: '',
    phone: '',
    email: '',
    bank_name: '',
    account_number: '',
    ifsc_code: '',
    invoice_prefix: 'INV-',
    starting_number: 1001,
    default_notes: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        const { data, error } = await supabase
          .from('business_profile')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (data) setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      const { error } = await supabase
        .from('business_profile')
        .upsert({ ...profile, user_id: user.id });

      if (error) throw error;
      toast.success('Settings saved successfully!');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Layout title="Settings">
        <div className="loading-container">
          <Loader2 size={48} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Settings">
      <div className="section-description">
        <div className="section-info">
          <p className="text-p">Manage your business profile and global invoice preferences.</p>
        </div>
        <div className="action-buttons" style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-primary" disabled={saving} onClick={handleSave}>
            {saving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            <span>{saving ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </div>

      <div className="settings-container">
        <div className="settings-main">
          <div className="card form-section-card">
            <div className="section-header-compact">
              <div className="section-icon bg-blue-100 text-blue-600"><Building2 size={18} /></div>
              <h3 className="section-title-compact">Business Profile</h3>
            </div>
            
            <div className="form-grid mt-6">
              <div className="form-group">
                <label>BUSINESS NAME</label>
                <input type="text" value={profile.business_name || ''} onChange={e => setProfile({...profile, business_name: e.target.value})} placeholder="Your business name" />
              </div>
              <div className="form-group">
                <label>OWNER NAME</label>
                <input type="text" value={profile.owner_name || ''} onChange={e => setProfile({...profile, owner_name: e.target.value})} placeholder="Owner / proprietor name" />
              </div>
              <div className="form-group col-span-2">
                <label>GSTIN</label>
                <input type="text" value={profile.gstin || ''} onChange={e => setProfile({...profile, gstin: e.target.value})} placeholder="22AAAAA0000A1Z5" />
              </div>
              <div className="form-group col-span-2">
                <label>ADDRESS</label>
                <textarea value={profile.address || ''} onChange={e => setProfile({...profile, address: e.target.value})} placeholder="Full business address"></textarea>
              </div>
              <div className="form-group">
                <label>CITY</label>
                <input type="text" value={profile.city || ''} onChange={e => setProfile({...profile, city: e.target.value})} placeholder="City" />
              </div>
              <div className="form-group">
                <label>STATE</label>
                <input type="text" value={profile.state || ''} onChange={e => setProfile({...profile, state: e.target.value})} placeholder="State" />
              </div>
              <div className="form-group">
                <label>PIN CODE</label>
                <input type="text" value={profile.pin || ''} onChange={e => setProfile({...profile, pin: e.target.value})} placeholder="400001" />
              </div>
              <div className="form-group">
                <label>PHONE</label>
                <input type="text" value={profile.phone || ''} onChange={e => setProfile({...profile, phone: e.target.value})} placeholder="+91 9876543210" />
              </div>
              <div className="form-group col-span-2">
                <label>EMAIL</label>
                <input type="email" value={profile.email || ''} onChange={e => setProfile({...profile, email: e.target.value})} placeholder="business@company.com" />
              </div>
            </div>
          </div>

          <div className="card form-section-card mt-6">
            <div className="section-header-compact">
              <div className="section-icon bg-blue-100 text-blue-600"><CreditCard size={18} /></div>
              <h3 className="section-title-compact">Bank Details</h3>
            </div>
            <div className="form-grid mt-6">
              <div className="form-group flex-1">
                <label>BANK NAME</label>
                <input type="text" value={profile.bank_name || ''} onChange={e => setProfile({...profile, bank_name: e.target.value})} placeholder="Bank name" />
              </div>
              <div className="form-group flex-1">
                <label>ACCOUNT NUMBER</label>
                <input type="text" value={profile.account_number || ''} onChange={e => setProfile({...profile, account_number: e.target.value})} placeholder="Account number" />
              </div>
              <div className="form-group flex-1">
                <label>IFSC CODE</label>
                <input type="text" value={profile.ifsc_code || ''} onChange={e => setProfile({...profile, ifsc_code: e.target.value})} placeholder="ABCD0001234" />
              </div>
            </div>
          </div>
        </div>

        <div className="settings-sidebar">
          <div className="card sidebar-settings-card">
            <div className="section-header-compact">
              <div className="section-icon bg-gray-100 text-gray-600"><Settings2 size={18} /></div>
              <h3 className="section-title-compact">Invoice Preferences</h3>
            </div>
            
            <div className="form-row mt-6">
              <div className="form-group flex-1">
                <label>PREFIX</label>
                <input type="text" value={profile.invoice_prefix || ''} onChange={e => setProfile({...profile, invoice_prefix: e.target.value})} placeholder="INV-" />
              </div>
              <div className="form-group flex-1">
                <label>STARTING NO.</label>
                <input type="number" value={profile.starting_number || ''} onChange={e => setProfile({...profile, starting_number: parseInt(e.target.value) || 0})} />
              </div>
            </div>

            <div className="form-group mt-4">
              <label>DEFAULT NOTES</label>
              <textarea 
                className="small-textarea"
                value={profile.default_notes || ''}
                onChange={e => setProfile({...profile, default_notes: e.target.value})}
                placeholder="e.g., Payment due within 30 days. Thank you for your business."
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
