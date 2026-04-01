import React, { useEffect, useState, useRef } from 'react';
import { Search, Zap, Plus, Bell, Settings, LogOut, User, ChevronDown, X, FileText, Users } from 'lucide-react';
import { useAuth } from '../../lib/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import './TopBar.css';

const TopBar = ({ title }) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({ clients: [], invoices: [] });
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      const { data } = await supabase
        .from('business_profile')
        .select('business_name, owner_name')
        .eq('user_id', user.id)
        .single();

      if (data?.business_name) setDisplayName(data.business_name);
      else if (data?.owner_name) setDisplayName(data.owner_name);
      else setDisplayName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'User');
    };
    fetchProfile();
  }, [user]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setIsProfileOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setIsSearchOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Global search
  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim().length < 2) {
      setSearchResults({ clients: [], invoices: [] });
      return;
    }

    const [clientsRes, invoicesRes] = await Promise.all([
      supabase.from('clients').select('id, name, company').ilike('name', `%${query}%`).limit(5),
      supabase.from('invoices').select('id, invoice_number, total, status, clients(name)').or(`invoice_number.ilike.%${query}%`).limit(5),
    ]);

    setSearchResults({
      clients: clientsRes.data || [],
      invoices: invoicesRes.data || [],
    });
  };

  // Keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
        setTimeout(() => {
          const input = document.getElementById('global-search-input');
          if (input) input.focus();
        }, 100);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  const initials = displayName
    ? displayName.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2 className="topbar-title">{title}</h2>
        <div className="topbar-search" ref={searchRef} onClick={() => setIsSearchOpen(true)}>
          <Search size={18} className="search-icon" />
          <input 
            id="global-search-input"
            type="text" 
            placeholder="Search... (Ctrl+K)" 
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            onFocus={() => setIsSearchOpen(true)}
          />
          {searchQuery && (
            <button className="search-clear" onClick={(e) => { e.stopPropagation(); setSearchQuery(''); setSearchResults({ clients: [], invoices: [] }); }}>
              <X size={14} />
            </button>
          )}

          {/* Search Results Dropdown */}
          {isSearchOpen && (searchResults.clients.length > 0 || searchResults.invoices.length > 0) && (
            <div className="search-dropdown">
              {searchResults.clients.length > 0 && (
                <div className="search-section">
                  <div className="search-section-title"><Users size={12} /> Clients</div>
                  {searchResults.clients.map(c => (
                    <div key={c.id} className="search-result-item" onClick={() => { navigate('/clients'); setIsSearchOpen(false); setSearchQuery(''); }}>
                      <div className="search-result-avatar">{c.name.charAt(0)}</div>
                      <div>
                        <div className="search-result-name">{c.name}</div>
                        <div className="search-result-sub">{c.company || 'No company'}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {searchResults.invoices.length > 0 && (
                <div className="search-section">
                  <div className="search-section-title"><FileText size={12} /> Invoices</div>
                  {searchResults.invoices.map(inv => (
                    <div key={inv.id} className="search-result-item" onClick={() => { navigate(`/invoices/preview/${inv.id}`); setIsSearchOpen(false); setSearchQuery(''); }}>
                      <div className="search-result-avatar" style={{ background: '#EEF2FF', color: '#4F46E5' }}>{inv.invoice_number?.slice(-3)}</div>
                      <div>
                        <div className="search-result-name">{inv.invoice_number}</div>
                        <div className="search-result-sub">{inv.clients?.name} • ₹{Number(inv.total).toLocaleString('en-IN')}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="topbar-right">
        <button className="btn btn-primary" onClick={() => navigate('/invoices/create')}>
          <Plus size={18} />
          <span>New Invoice</span>
        </button>
        
        <div className="topbar-actions">
          <div className="notification-btn">
            <Bell size={20} className="bell-icon" />
          </div>
          
          {/* Profile Dropdown */}
          <div className="profile-dropdown-wrapper" ref={profileRef}>
            <button className="profile-trigger" onClick={() => setIsProfileOpen(!isProfileOpen)}>
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0047D1&color=fff&size=80`} 
                alt="User" 
                className="user-avatar" 
              />
              <ChevronDown size={14} className={`profile-chevron ${isProfileOpen ? 'open' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="profile-dropdown-header">
                  <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=0047D1&color=fff&size=80`} 
                    alt="User" 
                    className="dropdown-avatar" 
                  />
                  <div>
                    <div className="dropdown-name">{displayName}</div>
                    <div className="dropdown-email">{user?.email}</div>
                  </div>
                </div>
                <div className="profile-dropdown-divider" />
                <button className="profile-dropdown-item" onClick={() => { navigate('/settings'); setIsProfileOpen(false); }}>
                  <Settings size={16} />
                  <span>Settings</span>
                </button>
                <button className="profile-dropdown-item" onClick={() => { navigate('/settings'); setIsProfileOpen(false); }}>
                  <User size={16} />
                  <span>Business Profile</span>
                </button>
                <div className="profile-dropdown-divider" />
                <button className="profile-dropdown-item logout-item" onClick={handleLogout}>
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
