// src/components/BookmarkForm.js
import React, { useState } from 'react';

function BookmarkForm({ onSave }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && url && category) {
      const newBookmark = { title, url, category };
      onSave(newBookmark); 
      setTitle('');
      setUrl('');
      setCategory('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-3">
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title" 
          required 
          className="form-control" 
        />
      </div>
      <div className="mb-3">
        <input 
          type="url" 
          value={url} 
          onChange={(e) => setUrl(e.target.value)} 
          placeholder="URL" 
          required 
          className="form-control" 
        />
      </div>
      <div className="mb-3">
        <input 
          type="text" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          placeholder="Category" 
          required 
          className="form-control" 
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Bookmark</button>
    </form>
  );
}

export default BookmarkForm;
