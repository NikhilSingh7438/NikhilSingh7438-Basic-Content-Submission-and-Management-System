// ContentDeletionForm.js

import React, { useState } from 'react';

const ContentDeletionForm = ({ onDelete }) => {
  const [submissionId, setSubmissionId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation if needed

    // Call the onDelete function passed from the parent component
    onDelete(submissionId);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Submission ID:
        <input
          type="text"
          value={submissionId}
          onChange={(e) => setSubmissionId(e.target.value)}
        />
      </label>
      <button type="submit">Delete</button>
    </form>
  );
};

export default ContentDeletionForm;
