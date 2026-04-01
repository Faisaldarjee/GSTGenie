import React from 'react';
import './StatusBadge.css';

const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    switch (status.toUpperCase()) {
      case 'PAID': return 'badge-paid';
      case 'PENDING': return 'badge-pending';
      case 'OVERDUE': return 'badge-overdue';
      case 'GST REGISTERED': return 'badge-paid';
      case 'UNREGISTERED': return 'badge-muted';
      default: return '';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass()}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
