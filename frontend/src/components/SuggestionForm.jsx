import React, { useState } from 'react';

const SuggestionForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    author: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.author.trim()) return;

    try {
      await onSubmit(formData);
      setFormData({ title: '', description: '', author: '' });
    } catch (error) {
      console.error('Error submitting suggestion:', error);
    }
  };

  return (
    <div className="suggestion-form">
      <h3>Submit New Suggestion</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="author"
            placeholder="Your name"
            value={formData.author}
            onChange={handleChange}
            className="form-input"
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Suggestion title"
            value={formData.title}
            onChange={handleChange}
            className="form-input"
            required
            disabled={loading}
          />
        </div>
        
        <div className="form-group">
          <textarea
            name="description"
            placeholder="Detailed description (optional)"
            value={formData.description}
            onChange={handleChange}
            className="form-input form-textarea"
            disabled={loading}
          />
        </div>
        
        <button 
          type="submit"
          className="submit-button"
          disabled={loading || !formData.title.trim() || !formData.author.trim()}
        >
          {loading ? 'Submitting...' : 'Submit Suggestion'}
        </button>
      </form>
    </div>
  );
};

export default SuggestionForm;