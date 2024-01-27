import React, { useState } from 'react';
import './styles.css';

const ContentPreview = ({ contentList, onSelect }) => {
  const [selectedContent, setSelectedContent] = useState(null);

  const handleContentClick = (contentId) => {
    // Update the selected content and trigger the onSelect callback
    setSelectedContent(contentList.find(content => content._id === contentId));
    onSelect(contentId);
  };

  return (
    <div className="container content-details">
      <h2>All Content Submissions</h2>
      <ul>
        {contentList.map((content) => (
          <li key={content._id} onClick={() => handleContentClick(content._id)} className="content-item">
            <p><strong>Title:</strong> {content.title}</p>
            <p><strong>Description:</strong> {content.description}</p>
            <p><strong>File/Link:</strong> <a href={content.File}>{content.File}</a></p>
          </li>
        ))}
      </ul>

      {selectedContent && (
        <div className="selected-content">
          <h3>Selected Content Details</h3>
          <p><strong>Title:</strong> {selectedContent.title}</p>
          <p><strong>Description:</strong> {selectedContent.description}</p>
          <p><strong>File/Link:</strong> <a href={selectedContent.File}>{selectedContent.File}</a></p>
        </div>
      )}
    </div>
  );
};

export default ContentPreview;
