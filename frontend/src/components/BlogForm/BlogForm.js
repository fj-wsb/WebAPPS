import React, { useState } from 'react';
import './BlogForm.css';

const backend_host = process.env.BACKEND_HOST || 'localhost';
const backend_url = `http://${backend_host}:3001/api/blog_entries`;

const BlogForm = ({ onAddEntry }) => {
  const [title, setTitle] = useState('');
  const [content, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title === '' || content === ''){
        window.alert("Fields cannot be empty!");
        return
    }
    const response = await fetch(backend_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, content }),
    });

    const newEntry = await response.json();
    onAddEntry(newEntry);
    setTitle('');
    setBody('');
    window.location.reload()
  };

  return (
    <form onSubmit={handleSubmit} className="blog-form">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="blog-input"
      />
      <p>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setBody(e.target.value)}
          className="blog-textarea"
        />
      </p>
      <button type="submit" className="blog-button">
        Add Entry
      </button>
    </form>
  );
};

export default BlogForm;