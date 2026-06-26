import { useState, useEffect, useCallback } from 'react';
import { api } from '../api/client';
import CandidateCard from '../components/CandidateCard';
import CandidateModal from '../components/CandidateModal';

const DEBOUNCE_MS = 400;

export default function Search() {
  const [candidates, setCandidates] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({ skill: '', min_exp: '', location: '' });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);

  // Debounce filter inputs
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedFilters(filters), DEBOUNCE_MS);
    return () => clearTimeout(timer);
  }, [filters]);

  // Fetch candidates whenever filters change
  const fetchCandidates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getCandidates(debouncedFilters);
      setCandidates(res.candidates || []);
      setTotal(res.total || 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [debouncedFilters]);

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  // Open candidate detail modal
  const openCandidate = async (id) => {
    setSelectedId(id);
    setModalLoading(true);
    try {
      const candidate = await api.getCandidate(id);
      setSelectedCandidate(candidate);
    } catch (err) {
      console.error(err);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => {
    setSelectedId(null);
    setSelectedCandidate(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this candidate from the talent pool?')) return;
    try {
      await api.deleteCandidate(id);
      closeModal();
      fetchCandidates();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const hasFilters = filters.skill || filters.min_exp || filters.location;

  const clearFilters = () => setFilters({ skill: '', min_exp: '', location: '' });

  // Simple stats from current results
  const avgExp =
    candidates.length > 0
      ? (candidates.reduce((s, c) => s + (c.years_experience || 0), 0) / candidates.length).toFixed(1)
      : 0;

  const uniqueLocations = new Set(candidates.map((c) => c.location).filter(Boolean)).size;

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Talent Pool</h1>
        <p className="page-subtitle">Search and filter your uploaded candidate pool.</p>
      </div>

      {/* Stats */}
      {!loading && candidates.length > 0 && (
        <div className="stats-bar">
          <div className="stat-item">
            <div className="stat-value">{total}</div>
            <div className="stat-label">Total Candidates</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{candidates.length}</div>
            <div className="stat-label">Showing</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{avgExp}</div>
            <div className="stat-label">Avg. Years Exp</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{uniqueLocations}</div>
            <div className="stat-label">Locations</div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="filter-bar">
        <div className="filter-group">
          <label htmlFor="filter-skill" className="filter-label">Skill Keyword</label>
          <input
            id="filter-skill"
            className="input"
            type="text"
            placeholder="e.g. React, Python, SQL..."
            value={filters.skill}
            onChange={(e) => setFilters((f) => ({ ...f, skill: e.target.value }))}
          />
        </div>

        <div className="filter-group" style={{ maxWidth: 160 }}>
          <label htmlFor="filter-exp" className="filter-label">Min Experience</label>
          <input
            id="filter-exp"
            className="input"
            type="number"
            placeholder="e.g. 3"
            min="0"
            max="40"
            value={filters.min_exp}
            onChange={(e) => setFilters((f) => ({ ...f, min_exp: e.target.value }))}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="filter-location" className="filter-label">Location</label>
          <input
            id="filter-location"
            className="input"
            type="text"
            placeholder="e.g. London, Remote..."
            value={filters.location}
            onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
          />
        </div>

        <div className="filter-actions">
          {hasFilters && (
            <button id="clear-filters-btn" className="btn btn-ghost" onClick={clearFilters}>
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="alert alert-error" role="alert">
          ⚠️ {error}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--space-16)' }}>
          <div style={{ textAlign: 'center' }}>
            <div className="spinner" style={{ width: 40, height: 40, borderWidth: 3, margin: '0 auto var(--space-4)' }} />
            <p style={{ color: 'var(--text-secondary)' }}>Loading candidates…</p>
          </div>
        </div>
      )}

      {/* Empty state */}
      {!loading && candidates.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">{hasFilters ? '🔎' : '📂'}</div>
          <div className="empty-state-title">
            {hasFilters ? 'No candidates match your filters' : 'No candidates yet'}
          </div>
          <p className="empty-state-text">
            {hasFilters
              ? 'Try adjusting your search criteria.'
              : 'Upload resumes on the Upload page to get started.'}
          </p>
          {hasFilters && (
            <button
              className="btn btn-ghost"
              onClick={clearFilters}
              style={{ marginTop: 'var(--space-4)' }}
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Candidate Grid */}
      {!loading && candidates.length > 0 && (
        <div className="candidates-grid">
          {candidates.map((candidate) => (
            <CandidateCard
              key={candidate.id}
              candidate={candidate}
              onClick={() => openCandidate(candidate.id)}
            />
          ))}
        </div>
      )}

      {/* Candidate Detail Modal */}
      {selectedId && (
        <CandidateModal
          candidate={selectedCandidate}
          loading={modalLoading}
          onClose={closeModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
