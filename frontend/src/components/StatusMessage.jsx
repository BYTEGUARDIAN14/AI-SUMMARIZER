import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

const StatusMessage = ({ type, message, onDismiss }) => {
  const isError = type === 'error';
  const color = isError ? 'var(--error)' : 'var(--success)';
  const bgColor = isError ? 'rgba(239, 68, 68, 0.08)' : 'rgba(34, 197, 94, 0.08)';
  const Icon = isError ? AlertCircle : CheckCircle2;

  // Auto-dismiss for errors after 5s if onDismiss is provided
  React.useEffect(() => {
    if (isError && onDismiss) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isError, onDismiss]);

  if (!message) return null;

  return (
    <div className="fade-in-slide-down" style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      background: bgColor,
      border: `1px solid ${color}40`,
      borderRadius: '12px',
      marginTop: '1rem',
      color: color,
      fontSize: '0.95rem',
      fontWeight: 500,
      width: '100%',
      position: 'relative',
      zIndex: 10
    }}>
      <Icon size={20} />
      <span style={{ flex: 1 }}>{message}</span>
      {isError && onDismiss && (
        <button 
          onClick={onDismiss}
          style={{
            background: 'none',
            border: 'none',
            color: color,
            cursor: 'pointer',
            opacity: 0.7,
            padding: '4px',
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = 1}
          onMouseOut={(e) => e.currentTarget.style.opacity = 0.7}
        >
          ×
        </button>
      )}
    </div>
  );
};

export default StatusMessage;
