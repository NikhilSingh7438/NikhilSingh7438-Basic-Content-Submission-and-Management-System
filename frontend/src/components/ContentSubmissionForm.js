import React, { useState } from 'react';
import ContentDeletionForm  from './ContentDeletionForm';

import './styles.css';

const ContentSubmissionForm = ({ onContentSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    File: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error submitting content');
      }

      // Trigger the callback to fetch the updated content list
      onContentSubmit();

      // Reset the form after successful submission
      setFormData({
        title: '',
        description: '',
        File: '',
      });
    } catch (error) {
      console.error('Error submitting content:', error);
      // Handle error and provide user feedback
    }
  };

  

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="File">File/Link:</label>
        <input
          type="text"
          id="File"
          name="File"
          value={formData.File}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ContentSubmissionForm;

