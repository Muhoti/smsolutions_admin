import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiEye, FiEyeOff, FiLoader } from 'react-icons/fi';
import { ASSETS } from '../../constants/assets';
import Button from '../ui/Button';
import ThemeToggle from '../ThemeToggle';

const AdminLogin = ({ loginData, setLoginData, onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
  <div className="adm-login-page ai-surface-light">
    <div className="adm-login-toolbar">
      <Link to="/" className="adm-login-back">
        <FiArrowLeft size={16} />
        Website
      </Link>
      <ThemeToggle />
    </div>

    <div className="adm-login-content">
      <motion.div
        className="adm-login-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="adm-login-brand">
          <img src={ASSETS.logoNavbar} alt="Strong's Digital Labs" />
          <span className="section-eyebrow">Admin Portal</span>
          <h1>Sign in</h1>
          <p>Manage inquiries, portfolio, and testimonials</p>
        </div>

        <form onSubmit={onSubmit} className="adm-login-form">
          <div className="form-group">
            <label htmlFor="admin-email">Email</label>
            <input
              type="email"
              id="admin-email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
              autoComplete="email"
              placeholder="admin@smsolutions.co.ke"
            />
          </div>

          <div className="form-group">
            <label htmlFor="admin-password">Password</label>
            <div className="adm-password-field">
              <input
                type={showPassword ? 'text' : 'password'}
                id="admin-password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="adm-password-toggle"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <FiLoader className="spinner" size={18} />
                Signing in…
              </>
            ) : (
              'Sign In'
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  </div>
  );
};

export default AdminLogin;
