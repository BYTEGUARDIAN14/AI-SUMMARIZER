import React from 'react';
import { FileText, X } from 'lucide-react';

const FilePreviewBadge = ({ file, onRemove }) => {
  if (!file) return null;

  // Format size to KB or MB
  const formatSize = (bytes) => {
    if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + ' KB';
    }
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // Truncate name if too long
  const truncateName = (name) => {
    if (name.length > 30) {
      return name.substring(0, 27) + '...';
    }
    return name;
  };

  return (
    <div className="glass-card fade-in-slide-up-fast" style={{
      display: 'inline-flex',
      alignItems: 'center',
      padding: '8px 16px',
      gap: '12px',
      borderRadius: '30px', /* pill shape */
      marginTop: '1rem',
      position: 'relative',
      zIndex: 10
    }}>
      <FileText size={18} color="var(--accent-gold)" />
      
      <span style={{ color: 'var(--text-primary)', fontSize: '0.9rem', fontWeight: 500 }}>
        {truncateName(file.name)}
      </span>
      
      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
        {formatSize(file.size)}
      </span>
      
      <button 
        onClick={onRemove}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-secondary)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4px',
          marginLeft: '8px',
          transition: 'color 0.2s',
        }}
        onMouseOver={(e) => e.currentTarget.style.color = 'var(--error)'}
        onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default FilePreviewBadge;
