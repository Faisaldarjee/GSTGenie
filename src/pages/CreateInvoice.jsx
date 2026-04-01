import React, { useState, useEffect, useRef } from 'react';
import Layout from '../components/Layout/Layout';
import { 
  Zap, 
  Trash2, 
  Plus, 
  ChevronDown, 
  CheckCircle,
  Loader2,
  X,
  Search
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Common/Toast';
import { searchHSN } from '../data/hsnCodes';
import './CreateInvoice.css';

const CreateInvoice = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isClientSelectOpen, setIsClientSelectOpen] = useState(false);
  const [supplyType, setSupplyType] = useState('SAME_STATE');
  const [items, setItems] = useState([
    { id: 1, description: '', hsn: '', qty: 1, rate: 0, amount: 0 }
  ]);
  const [invoiceNo, setInvoiceNo] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [dueDate, setDueDate] = useState('');
  const [profileData, setProfileData] = useState(null);
  const [notes, setNotes] = useState('');

  // HSN Suggestion State
  const [hsnActiveItemId, setHsnActiveItemId] = useState(null);
  const [hsnQuery, setHsnQuery] = useState('');
  const [hsnResults, setHsnResults] = useState([]);
  const hsnPopupRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: clientsData } = await supabase.from('clients').select('*').order('name');
      setClients(clientsData || []);

      const { data: { user } } = await supabase.auth.getUser();
      const { data: profile } = await supabase
        .from('business_profile')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      if (profile) {
        setProfileData(profile);
        setInvoiceNo(`${profile.invoice_prefix || 'INV-'}${profile.starting_number || 1001}`);
        if (profile.default_notes) setNotes(profile.default_notes);
      } else {
        setInvoiceNo('INV-1001');
      }
    };
    fetchData();
  }, []);

  // Close HSN popup on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (hsnPopupRef.current && !hsnPopupRef.current.contains(e.target)) {
        setHsnActiveItemId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
  const cgst = supplyType === 'SAME_STATE' ? subtotal * 0.09 : 0;
  const sgst = supplyType === 'SAME_STATE' ? subtotal * 0.09 : 0;
  const igst = supplyType === 'INTERSTATE' ? subtotal * 0.18 : 0;
  const totalTax = cgst + sgst + igst;
  const totalPayable = subtotal + totalTax;

  const addItem = () => {
    setItems([...items, { id: Date.now(), description: '', hsn: '', qty: 1, rate: 0, amount: 0 }]);
  };

  const removeItem = (id) => {
    if (items.length === 1) {
      toast.info('At least one line item is required');
      return;
    }
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'qty' || field === 'rate') {
          updatedItem.amount = Number(updatedItem.qty) * Number(updatedItem.rate);
        }
        return updatedItem;
      }
      return item;
    }));
  };

  // HSN Suggestion handlers
  const openHSNSuggest = (itemId) => {
    const item = items.find(i => i.id === itemId);
    setHsnActiveItemId(itemId);
    setHsnQuery(item?.description || '');
    setHsnResults(searchHSN(item?.description || ''));
  };

  const handleHSNSearch = (query) => {
    setHsnQuery(query);
    setHsnResults(searchHSN(query));
  };

  const selectHSN = (itemId, hsnItem) => {
    setItems(items.map(item => {
      if (item.id === itemId) {
        return { ...item, hsn: hsnItem.code };
      }
      return item;
    }));
    setHsnActiveItemId(null);
    toast.success(`HSN ${hsnItem.code} applied — GST ${hsnItem.rate}%`);
  };

  const handleGenerateInvoice = async () => {
    if (!selectedClient) {
      toast.error('Please select a client');
      return;
    }

    const hasValidItems = items.some(item => item.description && item.rate > 0);
    if (!hasValidItems) {
      toast.error('Please add at least one line item with description and rate');
      return;
    }

    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      const invoiceData = {
        user_id: user.id,
        client_id: selectedClient.id,
        invoice_number: invoiceNo,
        invoice_date: invoiceDate,
        due_date: dueDate || null,
        line_items: items,
        supply_type: supplyType,
        subtotal,
        cgst,
        sgst,
        igst,
        total: totalPayable,
        status: 'PENDING',
        notes
      };

      const { data, error } = await supabase.from('invoices').insert([invoiceData]).select();
      if (error) throw error;

      // Auto-increment invoice number in profile
      if (profileData) {
        const nextNumber = (profileData.starting_number || 1001) + 1;
        await supabase
          .from('business_profile')
          .update({ starting_number: nextNumber })
          .eq('id', profileData.id);
      }

      toast.success('Invoice created successfully!');
      navigate(`/invoices/preview/${data[0].id}`);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="Create Invoice">
      <div className="create-invoice-container">
        <div className="invoice-form-main">
          {/* Invoice Info */}
          <div className="card form-section">
            <div className="form-row">
              <div className="form-group flex-1">
                <label>Invoice Number</label>
                <input type="text" value={invoiceNo} onChange={e => setInvoiceNo(e.target.value)} />
              </div>
              <div className="form-group flex-1">
                <label>Invoice Date</label>
                <input type="date" value={invoiceDate} onChange={e => setInvoiceDate(e.target.value)} />
              </div>
              <div className="form-group flex-1">
                <label>Due Date</label>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="card form-section mt-6">
            <h3 className="section-title">BILL TO</h3>
            <div className="form-group" style={{ position: 'relative' }}>
              <div 
                className="select-client-box" 
                onClick={() => setIsClientSelectOpen(!isClientSelectOpen)}
              >
                <span>{selectedClient ? selectedClient.name : 'Select a Client'}</span>
                <ChevronDown size={18} />
              </div>
              
              {isClientSelectOpen && (
                <div className="client-dropdown card" style={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 50, marginTop: '4px', padding: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.12)' }}>
                  {clients.map(client => (
                    <div 
                        key={client.id} 
                        style={{ padding: '12px', cursor: 'pointer', borderRadius: '6px', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        onClick={() => { setSelectedClient(client); setIsClientSelectOpen(false); }}
                    >
                        <strong>{client.name}</strong>
                        <p style={{ fontSize: '12px', color: '#999', marginTop: '2px' }}>{client.company}</p>
                    </div>
                  ))}
                  {clients.length === 0 && <p style={{ padding: '12px', fontSize: '13px', color: '#999' }}>No clients found. Add one first!</p>}
                </div>
              )}
            </div>

            {selectedClient && (
              <div className="mt-4" style={{ fontSize: '13px', color: '#666', lineHeight: '1.8', padding: '12px', background: '#F8FAFC', borderRadius: '8px' }}>
                <p><strong>Company:</strong> {selectedClient.company || '-'}</p>
                <p><strong>GSTIN:</strong> {selectedClient.gstin || 'Not registered'}</p>
                <p><strong>State:</strong> {selectedClient.state || '-'}</p>
                <p><strong>Phone:</strong> {selectedClient.phone || '-'}</p>
              </div>
            )}
          </div>

          {/* Line Items */}
          <div className="card form-section mt-6">
            <div className="section-header">
              <h3 className="section-title">LINE ITEMS</h3>
              <button className="add-item-btn" onClick={addItem}>
                <Plus size={16} />
                <span>Add Item</span>
              </button>
            </div>
            
            <div className="items-table-container mt-4">
              <table className="items-table">
                <thead>
                  <tr>
                    <th className="th-desc">DESCRIPTION</th>
                    <th className="th-hsn">HSN/SAC</th>
                    <th className="th-qty">QTY</th>
                    <th className="th-rate">RATE</th>
                    <th className="th-amt">AMOUNT</th>
                    <th className="th-action"></th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <input className="table-input" value={item.description} onChange={e => updateItem(item.id, 'description', e.target.value)} placeholder="e.g., Web Development Services" />
                      </td>
                      <td style={{ position: 'relative' }}>
                        <div className="hsn-input-group">
                          <input className="table-input" value={item.hsn} onChange={e => updateItem(item.id, 'hsn', e.target.value)} placeholder="HSN" />
                          <button className="hsn-suggest-chip" onClick={() => openHSNSuggest(item.id)} type="button">
                            <Zap size={10} />
                            <span>AI</span>
                          </button>
                        </div>

                        {/* HSN Suggestion Popup */}
                        {hsnActiveItemId === item.id && (
                          <div className="hsn-popup" ref={hsnPopupRef}>
                            <div className="hsn-popup-header">
                              <div className="hsn-popup-search">
                                <Search size={14} />
                                <input 
                                  type="text" 
                                  placeholder="Search HSN... e.g., laptop, consulting" 
                                  value={hsnQuery}
                                  onChange={e => handleHSNSearch(e.target.value)}
                                  autoFocus
                                />
                              </div>
                              <button className="hsn-popup-close" onClick={() => setHsnActiveItemId(null)}>
                                <X size={14} />
                              </button>
                            </div>
                            <div className="hsn-popup-results">
                              {hsnResults.length > 0 ? (
                                hsnResults.map((hsn, idx) => (
                                  <div 
                                    key={idx} 
                                    className="hsn-result-item"
                                    onClick={() => selectHSN(item.id, hsn)}
                                  >
                                    <div className="hsn-result-left">
                                      <span className="hsn-result-code">{hsn.code}</span>
                                      <span className="hsn-result-desc">{hsn.description}</span>
                                    </div>
                                    <div className="hsn-result-right">
                                      <span className="hsn-result-rate">{hsn.rate}%</span>
                                      <span className="hsn-result-cat">{hsn.category}</span>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="hsn-no-results">
                                  {hsnQuery.length < 2 ? 'Type at least 2 characters to search...' : 'No matching HSN codes found.'}
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </td>
                      <td><input className="table-input text-center" value={item.qty} type="number" min="1" onChange={e => updateItem(item.id, 'qty', e.target.value)} /></td>
                      <td>
                        <div className="currency-input">
                          <span>₹</span>
                          <input className="table-input" value={item.rate} type="number" min="0" onChange={e => updateItem(item.id, 'rate', e.target.value)} />
                        </div>
                      </td>
                      <td className="amount-val">₹ {item.amount.toLocaleString('en-IN')}</td>
                      <td>
                        <button className="remove-btn" onClick={() => removeItem(item.id)} type="button"><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div className="card form-section mt-6">
            <div className="form-group">
              <label>NOTES & TERMS</label>
              <textarea 
                value={notes} 
                onChange={e => setNotes(e.target.value)} 
                placeholder="Payment due within 30 days. Thank you for your business."
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Sidebar Summary */}
        <div className="invoice-sidebar">
          <div className="card summary-card">
            <h3 className="summary-title">TAX SUMMARY</h3>
            
            <div className="summary-row mt-6">
              <span>Subtotal</span>
              <span className="val">₹ {subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="supply-type-toggle mt-6">
              <div className="toggle-label">SUPPLY TYPE</div>
              <div className="toggle-btns">
                <button className={supplyType === 'SAME_STATE' ? 'active' : ''} onClick={() => setSupplyType('SAME_STATE')}>SAME STATE</button>
                <button className={supplyType === 'INTERSTATE' ? 'active' : ''} onClick={() => setSupplyType('INTERSTATE')}>INTERSTATE</button>
              </div>
            </div>

            <div className="tax-breakdown mt-6">
              {supplyType === 'SAME_STATE' ? (
                <>
                  <div className="summary-row"><span>CGST (9%)</span><span>₹ {cgst.toLocaleString('en-IN')}</span></div>
                  <div className="summary-row mt-2"><span>SGST (9%)</span><span>₹ {sgst.toLocaleString('en-IN')}</span></div>
                </>
              ) : (
                <div className="summary-row"><span>IGST (18%)</span><span>₹ {igst.toLocaleString('en-IN')}</span></div>
              )}
              <div className="summary-row mt-4 pt-4 border-t"><span className="font-bold">Total Tax</span><span className="font-bold">₹ {totalTax.toLocaleString('en-IN')}</span></div>
            </div>

            <div className="total-payable-section mt-8">
              <div className="payable-label">TOTAL PAYABLE</div>
              <div className="payable-value">₹ {totalPayable.toLocaleString('en-IN')}</div>
            </div>
          </div>

          <div className="sidebar-actions mt-6">
            <button className="btn btn-primary btn-full" disabled={loading} onClick={handleGenerateInvoice} style={{ backgroundColor: 'var(--primary)' }}>
              {loading ? <Loader2 className="animate-spin" size={18} /> : (
                <>
                  <CheckCircle size={18} />
                  <span>Generate Invoice</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateInvoice;
