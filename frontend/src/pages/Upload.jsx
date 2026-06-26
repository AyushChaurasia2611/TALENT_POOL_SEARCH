import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import { api } from '../api/client';

const MAX_FILES = 50;
const ACCEPTED_TYPES = {
  'application/pdf': ['.pdf'],
  'application/msword': ['.doc'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function Upload() {
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [jobStatus, setJobStatus] = useState(null);
  const [error, setError] = useState(null);
  const [done, setDone] = useState(false);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      setError(`${rejectedFiles.length} file(s) rejected — only PDF and Word documents are accepted.`);
    }
    setFiles((prev) => {
      const combined = [...prev, ...acceptedFiles];
      return combined.slice(0, MAX_FILES);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxFiles: MAX_FILES,
    maxSize: 10 * 1024 * 1024,
  });

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;
    setError(null);
    setUploading(true);
    setDone(false);

    try {
      const { jobId: newJobId } = await api.uploadResumes(files);
      setJobId(newJobId);
      setFiles([]);

      // Poll job status
      const pollInterval = setInterval(async () => {
        try {
          const status = await api.getJobStatus(newJobId);
          setJobStatus(status);

          if (status.status === 'done') {
            clearInterval(pollInterval);
            setUploading(false);
            setDone(true);
          }
        } catch (pollErr) {
          console.error('Polling error:', pollErr);
        }
      }, 1200);
    } catch (err) {
      setError(err.message);
      setUploading(false);
    }
  };

  const progress = jobStatus
    ? Math.round((jobStatus.processed / jobStatus.total) * 100)
    : 0;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Upload Resumes</h1>
        <p className="page-subtitle">
          Upload PDF or Word documents — we'll extract skills, experience, and contact info automatically.
        </p>
      </div>

      {error && (
        <div className="alert alert-error" role="alert">
          ⚠️ {error}
        </div>
      )}

      {done && (
        <div className="alert alert-success" role="status">
          ✅ Processing complete! {jobStatus?.results?.length || 0} resumes added to your talent pool.{' '}
          <button
            onClick={() => navigate('/search')}
            style={{ background: 'none', border: 'none', color: 'inherit', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}
          >
            View candidates →
          </button>
        </div>
      )}

      {/* Dropzone */}
      {!uploading && (
        <div
          {...getRootProps()}
          className={`dropzone card ${isDragActive ? 'active' : ''}`}
          id="resume-dropzone"
          style={{ marginBottom: 'var(--space-5)' }}
        >
          <input {...getInputProps()} id="resume-file-input" />
          <span className="dropzone-icon">📄</span>
          <p className="dropzone-title">
            {isDragActive ? 'Drop your resumes here' : 'Drag & drop resumes here'}
          </p>
          <p className="dropzone-subtitle">
            or <span>click to browse</span> — PDF, DOC, DOCX up to 10MB each
          </p>
        </div>
      )}

      {/* File list */}
      {files.length > 0 && !uploading && (
        <div style={{ marginBottom: 'var(--space-5)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              {files.length} file{files.length !== 1 ? 's' : ''} selected
            </span>
            <button
              className="btn btn-ghost"
              onClick={() => setFiles([])}
              style={{ padding: 'var(--space-1) var(--space-3)', fontSize: '0.8rem' }}
            >
              Clear all
            </button>
          </div>
          <div className="file-list">
            {files.map((file, i) => (
              <div className="file-item" key={`${file.name}-${i}`}>
                <span className="file-icon">
                  {file.name.endsWith('.pdf') ? '📕' : '📝'}
                </span>
                <div className="file-info">
                  <div className="file-name">{file.name}</div>
                  <div className="file-size">{formatBytes(file.size)}</div>
                </div>
                <button
                  className="file-remove"
                  onClick={() => removeFile(i)}
                  aria-label={`Remove ${file.name}`}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              id="upload-submit-btn"
              className="btn btn-primary"
              onClick={handleUpload}
              disabled={uploading}
              style={{ minWidth: 160 }}
            >
              {uploading ? (
                <><span className="spinner" /> Processing...</>
              ) : (
                <>⬆️ Upload {files.length} Resume{files.length !== 1 ? 's' : ''}</>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Progress tracker */}
      {(uploading || done) && jobStatus && (
        <div className="progress-tracker" style={{ marginTop: 'var(--space-4)' }}>
          <div className="progress-tracker-header">
            <div className="progress-tracker-title">
              {done ? '✅' : <span className="spinner" />}
              {done ? 'Processing Complete' : 'Processing Resumes'}
            </div>
            <div className="progress-tracker-count">
              {jobStatus.processed} / {jobStatus.total}
            </div>
          </div>

          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progress}%` }} />
          </div>

          <div className="progress-file-list">
            {/* Completed */}
            {jobStatus.results?.map((r, i) => (
              <div className="progress-file-item" key={r.id}>
                <div className="progress-file-status status-done">✓</div>
                <span style={{ color: 'var(--text-primary)' }}>{r.name || `Resume ${i + 1}`}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--color-success)', fontSize: '0.75rem' }}>Extracted</span>
              </div>
            ))}
            {/* Errors */}
            {jobStatus.errors?.map((e, i) => (
              <div className="progress-file-item" key={`err-${i}`}>
                <div className="progress-file-status status-error">✕</div>
                <span style={{ color: 'var(--text-secondary)' }}>{e.file}</span>
                <span style={{ marginLeft: 'auto', color: 'var(--color-error)', fontSize: '0.75rem' }}>Failed</span>
              </div>
            ))}
            {/* Pending (still processing) */}
            {Array.from({ length: Math.max(0, jobStatus.total - jobStatus.processed) }).map((_, i) => (
              <div className="progress-file-item" key={`pending-${i}`}>
                <div className="progress-file-status status-pending">…</div>
                <span style={{ color: 'var(--text-muted)' }}>Processing...</span>
              </div>
            ))}
          </div>

          {done && jobStatus.errors?.length > 0 && (
            <div className="alert alert-error" style={{ marginTop: 'var(--space-3)' }}>
              {jobStatus.errors.length} file(s) failed to process.
            </div>
          )}

          {done && (
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
              <button className="btn btn-primary" onClick={() => navigate('/search')}>
                🔍 Search Candidates →
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tips */}
      {!uploading && !done && files.length === 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)', marginTop: 'var(--space-8)' }}>
          {[
            { icon: '🔐', title: 'Privacy First', desc: 'Contact details are extracted locally — only anonymised text is sent to AI.' },
            { icon: '⚡', title: 'Fast Processing', desc: 'Bulk upload up to 50 resumes at once. We process them in parallel.' },
            { icon: '🤖', title: 'AI Extraction', desc: 'Gemini AI extracts skills, experience, title and location from each resume.' },
          ].map((tip) => (
            <div className="card" key={tip.title} style={{ padding: 'var(--space-5)' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: 'var(--space-3)' }}>{tip.icon}</div>
              <div style={{ fontWeight: 700, marginBottom: 'var(--space-2)', fontSize: '0.9rem' }}>{tip.title}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.5 }}>{tip.desc}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
