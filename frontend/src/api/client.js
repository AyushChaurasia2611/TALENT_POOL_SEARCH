const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const api = {
  // Upload resumes — returns jobId
  uploadResumes: async (files, onProgress) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('resumes', file));

    const response = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || 'Upload failed');
    }

    return response.json();
  },

  // Poll job status
  getJobStatus: async (jobId) => {
    const response = await fetch(`${API_BASE}/jobs/${jobId}`);
    if (!response.ok) throw new Error('Failed to fetch job status');
    return response.json();
  },

  // Get all candidates with optional filters
  getCandidates: async ({ skill, min_exp, location, page = 1, limit = 50 } = {}) => {
    const params = new URLSearchParams();
    if (skill) params.set('skill', skill);
    if (min_exp) params.set('min_exp', min_exp);
    if (location) params.set('location', location);
    params.set('page', page);
    params.set('limit', limit);

    const response = await fetch(`${API_BASE}/candidates?${params}`);
    if (!response.ok) throw new Error('Failed to fetch candidates');
    return response.json();
  },

  // Get single candidate by ID
  getCandidate: async (id) => {
    const response = await fetch(`${API_BASE}/candidates/${id}`);
    if (!response.ok) throw new Error('Candidate not found');
    return response.json();
  },

  // Delete a candidate
  deleteCandidate: async (id) => {
    const response = await fetch(`${API_BASE}/candidates/${id}`, { method: 'DELETE' });
    if (!response.ok) throw new Error('Failed to delete candidate');
    return response.json();
  },
};
