import React from 'react';
import { Loader2 } from 'lucide-react';

const SummarizeButton = ({ onClick, isLoading, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      style={{
        width: '100%',
        padding: '14px 24px',
        marginTop: '1.5rem',
        background: 'linear-gradient(135deg, var(--accent-gold), #e8920f)',
        color: '#0a0a0f',
        border: 'none',
        borderRadius: '12px',
        fontSize: '1.05rem',
        fontWeight: 600,
        fontFamily: "'Space Grotesk', sans-serif",
        cursor: (disabled || isLoading) ? 'not-allowed' : 'pointer',
        opacity: (disabled || isLoading) ? 0.4 : 1,
        transition: 'all 0.2s ease',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '12px',
        position: 'relative',
        zIndex: 10,
        boxShadow: (disabled || isLoading) ? 'none' : '0 4px 14px rgba(245, 166, 35, 0.2)'
      }}
      onMouseOver={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.boxShadow = '0 8px 32px var(--accent-gold-glow)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseOut={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.boxShadow = '0 4px 14px rgba(245, 166, 35, 0.2)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {isLoading ? (
        <>
          <Loader2 className="spin" size={20} />
          Analyzing document…
        </>
      ) : (
        'Summarize Document'
      )}
    </button>
  );
};

export default SummarizeButton;
