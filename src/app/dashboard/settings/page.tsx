'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { FaCog, FaUser, FaBell, FaShieldAlt, FaSave, FaExclamationTriangle, FaMoon, FaSun, FaKey, FaWallet, FaTrash } from 'react-icons/fa'
import { motion } from 'framer-motion'

// User settings types
interface UserSettings {
  profile: {
    username: string;
    email: string;
    profileImage?: string;
  };
  preferences: {
    theme: 'light' | 'dark' | 'system';
    notifications: {
      priceAlerts: boolean;
      tradeExecutions: boolean;
      systemUpdates: boolean;
      strategyUpdates: boolean;
      newsletterEmails: boolean;
    };
    trading: {
      confirmBeforeTrade: boolean;
      maxTransactionValue: number;
      slippageTolerance: number;
    };
  };
  security: {
    twoFactorEnabled: boolean;
    lastPasswordChange: string;
    apiKeysEnabled: boolean;
  };
}

// Mock user settings
const initialSettings: UserSettings = {
  profile: {
    username: 'vector_trader',
    email: 'trader@example.com',
    profileImage: 'https://avatars.githubusercontent.com/u/12345678'
  },
  preferences: {
    theme: 'system',
    notifications: {
      priceAlerts: true,
      tradeExecutions: true,
      systemUpdates: true,
      strategyUpdates: true,
      newsletterEmails: false
    },
    trading: {
      confirmBeforeTrade: true,
      maxTransactionValue: 1000,
      slippageTolerance: 0.5
    }
  },
  security: {
    twoFactorEnabled: false,
    lastPasswordChange: '2023-11-15T10:30:00Z',
    apiKeysEnabled: false
  }
};

