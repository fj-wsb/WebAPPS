import React, { useEffect, useState } from 'react';
import './BlogList.css';

const backend_host = process.env.BACKEND_HOST || 'localhost';
const backend_url = `http://${backend_host}:3001/api/blog_entries/`;

const BlogList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch(backend_url);
      const data = await response.json();
      setEntries(data);
    };

    fetchEntries();
  }, []);

  return (
    <div className="blog-list">
      {entries.map((entry) => (
        <div key={entry.id} className="blog-item">
          <h2>{entry.title}</h2>
          <p>{entry.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
