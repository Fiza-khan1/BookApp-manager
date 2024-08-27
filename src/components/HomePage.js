
import React, { useContext } from 'react';
import BookmarkForm from './BookmarkForm';
import ThemeContext from '../ThemeContext';

function HomePage({ onSave }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className={` container mt-5 ${theme}`}>
      <h1 className="text-center mb-4">Bookmark Manager</h1>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <BookmarkForm onSave={onSave} />
        </div>
      </div>
      <div className="text-center mt-4">
        <a href="/bookmarks" className="btn btn-primary">View Your Bookmarks</a>
      </div>
      <div className="text-center mt-4">
        <button onClick={toggleTheme} className="btn btn-secondary">
          Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme
        </button>
      </div>
    </div>
  );
}

export default HomePage;
