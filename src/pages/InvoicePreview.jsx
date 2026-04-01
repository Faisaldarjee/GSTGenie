import React, { useEffect, useState, useRef } from 'react';
import Layout from '../components/Layout/Layout';
import { 
  ArrowLeft, 
  Download, 
  Send, 
  Zap,
  MessageSquare,
  Mail,
  Loader2,
  CheckCircle,
  Clock
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useToast } from '../components/Common/Toast';
import './InvoicePreview.css';

const InvoicePreview = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const toast = useToast();
    const invoiceRef = useRef(null);
    const [invoice, setInvoice] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [downloading, setDownloading] = useState(false);
    const [updatingStatus, setUpdatingStatus] = useState(false);

    const fetchPreviewData = async () => {
        try {
            const { data: inv, error: invErr } = await supabase
                .from('invoices')
                .select('*, clients(*)')
                .eq('id', id)
                .single();
            
            if (invErr) throw invErr;
            setInvoice(inv);

            const { data: prof } = await supabase
                .from('business_profile')
                .select('*')
                .eq('user_id', inv.user_id)
                .single();
            
            setProfile(prof);
        } catch (err) {
            console.error('Error fetching preview:', err);
            toast.error('Failed to load invoice');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPreviewData();
    }, [id]);

    const handleDownloadPDF = async () => {
        if (!invoiceRef.current) return;
        setDownloading(true);
        
        try {
            const html2pdf = (await import('html2pdf.js')).default;
            
            const opt = {
                margin: [10, 10, 10, 10],
                filename: `${invoice.invoice_number}_${invoice.clients?.name || 'Invoice'}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, letterRendering: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };

            await html2pdf().set(opt).from(invoiceRef.current).save();
            toast.success('PDF downloaded successfully!');
        } catch (err) {
            console.error('PDF generation error:', err);
            toast.error('Failed to generate PDF. Please try again.');
        } finally {
            setDownloading(false);
        }
    };

    const handleMarkAsPaid = async () => {
        setUpdatingStatus(true);
        try {
            const newStatus = invoice.status === 'PAID' ? 'PENDING' : 'PAID';
            const { error } = await supabase
                .from('invoices')
                .update({ status: newStatus })
                .eq('id', id);
            
            if (error) throw error;
            
            setInvoice({ ...invoice, status: newStatus });
            toast.success(newStatus === 'PAID' ? 'Invoice marked as Paid!' : 'Invoice marked as Pending');
        } catch (err) {
            toast.error(err.message);
        } finally {
            setUpdatingStatus(false);
        }
    };

    const handleWhatsApp = () => {
        const message = `Hi, please find the invoice ${invoice.invoice_number} for ₹${Number(invoice.total).toLocaleString('en-IN')}. Due date: ${invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'N/A'}`;
        const phone = invoice.clients?.phone?.replace(/[^0-9]/g, '') || '';
        const url = phone 
            ? `https://wa.me/91${phone}?text=${encodeURIComponent(message)}`
            : `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
    };

    const handleEmail = () => {
        const subject = `Invoice ${invoice.invoice_number} from ${profile?.business_name || 'GSTGenie'}`;
        const body = `Dear ${invoice.clients?.name},\n\nPlease find attached invoice ${invoice.invoice_number} for ₹${Number(invoice.total).toLocaleString('en-IN')}.\n\nDue Date: ${invoice.due_date ? new Date(invoice.due_date).toLocaleDateString() : 'N/A'}\n\nThank you for your business.\n\nRegards,\n${profile?.owner_name || profile?.business_name || 'GSTGenie'}`;
        const mailto = `mailto:${invoice.clients?.email || ''}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        window.location.href = mailto;
    };

    if (loading) {
        return (
            <Layout title="Invoice Preview">
                <div className="loading-container">
                    <Loader2 size={48} />
                </div>
            </Layout>
        );
    }

    if (!invoice) return (
        <Layout title="Invoice Preview">
            <div className="empty-state">Invoice not found.</div>
        </Layout>
    );

  return (
    <Layout title="Invoice Preview">
      <div className="preview-top-actions">
        <button className="back-btn" onClick={() => navigate('/invoices')}>
          <ArrowLeft size={20} />
          <span>Back to Invoices</span>
        </button>
        <div className="action-buttons" style={{ display: 'flex', gap: '10px' }}>
          <button 
            className={`btn ${invoice.status === 'PAID' ? 'btn-outline' : 'btn-paid-toggle'}`}
            onClick={handleMarkAsPaid}
            disabled={updatingStatus}
          >
            {updatingStatus ? <Loader2 className="animate-spin" size={18} /> : (
              invoice.status === 'PAID' 
                ? <><Clock size={18} /><span>Mark Pending</span></>
                : <><CheckCircle size={18} /><span>Mark as Paid</span></>
            )}
          </button>
          <button className="btn btn-primary">
            <Send size={18} />
            <span>Finalize & Send</span>
          </button>
        </div>
      </div>

      <div className="preview-container">
        <div className="invoice-document-wrapper">
          <div className="invoice-document" ref={invoiceRef}>
            {/* Status Banner */}
            {invoice.status === 'PAID' && (
              <div className="paid-watermark">PAID</div>
            )}
            
            <div className="doc-header">
              <div className="bill-from">
                <div className="biz-logo">
                  <Zap size={24} />
                  <span>{profile?.business_name || 'GSTGenie Solutions'}</span>
                </div>
                <div className="biz-details">
                  <p>{profile?.address}</p>
                  <p>{profile?.city}{profile?.city && profile?.state ? ', ' : ''}{profile?.state} {profile?.pin}</p>
                  {profile?.gstin && <p><strong>GSTIN:</strong> {profile?.gstin}</p>}
                  {profile?.phone && <p><strong>Phone:</strong> {profile?.phone}</p>}
                  {profile?.email && <p><strong>Email:</strong> {profile?.email}</p>}
                </div>
              </div>
              <div className="doc-type">
                <h1 className="tax-invoice-title">TAX INVOICE</h1>
                <div className="invoice-meta">
                  <div className="meta-row"><span>INVOICE NO.</span><strong>{invoice.invoice_number}</strong></div>
                  <div className="meta-row"><span>DATE</span><strong>{invoice.invoice_date ? new Date(invoice.invoice_date).toLocaleDateString('en-IN') : '-'}</strong></div>
                  <div className="meta-row"><span>DUE DATE</span><strong>{invoice.due_date ? new Date(invoice.due_date).toLocaleDateString('en-IN') : '-'}</strong></div>
                  <div className="meta-row"><span>STATUS</span><strong style={{ color: invoice.status === 'PAID' ? '#059669' : '#4F46E5' }}>{invoice.status}</strong></div>
                </div>
              </div>
            </div>

            <div className="billing-section">
              <div className="bill-to">
                <span className="label">BILL TO</span>
                <h2 className="client-biz-name">{invoice.clients?.name}</h2>
                <p className="text-sm text-muted">{invoice.clients?.company}</p>
                <div className="client-details mt-2">
                  {invoice.clients?.address && <p>{invoice.clients?.address}</p>}
                  {invoice.clients?.phone && <p>Phone: {invoice.clients?.phone}</p>}
                  {invoice.clients?.email && <p>Email: {invoice.clients?.email}</p>}
                </div>
              </div>
              <div className="place-of-supply">
                {invoice.clients?.gstin && <p><strong>GSTIN:</strong> {invoice.clients?.gstin}</p>}
                <p><strong>Place of Supply:</strong> {invoice.clients?.state || '-'}</p>
                <p><strong>Supply Type:</strong> {invoice.supply_type === 'SAME_STATE' ? 'Intra-State' : 'Inter-State'}</p>
              </div>
            </div>

            <table className="doc-items-table">
              <thead>
                <tr>
                  <th className="w-12">SR.</th>
                  <th>DESCRIPTION</th>
                  <th>HSN</th>
                  <th>QTY</th>
                  <th>RATE</th>
                  <th className="text-right">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {(invoice.line_items || []).map((item, idx) => (
                    <tr key={idx}>
                        <td>{idx + 1}</td>
                        <td><strong>{item.description}</strong></td>
                        <td>{item.hsn || '-'}</td>
                        <td>{item.qty}</td>
                        <td>₹ {Number(item.rate).toLocaleString('en-IN')}</td>
                        <td className="text-right">₹ {Number(item.amount).toLocaleString('en-IN')}</td>
                    </tr>
                ))}
              </tbody>
            </table>

            <div className="doc-footer">
              <div className="footer-left">
                <div className="notes-section">
                  <span className="label">NOTES & TERMS</span>
                  <p className="text-xs whitespace-pre-wrap">{invoice.notes || profile?.default_notes || 'Thank you for your business.'}</p>
                </div>
                {profile?.bank_name && (
                  <div className="bank-section mt-4">
                    <span className="label">BANK DETAILS</span>
                    <p className="text-xs"><strong>Bank:</strong> {profile.bank_name}</p>
                    <p className="text-xs"><strong>A/C No:</strong> {profile.account_number}</p>
                    <p className="text-xs"><strong>IFSC:</strong> {profile.ifsc_code}</p>
                  </div>
                )}
              </div>
              <div className="footer-right">
                <div className="summary-list">
                  <div className="summary-line"><span>Subtotal</span><span>₹ {Number(invoice.subtotal).toLocaleString('en-IN')}</span></div>
                  {invoice.supply_type === 'SAME_STATE' ? (
                      <>
                        <div className="summary-line"><span>CGST (9%)</span><span>₹ {Number(invoice.cgst).toLocaleString('en-IN')}</span></div>
                        <div className="summary-line"><span>SGST (9%)</span><span>₹ {Number(invoice.sgst).toLocaleString('en-IN')}</span></div>
                      </>
                  ) : (
                    <div className="summary-line"><span>IGST (18%)</span><span>₹ {Number(invoice.igst).toLocaleString('en-IN')}</span></div>
                  )}
                  <div className="total-row">
                    <div className="total-label"><span>Total Amount</span></div>
                    <div className="total-val">₹ {Number(invoice.total).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="preview-sidebar">
          <div className="card distribution-card">
            <h3 className="section-title">Distribute</h3>
            <div className="dist-actions mt-4">
              <button className="btn btn-outline-dark btn-full" onClick={handleDownloadPDF} disabled={downloading}>
                {downloading ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
                <span>{downloading ? 'Generating...' : 'Download PDF'}</span>
              </button>
              <button className="btn btn-whatsapp btn-full mt-3" onClick={handleWhatsApp}>
                <MessageSquare size={18} />
                <span>Send via WhatsApp</span>
              </button>
              <button className="btn btn-dark btn-full mt-3" onClick={handleEmail}>
                <Mail size={18} />
                <span>Email Client</span>
              </button>
            </div>
          </div>

          {/* Invoice Quick Info */}
          <div className="card mt-4" style={{ padding: '20px' }}>
            <h3 className="section-title">Quick Info</h3>
            <div style={{ fontSize: '13px', lineHeight: '2', color: '#666' }}>
              <p><strong>Client:</strong> {invoice.clients?.name}</p>
              <p><strong>Created:</strong> {new Date(invoice.created_at).toLocaleDateString('en-IN')}</p>
              <p><strong>Amount:</strong> ₹{Number(invoice.total).toLocaleString('en-IN')}</p>
              <p><strong>Tax:</strong> ₹{(Number(invoice.cgst) + Number(invoice.sgst) + Number(invoice.igst)).toLocaleString('en-IN')}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default InvoicePreview;
