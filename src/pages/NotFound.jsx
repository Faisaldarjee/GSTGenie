import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Zap } from 'lucide-react';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <div className="notfound-icon">
          <Zap size={48} />
        </div>
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-title">Page Not Found</h2>
        <p className="notfound-desc">
          The page you're looking for doesn't exist or has been moved. 
          Let's get you back on track.
        </p>
        <div className="notfound-actions">
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            <Home size={18} />
            <span>Go to Dashboard</span>
          </button>
          <button className="btn btn-outline" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
