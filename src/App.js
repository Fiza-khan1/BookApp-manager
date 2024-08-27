// src/App.js
import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import BookmarkList from './components/BookmarkList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './ThemeContext';

function App() {
  const [bookmarks, setBookmarks] = useState([])
  useEffect(() => {
    const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if (storedBookmarks) {
      setBookmarks(storedBookmarks);
    }
  }, []);

  const addBookmark = (bookmark) => {
    const updatedBookmarks = [...bookmarks, bookmark];
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks)); // Save to localStorage
  };

  const editBookmark = (index, updatedBookmark) => {
    const updatedBookmarks = [...bookmarks];
    updatedBookmarks[index] = updatedBookmark;
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks)); // Save to localStorage
  };

  const deleteBookmark = (index) => {
    const updatedBookmarks = bookmarks.filter((_, i) => i !== index);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks)); // Save to localStorage
  };

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<HomePage onSave={addBookmark} />}
          />
          <Route
            path="/bookmarks"
            element={<BookmarkList 
              bookmarks={bookmarks} 
              onEdit={editBookmark} 
              onDelete={deleteBookmark} 
            />}
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
