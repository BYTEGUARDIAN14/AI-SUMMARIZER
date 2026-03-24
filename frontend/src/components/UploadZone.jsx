import React, { useRef, useState } from 'react';
import { UploadCloud, FileCheck, AlertCircle } from 'lucide-react';

const UploadZone = ({ onFileSelected, disabled }) => {
  const [dragState, setDragState] = useState('idle'); // idle, dragging-over, error, success
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (disabled) return;
    setDragState('dragging-over');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    if (disabled) return;
    setDragState('idle');
  };

  const validateFile = (file) => {
    if (!file) return false;
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    const validExtensions = ['.pdf', '.docx', '.txt'];
    const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();

    if (validTypes.includes(file.type) || validExtensions.includes(extension)) {
      return true;
    }
    return false;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (disabled) return;

    setDragState('idle');
    const droppedFile = e.dataTransfer.files[0];

    if (validateFile(droppedFile)) {
      setDragState('success');
      onFileSelected(droppedFile);
      // Reset after a brief moment to show success state
      setTimeout(() => setDragState('idle'), 1500);
    } else {
      setDragState('error');
      onFileSelected(null, "Invalid file format. Please upload PDF, DOCX, or TXT.");
      setTimeout(() => setDragState('idle'), 2000);
    }
  };

  const handleFileInput = (e) => {
    if (disabled) return;
    const selectedFile = e.target.files[0];

    if (validateFile(selectedFile)) {
      setDragState('success');
      onFileSelected(selectedFile);
      setTimeout(() => setDragState('idle'), 1500);
    } else if (selectedFile) {
      setDragState('error');
      onFileSelected(null, "Invalid file format. Please upload PDF, DOCX, or TXT.");
      setTimeout(() => setDragState('idle'), 2000);
    }
    // Clear input value so same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  let borderColor = 'dashed 1.5px var(--accent-gold)';
  let bgColor = 'var(--glass-bg)';
  let transform = 'scale(1)';
  let Icon = UploadCloud;
  let iconColor = 'var(--accent-gold)';

  if (dragState === 'dragging-over') {
    borderColor = 'solid 1.5px var(--accent-gold)';
    bgColor = 'var(--accent-gold-soft)';
    transform = 'scale(1.01)';
  } else if (dragState === 'success') {
    borderColor = 'solid 1.5px var(--success)';
    bgColor = 'rgba(34, 197, 94, 0.05)';
    Icon = FileCheck;
    iconColor = 'var(--success)';
  } else if (dragState === 'error') {
    borderColor = 'solid 1.5px var(--error)';
    bgColor = 'rgba(239, 68, 68, 0.05)';
    Icon = AlertCircle;
    iconColor = 'var(--error)';
  }

  const shakeClass = dragState === 'error' ? 'shake-animation' : '';

  return (
    <>
      <style>
        {`
          .shake-animation {
            animation: shake 0.4s ease-in-out;
          }
        `}
      </style>
      <div
        className={`glass-card ${shakeClass}`}
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          minHeight: '220px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: disabled ? 'not-allowed' : 'pointer',
          transition: 'all 0.25s ease',
          border: borderColor,
          background: bgColor,
          transform: transform,
          opacity: disabled ? 0.6 : 1,
          position: 'relative',
          zIndex: 10
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileInput}
          style={{ display: 'none' }}
          accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
        />

        <div style={{ marginBottom: '16px', transition: 'all 0.2s' }}>
          <Icon size={48} color={iconColor} strokeWidth={1.5} />
        </div>

        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 500,
          fontSize: '1.2rem',
          color: 'var(--text-primary)',
          marginBottom: '8px'
        }}>
          {dragState === 'success' ? 'File Accepted' :
            dragState === 'error' ? 'Invalid File' :
              'Drag & drop your document here'}
        </h3>

        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 400,
          color: 'var(--text-secondary)',
          fontSize: '0.95rem',
          marginBottom: '20px'
        }}>
          {dragState === 'success' ? 'Ready to summarize' : 'or click to browse'}
        </p>

        <div style={{
          padding: '4px 12px',
          borderRadius: '20px',
          border: '1px solid var(--glass-border)',
          background: 'rgba(255,255,255,0.02)',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          letterSpacing: '0.05em',
          fontWeight: 500
        }}>
          PDF &nbsp;•&nbsp; DOCX &nbsp;•&nbsp; TXT
        </div>
      </div>
    </>
  );
};

export default UploadZone;
