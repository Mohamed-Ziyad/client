import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../api/api';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    api.get(`/posts`).then((res) => {
      setPosts(res.data);
    });
  }, []);

  const Post = ({ post }) => {
    return (
      <div className="col mb-2" key={post.id}>
        <div
          className="card h-100"
          style={{
            width: '18rem',
          }}
        >
          <img src={post.link} className="card-img-top" alt={post.title} />
          <div className="card-body">
            <h5 className="card-title">{post.title}</h5>
            <p className="card-text">{post.description}</p>
            <Link to={`/${post.id}`} class="btn btn-primary">
              View
            </Link>
          </div>
        </div>
      </div>
    );
  };
  return (
    <section className="row row-cols-1 row-cols-md-6  g-1 p-3">
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </section>
  );
};

export default Posts;
