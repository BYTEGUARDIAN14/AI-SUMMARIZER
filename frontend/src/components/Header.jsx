import React from 'react';

const Header = () => {
  return (
    <header style={{ textAlign: 'center', paddingTop: '3rem', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
      <h1 style={{ 
        fontFamily: "'Space Grotesk', sans-serif", 
        fontWeight: 700, 
        fontSize: '2.8rem', 
        color: 'var(--text-primary)',
        margin: 0,
        letterSpacing: '-0.02em'
      }}>
        Summar<span style={{ color: 'var(--accent-gold)' }}>AI</span>
      </h1>
      
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 300,
        color: 'var(--text-secondary)',
        fontSize: '1rem',
        marginTop: '0.5rem',
        marginBottom: '1.5rem'
      }}>
        Drop a document. Get the essence.
      </p>
      
      <div style={{
        height: '1px',
        width: '80px',
        margin: '0 auto',
        backgroundColor: 'var(--accent-gold-soft)'
      }} />
    </header>
  );
};

export default Header;
