'use client'

import React, { useRef, useEffect, useState, ReactNode } from 'react';
import gsap from 'gsap';

// Animated Button Component
interface AnimatedButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  disabled?: boolean;
  icon?: ReactNode;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  children,
  onClick,
  className = '',
  variant = 'primary',
  disabled = false,
  icon
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  // Define variant styles
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'primary':
        return 'bg-red-600 text-white hover:bg-red-700 transition-all shadow-lg hover:shadow-red-500/20';
      case 'secondary':
        return 'bg-white text-red-600 border border-red-500 hover:bg-red-50 transition-all';
      case 'outline':
        return 'bg-transparent text-red-600 border border-red-500 hover:bg-red-50 transition-all';
      default:
        return 'bg-red-600 text-white hover:bg-red-700 transition-all shadow-lg';
    }
  };
  
  // Handle hover animations
  useEffect(() => {
    if (!buttonRef.current || disabled) return;
    
    const button = buttonRef.current;
    const glow = glowRef.current;
    
    // Create animations
    const enterAnimation = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
      
      if (glow) {
        gsap.to(glow, {
          opacity: 0.8,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };
    
    const leaveAnimation = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      
      if (glow) {
        gsap.to(glow, {
          opacity: 0,
          duration: 0.4,
          ease: 'power2.out',
        });
      }
    };
    
    const clickAnimation = () => {
      gsap.timeline()
        .to(button, {
          scale: 0.95,
          duration: 0.1,
          ease: 'power2.out',
        })
        .to(button, {
          scale: 1.05,
          duration: 0.2,
          ease: 'back.out',
        })
        .to(button, {
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        });
    };
    
    // Add event listeners
    button.addEventListener('mouseenter', enterAnimation);
    button.addEventListener('mouseleave', leaveAnimation);
    button.addEventListener('click', clickAnimation);
    
    // Clean up
    return () => {
      button.removeEventListener('mouseenter', enterAnimation);
      button.removeEventListener('mouseleave', leaveAnimation);
      button.removeEventListener('click', clickAnimation);
    };
  }, [disabled]);
  
  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      disabled={disabled}
      className={`relative flex items-center justify-center px-6 py-3 rounded-lg font-medium text-sm transition-all ${getVariantClasses()} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <div 
        ref={glowRef} 
        className="absolute inset-0 rounded-lg bg-red-500 opacity-0 blur-xl -z-10"
      />
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

// Animated Card Component
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  className = '',
  hover = true,
  onClick
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [perspective, setPerspective] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    if (!cardRef.current || !hover) return;
    
    const card = cardRef.current;
    
    // Hover effect with 3D transformation
    const handleMouseMove = (e: MouseEvent) => {
      if (!card) return;
      
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Calculate rotation based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Limit the rotation to a small amount (5 degrees)
      const rotateY = ((x - centerX) / centerX) * 5;
      const rotateX = ((centerY - y) / centerY) * 5;
      
      setPerspective({ x: rotateX, y: rotateY });
    };
    
    const handleMouseEnter = () => {
      setIsHovering(true);
      
      gsap.to(card, {
        y: -10,
        duration: 0.3,
        ease: 'power2.out',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      });
    };
    
    const handleMouseLeave = () => {
      setIsHovering(false);
      setPerspective({ x: 0, y: 0 });
      
      gsap.to(card, {
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power3.out',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
      });
    };
    
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);
    card.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, [hover]);
  
  // Apply 3D perspective when hovering
  useEffect(() => {
    if (!cardRef.current || !isHovering || !hover) return;
    
    const card = cardRef.current;
    
    gsap.to(card, {
      rotateX: perspective.x,
      rotateY: perspective.y,
      duration: 0.5,
      ease: 'power2.out'
    });
  }, [perspective, isHovering, hover]);
  
  return (
    <div
      ref={cardRef}
      onClick={onClick}
      className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md transition-all ${className} ${onClick ? 'cursor-pointer' : ''}`}
      style={{ 
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px)`
      }}
    >
      <div style={{ transform: 'translateZ(10px)' }}>
        {children}
      </div>
    </div>
  );
};

// Animated Text Component
interface AnimatedTextProps {
  children: string;
  className?: string;
  variant?: 'heading' | 'gradient' | 'glow';
  animateOnView?: boolean;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  className = '',
  variant = 'heading',
  animateOnView = true
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  
  const getVariantClasses = (): string => {
    switch (variant) {
      case 'heading':
        return 'text-3xl md:text-4xl font-bold';
      case 'gradient':
        return 'text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-600';
      case 'glow':
        return 'text-3xl md:text-4xl font-bold text-red-500 drop-shadow-lg';
      default:
        return 'text-3xl font-bold';
    }
  };
  
  useEffect(() => {
    if (!textRef.current || !animateOnView || hasAnimated.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        
        if (entry.isIntersecting) {
          // Create animated text by splitting into characters
          const text = textRef.current;
          if (!text) return;
          
          const content = text.innerHTML;
          const chars = content.split('');
          
          text.innerHTML = '';
          chars.forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.display = 'inline-block';
            text.appendChild(span);
            
            gsap.to(span, {
              opacity: 1,
              y: 0,
              duration: 0.3,
              delay: i * 0.03,
              ease: 'power3.out'
            });
          });
          
          hasAnimated.current = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    observer.observe(textRef.current);
    
    return () => {
      observer.disconnect();
    };
  }, [animateOnView, children]);
  
  return (
    <div 
      ref={textRef}
      className={`${getVariantClasses()} ${className}`}
    >
      {children}
    </div>
  );
};

// Animated Data Display Component for trading data
interface AnimatedDataDisplayProps {
  value: string | number;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
  icon?: ReactNode;
}

export const AnimatedDataDisplay: React.FC<AnimatedDataDisplayProps> = ({
  value,
  label,
  trend = 'neutral',
  className = '',
  icon
}) => {
  const valueRef = useRef<HTMLDivElement>(null);
  const [prevValue, setPrevValue] = useState(value);
  
  // Handle value animation when it changes
  useEffect(() => {
    if (!valueRef.current || prevValue === value) return;
    
    const valueElement = valueRef.current;
    
    // Animation for when value changes
    gsap.fromTo(
      valueElement,
      { 
        y: -20, 
        opacity: 0,
        color: trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : ''
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out',
        onComplete: () => {
          gsap.to(valueElement, {
            color: trend === 'up' ? '#10b981' : trend === 'down' ? '#ef4444' : '',
            duration: 1.5
          });
        }
      }
    );
    
    setPrevValue(value);
  }, [value, trend, prevValue]);
  
  const getTrendColor = (): string => {
    switch (trend) {
      case 'up':
        return 'text-green-500';
      case 'down':
        return 'text-red-500';
      default:
        return 'text-gray-700 dark:text-gray-300';
    }
  };
  
  return (
    <div className={`bg-white dark:bg-gray-800 p-4 rounded-lg ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
        {icon && <span className="text-red-500">{icon}</span>}
      </div>
      <div 
        ref={valueRef} 
        className={`text-2xl font-bold ${getTrendColor()}`}
      >
        {value}
      </div>
    </div>
  );
};

// Export all
export default {
  AnimatedButton,
  AnimatedCard,
  AnimatedText,
  AnimatedDataDisplay
}; 