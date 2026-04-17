import { useState, useEffect, useCallback } from 'react';
import { UserPlus, Search, Trash2, Users, Info } from 'lucide-react';
import { Profile, getProfiles, createProfile, deleteProfile } from './api';
import './App.css';

function App() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Filters
  const [filters, setFilters] = useState({
    gender: '',
    country_id: '',
    age_group: ''
  });

  const fetchProfiles = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProfiles(filters);
      setProfiles(data.data);
      setError(null);
    } catch (err: any) {
      setError('Failed to fetch profiles. Please check your connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchProfiles();
  }, [fetchProfiles]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameInput.trim()) return;

    setCreating(true);
    setError(null);
    try {
      await createProfile(nameInput);
      setNameInput('');
      fetchProfiles();
    } catch (err: any) {
      const msg = err.response?.data?.message || 'Failed to create profile.';
      setError(msg);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this profile?')) return;
    
    try {
      await deleteProfile(id);
      fetchProfiles();
    } catch (err) {
      setError('Failed to delete profile.');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <h1><Users size={28} /> Profile Classifier</h1>
        <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          <span>Powered by HNG Stage 1 API</span>
        </div>
      </header>

      {error && (
        <div className="error-msg">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Info size={16} />
            {error}
          </div>
        </div>
      )}

      <section className="create-section">
        <form onSubmit={handleCreate} style={{ display: 'flex', gap: '1rem', width: '100%', alignItems: 'flex-end' }}>
          <div className="input-group">
            <label htmlFor="name">Enter Name to Classify</label>
            <input
              id="name"
              type="text"
              placeholder="e.g. Emmanuel, Sarah, Ella..."
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              disabled={creating}
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={creating || !nameInput.trim()}>
            {creating ? (
              <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }}></div>
            ) : (
              <UserPlus size={20} />
            )}
            {creating ? 'Processing...' : 'Classify Name'}
          </button>
        </form>
      </section>

      <div className="filters-section">
        <div className="select-group">
          <select 
            value={filters.gender} 
            onChange={(e) => setFilters(prev => ({ ...prev, gender: e.target.value }))}
          >
            <option value="">All Genders</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="select-group">
          <select 
            value={filters.age_group} 
            onChange={(e) => setFilters(prev => ({ ...prev, age_group: e.target.value }))}
          >
            <option value="">All Ages</option>
            <option value="child">Child (0-12)</option>
            <option value="teenager">Teenager (13-19)</option>
            <option value="adult">Adult (20-59)</option>
            <option value="senior">Senior (60+)</option>
          </select>
        </div>
        <div className="select-group">
          <input 
            type="text" 
            placeholder="Search Country Code (e.g. NG, US)"
            className="input-group"
            style={{ padding: '0.625rem 1rem', borderRadius: '8px', border: '1px solid var(--border)', fontSize: '0.875rem' }}
            value={filters.country_id}
            onChange={(e) => setFilters(prev => ({ ...prev, country_id: e.target.value }))}
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="grid">
          {profiles.length > 0 ? (
            profiles.map((profile) => (
              <div key={profile.id} className="card">
                <button className="btn-delete" onClick={() => handleDelete(profile.id)}>
                  <Trash2 size={18} />
                </button>
                <div className="card-header">
                  <h3 className="card-name">{profile.name}</h3>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <span className="tag tag-gender">{profile.gender}</span>
                    <span className="tag tag-age">{profile.age_group}</span>
                  </div>
                </div>
                <div className="card-stats">
                  <div className="stat-item">
                    <span>Age</span>
                    <strong>{profile.age} years</strong>
                  </div>
                  <div className="stat-item">
                    <span>Nationality</span>
                    <strong>{profile.country_id} ({(profile.country_probability * 100).toFixed(1)}%)</strong>
                  </div>
                  <div className="stat-item">
                    <span>Gender Confidence</span>
                    <strong>{(profile.gender_probability * 100).toFixed(1)}%</strong>
                  </div>
                  <div className="stat-item">
                    <span>Data Sample Size</span>
                    <strong>{profile.sample_size.toLocaleString()}</strong>
                  </div>
                </div>
                <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Created on {new Date(profile.created_at).toLocaleDateString()}
                </div>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '5rem', color: 'var(--text-muted)' }}>
              <Search size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <p>No profiles found. Try creating one or adjusting filters.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
