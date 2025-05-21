import React from 'react';
import { IconType } from 'react-icons';

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  bgColor: string;
  textColor: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, label, bgColor, textColor }) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 0.75rem',
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: '0.5rem',
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: '500',
        transition: 'transform 0.2s ease-in-out',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 2px rgba(0, 0, 0, 0.05)';
      }}
    >
      <span style={{ marginRight: '0.375rem', display: 'flex', alignItems: 'center' }}>
        {icon}
      </span>
      {label}
    </a>
  );
};

export default SocialLink; 