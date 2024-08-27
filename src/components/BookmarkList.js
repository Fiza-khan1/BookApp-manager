// src/components/BookmarkList.js
import React, { useState } from 'react';

function BookmarkList({ bookmarks, onEdit, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editData, setEditData] = useState({ title: '', url: '', category: '' });

  const categories = [...new Set(bookmarks.map((bookmark) => bookmark.category))];

  const filteredBookmarks = bookmarks.filter((bookmark) => {
    return (
      bookmark.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === '' || bookmark.category === selectedCategory)
    );
  });

  const startEdit = (index, bookmark) => {
    setEditingIndex(index);
    setEditData(bookmark);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const submitEdit = (index) => {
    onEdit(index, editData);
    setEditingIndex(null);
    setEditData({ title: '', url: '', category: '' });
  };

  return (
    <div className="BookmarkList container mt-5">
      <h1 className="text-center mb-4">Your Bookmarks</h1>
      <div className="row mb-4">
        <div className="col-md-6 offset-md-3 mb-3">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control"
            placeholder="Search by title..."
          />
        </div>
        <div className="col-md-6 offset-md-3">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="form-control"
          >
            <option value="">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row">
        {filteredBookmarks.length > 0 ? (
          filteredBookmarks.map((bookmark, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="card">
                <div className="card-body">
                  {editingIndex === index ? (
                    <>
                      <input
                        type="text"
                        name="title"
                        value={editData.title}
                        onChange={handleEditChange}
                        className="form-control mb-2"
                        placeholder="Title"
                      />
                      <input
                        type="url"
                        name="url"
                        value={editData.url}
                        onChange={handleEditChange}
                        className="form-control mb-2"
                        placeholder="URL"
                      />
                      <input
                        type="text"
                        name="category"
                        value={editData.category}
                        onChange={handleEditChange}
                        className="form-control mb-2"
                        placeholder="Category"
                      />
                      <button
                        className="btn btn-success"
                        onClick={() => submitEdit(index)}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="card-title">{bookmark.title}</h3>
                      <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="card-text">
                        {bookmark.url}
                      </a>
                      <br/>
                      <p className="badge bg-primary mt-2">{bookmark.category}</p>
                      <div className="mt-3">
                        <button 
                          className="btn btn-primary me-2"
                          onClick={() => startEdit(index, bookmark)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-danger"
                          onClick={() => onDelete(index)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No bookmarks available</p>
        )}
      </div>
    </div>
  );
}

export default BookmarkList;