const SettingsPage = () => {
  const [settings, setSettings] = useState<UserSettings>(initialSettings);
  const [activeTab, setActiveTab] = useState<'profile' | 'preferences' | 'security' | 'wallet'>('profile');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean | null>(null);
  
  // Handle form changes
  const handleChange = (section: keyof UserSettings, field: string, value: any) => {
    if (field.includes('.')) {
      // Handle nested fields like 'notifications.priceAlerts'
      const [parentField, childField] = field.split('.');
      setSettings({
        ...settings,
        [section]: {
          ...settings[section],
          [parentField]: {
            ...(settings[section] as any)[parentField],
            [childField]: value
          }
        }
      });
    } else {
      // Handle top-level fields
      setSettings({
        ...settings,
        [section]: {
          ...settings[section],
          [field]: value
        }
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    
    // Simulate API call
    setTimeout(() => {
      setSaveSuccess(true);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(null);
      }, 3000);
    }, 800);
  };
  
  // Render tabs menu
  const renderTabMenu = () => {
    const tabs = [
      { id: 'profile', icon: <FaUser />, label: 'Profile' },
      { id: 'preferences', icon: <FaCog />, label: 'Preferences' },
      { id: 'security', icon: <FaShieldAlt />, label: 'Security' },
      { id: 'wallet', icon: <FaWallet />, label: 'Wallet' },
    ];
    
    return (
      <div style={{ 
        marginBottom: '1.5rem',
        display: 'flex',
        borderBottom: '1px solid #e5e7eb'
      }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            style={{ 
              padding: '1rem 1.5rem',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'transparent',
              color: activeTab === tab.id ? '#FF2020' : '#6b7280',
              border: 'none',
              borderBottom: `2px solid ${activeTab === tab.id ? '#FF2020' : 'transparent'}`,
              fontWeight: activeTab === tab.id ? '600' : '500',
              transition: 'all 0.2s',
              cursor: 'pointer'
            }}
          >
            <span style={{ marginRight: '0.5rem' }}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>
    );
  };
  
  // Render profile settings
  const renderProfileSettings = () => {
    return (
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Profile Settings</h2>
        
        <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ 
            width: '8rem',
            height: '8rem',
            borderRadius: '9999px',
            overflow: 'hidden',
            backgroundColor: '#f3f4f6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2rem',
            color: '#9ca3af',
            border: '1px solid #e5e7eb'
          }}>
            {settings.profile.profileImage ? (
              <img 
                src={settings.profile.profileImage} 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <FaUser />
            )}
          </div>
          
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Username
              </label>
              <input 
                type="text" 
                value={settings.profile.username} 
                onChange={(e) => handleChange('profile', 'username', e.target.value)}
                disabled={!isEditing}
                style={{ 
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #e5e7eb',
                  backgroundColor: isEditing ? 'white' : '#f9fafb',
                  cursor: isEditing ? 'text' : 'default'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Email Address
              </label>
              <input 
                type="email" 
                value={settings.profile.email} 
                onChange={(e) => handleChange('profile', 'email', e.target.value)}
                disabled={!isEditing}
                style={{ 
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #e5e7eb',
                  backgroundColor: isEditing ? 'white' : '#f9fafb',
                  cursor: isEditing ? 'text' : 'default'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                Profile Image URL
              </label>
              <input 
                type="text" 
                value={settings.profile.profileImage || ''} 
                onChange={(e) => handleChange('profile', 'profileImage', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter image URL"
                style={{ 
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  border: '1px solid #e5e7eb',
                  backgroundColor: isEditing ? 'white' : '#f9fafb',
                  cursor: isEditing ? 'text' : 'default'
                }}
              />
            </div>
          </div>
        </div>
        
        <div style={{ 
          padding: '1rem', 
          backgroundColor: 'rgba(255, 32, 32, 0.05)', 
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.5rem', color: '#FF2020' }}>
            Data Privacy
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1rem' }}>
            Your personal data is stored securely and never shared with third parties without your explicit consent.
            You can request a full export of your data or account deletion at any time.
          </p>
          <button 
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'white',
              color: '#FF2020',
              border: '1px solid #FF2020',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Request Data Export
          </button>
        </div>
      </div>
    );
  };
  
  // Render preferences settings
  const renderPreferencesSettings = () => {
    return (
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Preferences</h2>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Appearance</h3>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
              Theme
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button 
                onClick={() => isEditing && handleChange('preferences', 'theme', 'light')}
                style={{ 
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: settings.preferences.theme === 'light' ? 'rgba(255, 32, 32, 0.1)' : 'white',
                  color: settings.preferences.theme === 'light' ? '#FF2020' : '#6b7280',
                  border: settings.preferences.theme === 'light' ? '1px solid #FF2020' : '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  fontWeight: settings.preferences.theme === 'light' ? '600' : '500',
                  cursor: isEditing ? 'pointer' : 'default',
                  opacity: isEditing ? 1 : 0.8
                }}
              >
                <FaSun style={{ marginRight: '0.5rem' }} />
                Light
              </button>
              <button 
                onClick={() => isEditing && handleChange('preferences', 'theme', 'dark')}
                style={{ 
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: settings.preferences.theme === 'dark' ? 'rgba(255, 32, 32, 0.1)' : 'white',
                  color: settings.preferences.theme === 'dark' ? '#FF2020' : '#6b7280',
                  border: settings.preferences.theme === 'dark' ? '1px solid #FF2020' : '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  fontWeight: settings.preferences.theme === 'dark' ? '600' : '500',
                  cursor: isEditing ? 'pointer' : 'default',
                  opacity: isEditing ? 1 : 0.8
                }}
              >
                <FaMoon style={{ marginRight: '0.5rem' }} />
                Dark
              </button>
              <button 
                onClick={() => isEditing && handleChange('preferences', 'theme', 'system')}
                style={{ 
                  padding: '0.75rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  backgroundColor: settings.preferences.theme === 'system' ? 'rgba(255, 32, 32, 0.1)' : 'white',
                  color: settings.preferences.theme === 'system' ? '#FF2020' : '#6b7280',
                  border: settings.preferences.theme === 'system' ? '1px solid #FF2020' : '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  fontWeight: settings.preferences.theme === 'system' ? '600' : '500',
                  cursor: isEditing ? 'pointer' : 'default',
                  opacity: isEditing ? 1 : 0.8
                }}
              >
                System Default
              </button>
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <FaBell style={{ marginRight: '0.5rem', color: '#FF2020' }} />
            Notification Preferences
          </h3>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { id: 'priceAlerts', label: 'Price Alerts' },
              { id: 'tradeExecutions', label: 'Trade Executions' },
              { id: 'systemUpdates', label: 'System Updates' },
              { id: 'strategyUpdates', label: 'Strategy Updates' },
              { id: 'newsletterEmails', label: 'Newsletter Emails' }
            ].map((item) => (
              <label 
                key={item.id} 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  cursor: isEditing ? 'pointer' : 'default'
                }}
              >
                <input 
                  type="checkbox" 
                  checked={(settings.preferences.notifications as any)[item.id]} 
                  onChange={(e) => handleChange('preferences', `notifications.${item.id}`, e.target.checked)}
                  disabled={!isEditing}
                  style={{ marginRight: '0.75rem', cursor: isEditing ? 'pointer' : 'default' }}
                />
                <span>{item.label}</span>
              </label>
            ))}
          </div>
        </div>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            Trading Preferences
          </h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: isEditing ? 'pointer' : 'default' }}>
              <input 
                type="checkbox" 
                checked={settings.preferences.trading.confirmBeforeTrade} 
                onChange={(e) => handleChange('preferences', 'trading.confirmBeforeTrade', e.target.checked)}
                disabled={!isEditing}
                style={{ marginRight: '0.75rem', cursor: isEditing ? 'pointer' : 'default' }}
              />
              <span>Confirm before executing trades</span>
            </label>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
              Maximum Transaction Value (USDC)
            </label>
            <input 
              type="number" 
              value={settings.preferences.trading.maxTransactionValue} 
              onChange={(e) => handleChange('preferences', 'trading.maxTransactionValue', parseFloat(e.target.value))}
              disabled={!isEditing}
              style={{ 
                width: '100%',
                maxWidth: '15rem',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid #e5e7eb',
                backgroundColor: isEditing ? 'white' : '#f9fafb',
                cursor: isEditing ? 'text' : 'default'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
              Slippage Tolerance (%)
            </label>
            <input 
              type="number" 
              min="0.1"
              max="5"
              step="0.1"
              value={settings.preferences.trading.slippageTolerance} 
              onChange={(e) => handleChange('preferences', 'trading.slippageTolerance', parseFloat(e.target.value))}
              disabled={!isEditing}
              style={{ 
                width: '100%',
                maxWidth: '15rem',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid #e5e7eb',
                backgroundColor: isEditing ? 'white' : '#f9fafb',
                cursor: isEditing ? 'text' : 'default'
              }}
            />
          </div>
        </div>
      </div>
    );
  };
  
  // Render security settings
  const renderSecuritySettings = () => {
    return (
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Security Settings</h2>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <FaKey style={{ marginRight: '0.5rem', color: '#FF2020' }} />
            Account Security
          </h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <p style={{ marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: '500' }}>Password:</span> Last changed {new Date(settings.security.lastPasswordChange).toLocaleDateString()}
            </p>
            <button
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                color: '#4b5563',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              Change Password
            </button>
          </div>
          
          <div style={{ 
            padding: '1.25rem',
            backgroundColor: settings.security.twoFactorEnabled ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 32, 32, 0.05)',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Two-Factor Authentication</h4>
              <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                {settings.security.twoFactorEnabled 
                  ? 'Your account is protected with two-factor authentication.' 
                  : 'Protect your account with an additional layer of security.'}
              </p>
            </div>
            <button
              onClick={() => isEditing && handleChange('security', 'twoFactorEnabled', !settings.security.twoFactorEnabled)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: settings.security.twoFactorEnabled ? 'white' : '#FF2020',
                color: settings.security.twoFactorEnabled ? '#4b5563' : 'white',
                border: settings.security.twoFactorEnabled ? '1px solid #e5e7eb' : 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: isEditing ? 'pointer' : 'default',
                opacity: isEditing ? 1 : 0.8
              }}
            >
              {settings.security.twoFactorEnabled ? 'Disable' : 'Enable'}
            </button>
          </div>
        </div>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            API Access
          </h3>
          
          <div style={{ 
            padding: '1.25rem',
            backgroundColor: settings.security.apiKeysEnabled ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255, 32, 32, 0.05)',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>API Keys</h4>
              <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>
                {settings.security.apiKeysEnabled 
                  ? 'API access is enabled for this account.' 
                  : 'Enable API access to integrate with external tools and services.'}
              </p>
            </div>
            <button
              onClick={() => isEditing && handleChange('security', 'apiKeysEnabled', !settings.security.apiKeysEnabled)}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: settings.security.apiKeysEnabled ? 'white' : '#FF2020',
                color: settings.security.apiKeysEnabled ? '#4b5563' : 'white',
                border: settings.security.apiKeysEnabled ? '1px solid #e5e7eb' : 'none',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: isEditing ? 'pointer' : 'default',
                opacity: isEditing ? 1 : 0.8
              }}
            >
              {settings.security.apiKeysEnabled ? 'Manage Keys' : 'Enable API'}
            </button>
          </div>
          
          <div style={{ 
            padding: '1rem', 
            backgroundColor: 'rgba(245, 158, 11, 0.1)', 
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
          }}>
            <FaExclamationTriangle style={{ color: '#f59e0b', marginTop: '0.25rem' }} />
            <div>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#f59e0b', marginBottom: '0.25rem' }}>
                Security Warning
              </h4>
              <p style={{ fontSize: '0.75rem', color: '#4b5563' }}>
                Never share your API keys or credentials with anyone. Vector Tools staff will never ask for your API keys.
                Suspicious activity? Contact support immediately.
              </p>
            </div>
          </div>
        </div>
        
        <div style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#ef4444' }}>
            Danger Zone
          </h3>
          
          <div style={{ 
            padding: '1.25rem',
            backgroundColor: 'rgba(239, 68, 68, 0.05)',
            borderRadius: '0.5rem',
            border: '1px solid rgba(239, 68, 68, 0.2)',
          }}>
            <h4 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Delete Account</h4>
            <p style={{ fontSize: '0.875rem', color: '#4b5563', marginBottom: '1rem' }}>
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
            <button
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                color: '#ef4444',
                border: '1px solid #ef4444',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <FaTrash style={{ marginRight: '0.5rem' }} />
              Delete Account
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  // Render wallet settings
  const renderWalletSettings = () => {
    return (
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Wallet Settings</h2>
        
        <div style={{ 
          padding: '1.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          borderRadius: '0.75rem',
          border: '1px solid #f3f4f6',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', display: 'flex', alignItems: 'center' }}>
            <FaWallet style={{ marginRight: '0.5rem', color: '#FF2020' }} />
            Connected Wallets
          </h3>
          
          <div style={{ 
            padding: '1rem',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '0.5rem',
            border: '1px solid #f3f4f6',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png" 
                alt="Phantom" 
                style={{ width: '2rem', height: '2rem', marginRight: '1rem' }}
              />
              <div>
                <div style={{ fontWeight: '500' }}>Phantom Wallet</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280', fontFamily: 'monospace' }}>7xKX...wZ9a</div>
              </div>
            </div>
            <div>
              <button
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  color: '#6b7280',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  cursor: 'pointer'
                }}
              >
                Disconnect
              </button>
            </div>
          </div>
          
          <button
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#FF2020',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <FaWallet style={{ marginRight: '0.5rem' }} />
            Connect Another Wallet
          </button>
        </div>
        
        <div style={{ 
          padding: '1.5rem',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          borderRadius: '0.75rem',
          border: '1px solid #f3f4f6',
          marginBottom: '2rem'
        }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>
            Transaction Settings
          </h3>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
              Gas Priority
            </label>
            <select
              disabled={!isEditing}
              style={{ 
                width: '100%',
                maxWidth: '15rem',
                padding: '0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid #e5e7eb',
                backgroundColor: isEditing ? 'white' : '#f9fafb',
                cursor: isEditing ? 'pointer' : 'default'
              }}
            >
              <option value="standard">Standard</option>
              <option value="fast">Fast</option>
              <option value="urgent">Urgent</option>
            </select>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.5rem' }}>
              Higher priority means faster transactions but higher fees
            </p>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: isEditing ? 'pointer' : 'default' }}>
              <input 
                type="checkbox" 
                checked={true} 
                disabled={!isEditing}
                style={{ marginRight: '0.75rem', cursor: isEditing ? 'pointer' : 'default' }}
              />
              <span>Auto-wrap SOL when needed</span>
            </label>
          </div>
        </div>
      </div>
    );
  };
  
  // Render active tab content
  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileSettings();
      case 'preferences':
        return renderPreferencesSettings();
      case 'security':
        return renderSecuritySettings();
      case 'wallet':
        return renderWalletSettings();
      default:
        return renderProfileSettings();
    }
  };
  
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Settings</h1>
            <p style={{ color: '#6b7280' }}>
              Manage your account, preferences, and security settings
            </p>
          </div>
          
          <div>
            {isEditing ? (
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button
                  onClick={() => setIsEditing(false)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'white',
                    color: '#6b7280',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#FF2020',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <FaSave style={{ marginRight: '0.5rem' }} />
                  Save Changes
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#FF2020',
                  color: 'white',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <FaCog style={{ marginRight: '0.5rem' }} />
                Edit Settings
              </button>
            )}
          </div>
        </div>
        
        {/* Success message */}
        {saveSuccess !== null && (
          <div style={{ 
            padding: '1rem', 
            backgroundColor: saveSuccess ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
            color: saveSuccess ? '#10b981' : '#ef4444',
            borderRadius: '0.5rem',
            marginBottom: '1.5rem'
          }}>
            {saveSuccess ? 'Settings saved successfully.' : 'Failed to save settings. Please try again.'}
          </div>
        )}
        
        <div style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(8px)',
          borderRadius: '0.75rem',
          border: '1px solid #f3f4f6'
        }}>
          {/* Tab Menu */}
          {renderTabMenu()}
          
          {/* Tab Content */}
          <div style={{ padding: '1.5rem' }}>
            {renderActiveTabContent()}
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default SettingsPage; 