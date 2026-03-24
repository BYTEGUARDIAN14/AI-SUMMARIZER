import React from 'react';

const BackgroundOrbs = () => {
  return (
    <>
      <div 
        style={{
          position: 'fixed',
          top: '-10%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'var(--accent-gold)',
          opacity: 0.12,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div 
        style={{
          position: 'fixed',
          bottom: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: '#1e1b4b', // deep blue/indigo
          opacity: 0.08,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div 
        style={{
          position: 'fixed',
          top: '30%',
          right: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: '#4c1d95', // soft purple
          opacity: 0.06,
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </>
  );
};

export default BackgroundOrbs;
