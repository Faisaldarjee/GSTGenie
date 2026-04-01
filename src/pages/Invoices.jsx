import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import InvoiceList from './InvoiceList';
import CreateInvoice from './CreateInvoice';
import InvoicePreview from './InvoicePreview';
import './Invoices.css';

const Invoices = () => {
  return (
    <Routes>
      <Route path="/" element={<InvoiceList />} />
      <Route path="/create" element={<CreateInvoice />} />
      <Route path="/preview/:id" element={<InvoicePreview />} />
    </Routes>
  );
};

export default Invoices;
