import React, { useState } from 'react';
import BackgroundOrbs from './components/BackgroundOrbs';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import FilePreviewBadge from './components/FilePreviewBadge';
import SummarizeButton from './components/SummarizeButton';
import StatusMessage from './components/StatusMessage';
import SummaryResult from './components/SummaryResult';
import { summarizeDocument } from './api/summarize';
import './styles/global.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: null, message: null });
  const [summary, setSummary] = useState(null);

  const handleFileSelected = (file, errorMsg = null) => {
    if (errorMsg) {
      setStatus({ type: 'error', message: errorMsg });
      setSelectedFile(null);
      setSummary(null);
      return;
    }
    
    setSelectedFile(file);
    setStatus({ type: null, message: null });
    setSummary(null); // Clear previous summary
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setStatus({ type: null, message: null });
    setSummary(null);
  };

  const clearStatus = () => {
    setStatus({ type: null, message: null });
  };

  const handleSummarize = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setStatus({ type: null, message: null });

    try {
      const result = await summarizeDocument(selectedFile);
      setSummary(result);
      setStatus({ type: 'success', message: 'Document summarized successfully!' });
      
      // Auto-hide success message after a bit to focus on the result
      setTimeout(() => clearStatus(), 3000);
    } catch (error) {
      console.error(error);
      setStatus({ type: 'error', message: error.message || 'An unexpected error occurred during summarization.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <BackgroundOrbs />
      
      <main style={{
        maxWidth: '860px',
        margin: '0 auto',
        padding: '0 24px 60px',
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <Header />
        
        <div style={{ width: '100%', maxWidth: '640px' }}>
          <UploadZone 
            onFileSelected={handleFileSelected} 
            disabled={isLoading}
          />
          
          <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
            <FilePreviewBadge 
              file={selectedFile} 
              onRemove={handleRemoveFile} 
            />
          </div>
          
          <SummarizeButton 
            onClick={handleSummarize} 
            isLoading={isLoading} 
            disabled={!selectedFile} 
          />
          
          <StatusMessage 
            type={status.type} 
            message={status.message} 
            onDismiss={clearStatus} 
          />
        </div>

        {summary && (
          <div style={{ width: '100%', marginTop: '1rem' }}>
            <SummaryResult text={summary} />
          </div>
        )}
      </main>
    </>
  );
}

export default App;
