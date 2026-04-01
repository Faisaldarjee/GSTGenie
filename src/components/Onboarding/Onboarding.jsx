import React, { useState } from 'react';
import { Building2, CreditCard, CheckCircle, ArrowRight, Zap } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../lib/AuthContext';
import { useToast } from '../Common/Toast';
import './Onboarding.css';

const Onboarding = ({ onComplete }) => {
  const { user } = useAuth();
  const toast = useToast();
  const [step, setStep] = useState(1);
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
    email: user?.email || '',
    bank_name: '',
    account_number: '',
    ifsc_code: '',
    invoice_prefix: 'INV-',
    starting_number: 1001,
    default_notes: 'Payment due within 30 days. Thank you for your business.'
  });

  const steps = [
    { num: 1, title: 'Business Info', icon: <Building2 size={18} /> },
    { num: 2, title: 'GST & Address', icon: <Zap size={18} /> },
    { num: 3, title: 'Bank & Preferences', icon: <CreditCard size={18} /> },
  ];

  const handleSave = async () => {
    if (!profile.business_name.trim()) {
      toast.error('Please enter your business name');
      return;
    }
    
    setSaving(true);
    try {
      const { error } = await supabase
        .from('business_profile')
        .upsert({ ...profile, user_id: user.id });

      if (error) throw error;
      toast.success('Welcome to GSTGenie! Your profile is ready 🎉');
      onComplete();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card">
        {/* Header */}
        <div className="onboarding-header">
          <div className="onboarding-brand">
            <Zap size={28} fill="#7C3AED" color="#7C3AED" />
            <h1>Welcome to GSTGenie</h1>
          </div>
          <p>Let's set up your business profile in 3 quick steps</p>
        </div>

        {/* Step Indicator */}
        <div className="step-indicator">
          {steps.map((s) => (
            <div key={s.num} className={`step-item ${step === s.num ? 'active' : ''} ${step > s.num ? 'completed' : ''}`}>
              <div className="step-circle">
                {step > s.num ? <CheckCircle size={16} /> : s.num}
              </div>
              <span className="step-label">{s.title}</span>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="onboarding-body">
          {step === 1 && (
            <div className="step-content animate-step">
              <h3>Tell us about your business</h3>
              <div className="onb-form-grid">
                <div className="onb-form-group full">
                  <label>Business Name *</label>
                  <input type="text" value={profile.business_name} onChange={e => setProfile({...profile, business_name: e.target.value})} placeholder="e.g., Sharma Electronics" autoFocus />
                </div>
                <div className="onb-form-group">
                  <label>Owner / Proprietor Name</label>
                  <input type="text" value={profile.owner_name} onChange={e => setProfile({...profile, owner_name: e.target.value})} placeholder="Your full name" />
                </div>
                <div className="onb-form-group">
                  <label>Phone Number</label>
                  <input type="text" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} placeholder="+91 9876543210" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step-content animate-step">
              <h3>GST & Address Details</h3>
              <div className="onb-form-grid">
                <div className="onb-form-group full">
                  <label>GSTIN (Optional — you can add later)</label>
                  <input type="text" value={profile.gstin} onChange={e => setProfile({...profile, gstin: e.target.value})} placeholder="22AAAAA0000A1Z5" />
                </div>
                <div className="onb-form-group full">
                  <label>Business Address</label>
                  <textarea value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})} placeholder="Shop No. 12, Main Road..." rows="2"></textarea>
                </div>
                <div className="onb-form-group">
                  <label>City</label>
                  <input type="text" value={profile.city} onChange={e => setProfile({...profile, city: e.target.value})} placeholder="Mumbai" />
                </div>
                <div className="onb-form-group">
                  <label>State</label>
                  <select value={profile.state} onChange={e => setProfile({...profile, state: e.target.value})}>
                    <option value="">Select State</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Bihar">Bihar</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Goa">Goa</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Haryana">Haryana</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Jammu & Kashmir">Jammu & Kashmir</option>
                  </select>
                </div>
                <div className="onb-form-group">
                  <label>PIN Code</label>
                  <input type="text" value={profile.pin} onChange={e => setProfile({...profile, pin: e.target.value})} placeholder="400001" />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step-content animate-step">
              <h3>Bank & Invoice Preferences</h3>
              <div className="onb-form-grid">
                <div className="onb-form-group">
                  <label>Bank Name</label>
                  <input type="text" value={profile.bank_name} onChange={e => setProfile({...profile, bank_name: e.target.value})} placeholder="State Bank of India" />
                </div>
                <div className="onb-form-group">
                  <label>Account Number</label>
                  <input type="text" value={profile.account_number} onChange={e => setProfile({...profile, account_number: e.target.value})} placeholder="123456789012" />
                </div>
                <div className="onb-form-group">
                  <label>IFSC Code</label>
                  <input type="text" value={profile.ifsc_code} onChange={e => setProfile({...profile, ifsc_code: e.target.value})} placeholder="SBIN0001234" />
                </div>
                <div className="onb-form-group">
                  <label>Invoice Prefix</label>
                  <input type="text" value={profile.invoice_prefix} onChange={e => setProfile({...profile, invoice_prefix: e.target.value})} placeholder="INV-" />
                </div>
                <div className="onb-form-group full">
                  <label>Default Invoice Notes</label>
                  <textarea value={profile.default_notes} onChange={e => setProfile({...profile, default_notes: e.target.value})} placeholder="Payment due within 30 days..." rows="2"></textarea>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="onboarding-footer">
          {step > 1 && (
            <button className="onb-btn-back" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          <div style={{ flex: 1 }} />
          {step < 3 ? (
            <button className="onb-btn-next" onClick={() => {
              if (step === 1 && !profile.business_name.trim()) {
                toast.error('Please enter your business name');
                return;
              }
              setStep(step + 1);
            }}>
              <span>Continue</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <button className="onb-btn-finish" onClick={handleSave} disabled={saving}>
              {saving ? 'Setting up...' : '🚀 Launch My Dashboard'}
            </button>
          )}
        </div>

        {/* Skip option */}
        <div className="onboarding-skip">
          <button onClick={() => {
            localStorage.setItem(`gstgenie_onboarding_skipped_${user.id}`, 'true');
            onComplete();
          }}>Skip for now — I'll set up later</button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
