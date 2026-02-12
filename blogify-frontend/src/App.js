import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts') // Make sure port matches backend
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setPosts(data.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={{padding: 40}}>Loading posts...</div>;
  if (error) return <div style={{padding: 40, color: 'red'}}>Error: {error}</div>;

  return (
    <div style={{padding: 40, maxWidth: 800, margin: '0 auto'}}>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <div key={post._id} style={{
          padding: 20,
          border: '1px solid #ddd',
          margin: '16px 0',
          borderRadius: 8,
          background: '#f9f9f9'
        }}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}

export default App;

