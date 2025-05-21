'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/dashboard/DashboardLayout'
import { FaBell, FaExclamationCircle, FaInfoCircle, FaCheckCircle, FaTimesCircle, FaFilter, FaCog, FaTrash, FaRegClock } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'

// Notification types
type NotificationType = 'alert' | 'info' | 'success' | 'error';
type NotificationCategory = 'price' | 'trade' | 'strategy' | 'wallet' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: 'notif001',
    type: 'alert',
    category: 'price',
    title: 'SOL Price Alert',
    message: 'SOL has exceeded your price alert threshold of $250.00 and is now trading at $253.42.',
    timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
    isRead: false,
    actionUrl: '/dashboard'
  },
  {
    id: 'notif002',
    type: 'success',
    category: 'trade',
    title: 'Trade Executed Successfully',
    message: 'Your limit buy order for 2.5 SOL at $245.23 was executed successfully.',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    isRead: false
  },
  {
    id: 'notif003',
    type: 'info',
    category: 'strategy',
    title: 'Strategy Update',
    message: '"SOL Momentum" strategy has performed 3 trades today with a net profit of $42.15.',
    timestamp: new Date(Date.now() - 5 * 3600000).toISOString(),
    isRead: true,
    actionUrl: '/dashboard/strategies'
  },
  {
    id: 'notif004',
    type: 'error',
    category: 'system',
    title: 'API Connection Issue',
    message: 'The system encountered a temporary issue connecting to the price data API. This may affect real-time price alerts.',
    timestamp: new Date(Date.now() - 12 * 3600000).toISOString(),
    isRead: true
  },
  {
    id: 'notif005',
    type: 'alert',
    category: 'wallet',
    title: 'Low Balance Warning',
    message: 'Your USDC balance is below 50 USDC, which may prevent some automated strategies from executing trades.',
    timestamp: new Date(Date.now() - 1 * 86400000).toISOString(),
    isRead: false
  },
  {
    id: 'notif006',
    type: 'success',
    category: 'system',
    title: 'System Update Completed',
    message: 'Vector Tools has been updated to version 1.5.2. New features include enhanced chart tools and improved strategy backtesting.',
    timestamp: new Date(Date.now() - 2 * 86400000).toISOString(),
    isRead: true
  },
  {
    id: 'notif007',
    type: 'info',
    category: 'price',
    title: 'Market Analysis',
    message: 'Our AI has detected a potential bullish trend for JUP based on recent on-chain activity and social sentiment.',
    timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
    isRead: true
  }
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [selectedType, setSelectedType] = useState<NotificationType | 'all'>('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // Filter notifications based on selected filters
  const filteredNotifications = notifications.filter(notification => {
    if (selectedType !== 'all' && notification.type !== selectedType) return false;
    if (showUnreadOnly && notification.isRead) return false;
    return true;
  });
  
  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, isRead: true } : notification
    ));
  };
  
  // Mark all as read
  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({ ...notification, isRead: true })));
  };
  
  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };
  
  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  
  // Get the icon based on notification type
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'alert':
        return <FaExclamationCircle />;
      case 'info':
        return <FaInfoCircle />;
      case 'success':
        return <FaCheckCircle />;
      case 'error':
        return <FaTimesCircle />;
      default:
        return <FaBell />;
    }
  };
  
  // Get color based on notification type
  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'alert':
        return '#f59e0b'; // amber
      case 'info':
        return '#3b82f6'; // blue
      case 'success':
        return '#10b981'; // green
      case 'error':
        return '#ef4444'; // red
      default:
        return '#6b7280'; // gray
    }
  };
  
  // Format relative time
  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const notifTime = new Date(timestamp);
    const diffMs = now.getTime() - notifTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };
  
  // Count unread notifications
  const unreadCount = notifications.filter(notification => !notification.isRead).length;
  
  return (
    <DashboardLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
              Notifications
              {unreadCount > 0 && (
                <span style={{ 
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#FF2020',
                  color: 'white',
                  borderRadius: '9999px',
                  height: '1.75rem',
                  minWidth: '1.75rem',
                  fontSize: '1rem',
                  fontWeight: '500',
                  marginLeft: '0.75rem',
                  padding: '0 0.5rem'
                }}>
                  {unreadCount}
                </span>
              )}
            </h1>
            <p style={{ color: '#6b7280' }}>
              Trading alerts, system messages, and other important updates
            </p>
          </div>
          
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button
              onClick={() => setIsSettingsOpen(!isSettingsOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0.5rem',
                backgroundColor: 'transparent',
                color: '#6b7280',
                border: '1px solid #e5e7eb',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}
            >
              <FaCog />
            </button>
            
            {notifications.length > 0 && (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => markAllAsRead()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#FF2020',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontWeight: '500',
                    cursor: 'pointer'
                  }}
                >
                  Mark All as Read
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Filter Controls */}
        <div style={{ 
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaFilter style={{ color: '#6b7280', marginRight: '0.5rem' }} />
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>Filter by:</span>
          </div>
          
          <div style={{ 
            display: 'inline-flex',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(8px)',
            borderRadius: '0.5rem',
            padding: '0.25rem'
          }}>
            <button
              onClick={() => setSelectedType('all')}
              style={{
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: selectedType === 'all' ? '#FF2020' : 'transparent',
                color: selectedType === 'all' ? 'white' : '#6b7280',
                cursor: 'pointer'
              }}
            >
              All
            </button>
            <button
              onClick={() => setSelectedType('alert')}
              style={{
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: selectedType === 'alert' ? '#FF2020' : 'transparent',
                color: selectedType === 'alert' ? 'white' : '#6b7280',
                cursor: 'pointer'
              }}
            >
              Alerts
            </button>
            <button
              onClick={() => setSelectedType('success')}
              style={{
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: selectedType === 'success' ? '#FF2020' : 'transparent',
                color: selectedType === 'success' ? 'white' : '#6b7280',
                cursor: 'pointer'
              }}
            >
              Success
            </button>
            <button
              onClick={() => setSelectedType('error')}
              style={{
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: selectedType === 'error' ? '#FF2020' : 'transparent',
                color: selectedType === 'error' ? 'white' : '#6b7280',
                cursor: 'pointer'
              }}
            >
              Errors
            </button>
            <button
              onClick={() => setSelectedType('info')}
              style={{
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                border: 'none',
                backgroundColor: selectedType === 'info' ? '#FF2020' : 'transparent',
                color: selectedType === 'info' ? 'white' : '#6b7280',
                cursor: 'pointer'
              }}
            >
              Info
            </button>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            marginLeft: 'auto'
          }}>
            <label style={{ 
              display: 'flex', 
              alignItems: 'center',
              fontSize: '0.875rem',
              color: '#6b7280',
              cursor: 'pointer'
            }}>
              <input 
                type="checkbox" 
                checked={showUnreadOnly} 
                onChange={() => setShowUnreadOnly(!showUnreadOnly)} 
                style={{ marginRight: '0.5rem' }}
              />
              Show unread only
            </label>
          </div>
        </div>
        
        {/* Settings Panel */}
        <AnimatePresence>
          {isSettingsOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              style={{ 
                marginBottom: '1.5rem',
                overflow: 'hidden'
              }}
            >
              <div style={{ 
                padding: '1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(8px)',
                borderRadius: '0.75rem',
                border: '1px solid #f3f4f6'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Notification Settings</h2>
                  <button
                    onClick={() => setIsSettingsOpen(false)}
                    style={{
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#6b7280',
                      cursor: 'pointer',
                      fontSize: '1.25rem',
                      lineHeight: 1
                    }}
                  >
                    ×
                  </button>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>
                    Notification Categories
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
                    {(['price', 'trade', 'strategy', 'wallet', 'system'] as NotificationCategory[]).map(category => (
                      <label key={category} style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        fontSize: '0.875rem',
                        color: '#4b5563',
                        cursor: 'pointer'
                      }}>
                        <input 
                          type="checkbox" 
                          defaultChecked={true} 
                          style={{ marginRight: '0.5rem' }}
                        />
                        {category.charAt(0).toUpperCase() + category.slice(1)} Notifications
                      </label>
                    ))}
                  </div>
                </div>
                
                <div style={{ marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '500', marginBottom: '1rem' }}>
                    Delivery Preferences
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '0.75rem' }}>
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      fontSize: '0.875rem',
                      color: '#4b5563',
                      cursor: 'pointer'
                    }}>
                      <input 
                        type="checkbox" 
                        defaultChecked={true} 
                        style={{ marginRight: '0.5rem' }}
                      />
                      In-App Notifications
                    </label>
                    
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      fontSize: '0.875rem',
                      color: '#4b5563',
                      cursor: 'pointer'
                    }}>
                      <input 
                        type="checkbox" 
                        defaultChecked={false} 
                        style={{ marginRight: '0.5rem' }}
                      />
                      Email Alerts
                    </label>
                    
                    <label style={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      fontSize: '0.875rem',
                      color: '#4b5563',
                      cursor: 'pointer'
                    }}>
                      <input 
                        type="checkbox" 
                        defaultChecked={false} 
                        style={{ marginRight: '0.5rem' }}
                      />
                      Browser Push Notifications
                    </label>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    onClick={() => clearAllNotifications()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0.5rem 1rem',
                      backgroundColor: 'rgba(239, 68, 68, 0.1)',
                      color: '#ef4444',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      cursor: 'pointer'
                    }}
                  >
                    <FaTrash style={{ marginRight: '0.5rem' }} />
                    Clear All Notifications
                  </button>
                  
                  <button
                    style={{
                      padding: '0.5rem 1rem',
                      backgroundColor: '#FF2020',
                      color: 'white',
                      border: 'none',
                      borderRadius: '0.375rem',
                      fontWeight: '500',
                      fontSize: '0.875rem',
                      cursor: 'pointer'
                    }}
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Notifications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredNotifications.length === 0 ? (
            <div style={{ 
              padding: '3rem 1.5rem',
              textAlign: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.7)',
              backdropFilter: 'blur(8px)',
              borderRadius: '0.75rem',
              border: '1px solid #f3f4f6'
            }}>
              <FaBell style={{ fontSize: '3rem', color: '#d1d5db', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
                No notifications
              </h3>
              <p style={{ color: '#6b7280', maxWidth: '400px', margin: '0 auto' }}>
                {showUnreadOnly 
                  ? "You don't have any unread notifications. Try changing your filter settings."
                  : "You don't have any notifications yet. They'll appear here when you receive price alerts, trade confirmations, or system updates."}
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {filteredNotifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ 
                    padding: '1.25rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '0.75rem',
                    border: '1px solid #f3f4f6',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    gap: '1rem',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(249, 250, 251, 0.8)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'}
                  onClick={() => {
                    if (!notification.isRead) {
                      markAsRead(notification.id);
                    }
                    if (notification.actionUrl) {
                      // In a real app, we would navigate to this URL
                      console.log(`Navigate to ${notification.actionUrl}`);
                    }
                  }}
                >
                  {/* Notification indicator/dot */}
                  {!notification.isRead && (
                    <div 
                      style={{ 
                        position: 'absolute',
                        top: '1.25rem',
                        right: '1.25rem',
                        width: '0.5rem',
                        height: '0.5rem',
                        borderRadius: '9999px',
                        backgroundColor: '#FF2020'
                      }}
                    />
                  )}
                  
                  {/* Icon */}
                  <div style={{ 
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '9999px',
                    backgroundColor: `${getNotificationColor(notification.type)}20`,
                    color: getNotificationColor(notification.type),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0
                  }}>
                    {getNotificationIcon(notification.type)}
                  </div>
                  
                  {/* Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'flex-start', 
                      marginBottom: '0.25rem' 
                    }}>
                      <h3 style={{ 
                        fontSize: '1rem', 
                        fontWeight: notification.isRead ? '500' : '600',
                        paddingRight: '1.5rem'
                      }}>
                        {notification.title}
                      </h3>
                      <div style={{ 
                        fontSize: '0.75rem', 
                        color: '#6b7280',
                        display: 'flex',
                        alignItems: 'center'
                      }}>
                        <FaRegClock style={{ marginRight: '0.25rem', fontSize: '0.7rem' }} />
                        {getRelativeTime(notification.timestamp)}
                      </div>
                    </div>
                    
                    <p style={{ 
                      color: '#4b5563', 
                      marginBottom: '0.5rem',
                      fontWeight: notification.isRead ? 'normal' : '500'
                    }}>
                      {notification.message}
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div style={{ 
                        fontSize: '0.75rem',
                        padding: '0.125rem 0.375rem',
                        backgroundColor: 'rgba(107, 114, 128, 0.1)',
                        color: '#6b7280',
                        borderRadius: '9999px',
                        textTransform: 'capitalize'
                      }}>
                        {notification.category}
                      </div>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteNotification(notification.id);
                        }}
                        style={{
                          padding: '0.25rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          color: '#6b7280',
                          cursor: 'pointer',
                          borderRadius: '0.25rem',
                          fontSize: '0.875rem',
                          opacity: 0.5
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = '0.5'}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default NotificationsPage; 