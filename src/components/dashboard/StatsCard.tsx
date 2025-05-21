import React from 'react';
import { FaSpinner } from 'react-icons/fa';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  loading?: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, subtitle, loading = false }) => {
  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      padding: '1.25rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }}
    >
      <div style={{ marginBottom: '0.5rem', fontSize: '0.875rem', color: '#6b7280', fontWeight: '500' }}>
        {title}
      </div>
      <div style={{ marginBottom: '0.25rem', fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', display: 'flex', alignItems: 'center' }}>
        {loading ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FaSpinner style={{ animation: 'spin 1s linear infinite', marginRight: '0.5rem' }} />
            <span>Loading...</span>
          </div>
        ) : (
          value
        )}
      </div>
      <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
        {subtitle}
      </div>
    </div>
  );
};

export default StatsCard; 