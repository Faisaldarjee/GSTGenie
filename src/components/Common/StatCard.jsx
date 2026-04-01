import React from 'react';
import './StatCard.css';

const StatCard = ({ title, value, subValue, trend, trendColor, icon }) => {
  return (
    <div className="stat-card">
      <div className="stat-card-header">
        <span className="stat-title">{title}</span>
        {icon && <div className="stat-icon">{icon}</div>}
      </div>
      <div className="stat-value">{value}</div>
      <div className={`stat-subvalue ${trendColor}`}>
        {trend && <span className="stat-trend">{trend}</span>}
        <span>{subValue}</span>
      </div>
    </div>
  );
};

export default StatCard;
