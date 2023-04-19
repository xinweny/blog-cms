import React, { useState, useEffect } from 'react';
import { PropTypes as PT } from 'prop-types';

import useFetch from '../../hooks/useFetch';

import PostCard from './PostCard';

function PostWidget({ userId }) {
  const [posts, setPosts] = useFetch(`posts?author=${userId}`, []);

  const [published, setPublished] = useState([]);
  const [unpublished, setUnpublished] = useState([]);

  useEffect(() => {
    if (posts.length > 0) {
      setPublished(posts.filter(post => post.published));
      setUnpublished(posts.filter(post => !post.published));
    }
  }, [posts]);

  return (
    <div>
      <h3>Articles ({posts.length})</h3>
      <div>
        <div>
          <p><strong>Published ({published.length})</strong></p>
          {published.length > 0
          ? published.map(post => (
            <PostCard key={post._id} post={post} setPosts={setPosts} />
          ))
          : <p>No articles to show.</p>}
        </div>
        <div>
        <p><strong>Unpublished ({unpublished.length})</strong></p>
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