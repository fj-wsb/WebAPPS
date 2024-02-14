import React from 'react';
import BlogForm from '../BlogForm/BlogForm';
import BlogList from '../BlogList/BlogList';
import './Blog.css';


const App = () => {
  const handleAddEntry = (newEntry) => {
    console.log('New entry:', newEntry);
  };

  return (
    <div className='blog'>
      <h1 className='blog-header'>Blog App</h1>
      <BlogForm onAddEntry={handleAddEntry} />
      <BlogList />
    </div>
  );
};

export default App;
