import React, { useState, useEffect } from 'react';
import { PropTypes as PT } from 'prop-types';

import useFetch from '../../hooks/useFetch';

import PostCard from './PostCard';
import Counter from './Counter';

import '../../styles/PostWidget.css';

function PostWidget({ userId }) {
  const [posts, setPosts] = useFetch(`posts?author=${userId}`, []);

  const [published, setPublished] = useState([]);
  const [unpublished, setUnpublished] = useState([]);

  useEffect(() => {
    setPublished(posts.filter(post => post.published));
    setUnpublished(posts.filter(post => !post.published));
  }, [posts]);

  return (
    <div className="post-widget">
      <Counter number={posts.length}>
        <h3>Articles</h3>
      </Counter>
      <div className="widgets">
        <div className="widget">
          <Counter number={published.length}>
            <p className="widget-label">Published</p>
          </Counter>
          {published.length > 0
          ? published.map(post => (
            <PostCard key={post._id} post={post} setPosts={setPosts} />
          ))
          : <p>No articles to show.</p>}
        </div>
        <div>
          <Counter number={unpublished.length}>
            <p className="widget-label">Unpublished</p>
          </Counter>
          {unpublished.length > 0
          ? unpublished.map(post => (
            <PostCard key={post._id} post={post} setPosts={setPosts} />
          ))
          : <p>No articles to show.</p>}
        </div>
      </div>
    </div>
  )
}

PostWidget.propTypes = {
  userId: PT.string.isRequired,
};

export default PostWidget;