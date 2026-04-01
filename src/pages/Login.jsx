import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { useToast } from '../components/Common/Toast';
import { Zap, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleAuth = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const { data, error: authError } = isSignUp 
        ? await signUp({ email, password })
        : await signIn({ email, password });

      if (authError) throw authError;

      if (isSignUp) {
        toast.success('Account created! Check your email for the confirmation link.');
      } else {
        toast.success('Welcome back!');
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="brand-logo">
            <Zap size={32} fill="#7C3AED" color="#7C3AED" />
            <h1>GSTGenie</h1>
          </div>
          <p>{isSignUp ? 'Create your professional billing account' : 'Welcome back to your billing dashboard'}</p>
        </div>

        <form className="login-form" onSubmit={handleAuth}>
          <div className="form-group">
            <label>EMAIL ADDRESS</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input 
                type="email" 
                placeholder="you@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group mt-4">
            <label>PASSWORD</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
          </div>

          {error && <div className="auth-error mt-4">{error}</div>}

          <button className="btn btn-primary btn-full mt-6" disabled={isLoading}>
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (
              <>
                <span>{isSignUp ? 'Create Account' : 'Sign In'}</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isSignUp ? 'Already have an account?' : 'Don\'t have an account?'}
            <button onClick={() => { setIsSignUp(!isSignUp); setError(''); }}>
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
