import { useEffect } from 'react';

function ContactItem({ label, value, href }) {
  if (!value) return null;
  return (
    <div className="contact-item">
      <div className="contact-label">{label}</div>
      <div className="contact-value">
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

export default function CandidateModal({ candidate, loading, onClose, onDelete }) {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Candidate Profile"
    >
      <div className="modal">
        {/* Header */}
        <div className="modal-header">
          <div style={{ flex: 1 }}>
            {loading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <div className="spinner" />
                <span style={{ color: 'var(--text-secondary)' }}>Loading profile…</span>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', marginBottom: 'var(--space-2)' }}>
                  <div
                    style={{
                      width: 52, height: 52, borderRadius: '50%',
                      background: 'var(--gradient-primary)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, fontSize: '1.1rem', color: 'white', flexShrink: 0,
                      boxShadow: '0 4px 12px rgba(139,92,246,0.4)',
                    }}
                  >
                    {candidate?.name?.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('') || '?'}
                  </div>
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {candidate?.name || 'Unknown Candidate'}
                    </div>
                    {candidate?.most_recent_title && (
                      <div style={{ color: 'var(--color-primary-light)', fontWeight: 500, fontSize: '0.9rem' }}>
                        {candidate.most_recent_title}
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick badges */}
                <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
                  {candidate?.years_experience != null && (
                    <span className="badge badge-exp">⏱ {candidate.years_experience} years exp</span>
                  )}
                  {candidate?.location && (
                    <span className="badge badge-location">📍 {candidate.location}</span>
                  )}
                  {candidate?.file_name && (
                    <span className="badge" style={{ background: 'rgba(100,116,139,0.1)', color: 'var(--text-muted)', border: '1px solid rgba(100,116,139,0.2)' }}>
                      📄 {candidate.file_name}
                    </span>
                  )}
                </div>
              </>
            )}
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>
        </div>

        {!loading && candidate && (
          <div className="modal-body">
            {/* Contact Info */}
            <div className="modal-section">
              <div className="modal-section-title">Contact Information</div>
              <div className="contact-grid">
                <ContactItem label="Name" value={candidate.name} />
                <ContactItem
                  label="Email"
                  value={candidate.email}
                  href={candidate.email ? `mailto:${candidate.email}` : undefined}
                />
                <ContactItem label="Phone" value={candidate.phone} />
                <ContactItem
                  label="LinkedIn"
                  value={candidate.linkedin_url}
                  href={candidate.linkedin_url}
                />
                {candidate.github_url && (
                  <ContactItem
                    label="GitHub"
                    value={candidate.github_url}
                    href={candidate.github_url}
                  />
                )}
              </div>
            </div>

            {/* Skills */}
            {candidate.skills?.length > 0 && (
              <div className="modal-section">
                <div className="modal-section-title">Skills ({candidate.skills.length})</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {candidate.skills.map((skill) => (
                    <span key={skill} className="badge badge-skill">{skill}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Resume file link */}
            {candidate.resume_url && (
              <div className="modal-section">
                <div className="modal-section-title">Original Resume</div>
                <a
                  href={candidate.resume_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{ display: 'inline-flex', fontSize: '0.875rem' }}
                >
                  📥 Download Resume
                </a>
              </div>
            )}

            {/* Actions */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 'var(--space-4)', borderTop: '1px solid var(--color-border)' }}>
              <button
                id={`delete-candidate-${candidate.id}`}
                className="btn btn-danger"
                onClick={() => onDelete(candidate.id)}
              >
                🗑 Remove
              </button>
              <button className="btn btn-ghost" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
