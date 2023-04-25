import React from 'react';
import { PropTypes as PT } from 'prop-types';

import { sendReqMultipart, getStorageAuth } from '../../utils/helpers';

function TogglePublishButton({
  post,
  setPosts,
}) {
  const { token } = getStorageAuth();

  const handleUpdate = async () => {
    try {
      const data = new FormData();
      data.append('title', post.title);
      data.append('text', post.text);
      data.append('tags', JSON.stringify(post.tags));
      data.append('published', !post.published);

      const res = await sendReqMultipart(
        'PUT', `posts/${post._id}`,
        data,
        token,
      );

      const json = await res.json();

      if (res.status === 200) {
        setPosts(prev => prev.map(p => p._id === post._id ? json.data : p));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button onClick={handleUpdate}>{post.published? 'Unpublish' : 'Publish'}</button>
  )
}

TogglePublishButton.propTypes = {
  post: PT.shape({
    _id: PT.string.isRequired,
    published: PT.bool.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    tags: PT.arrayOf(PT.string),
  }),
  setPosts: PT.func.isRequired,
};

export default TogglePublishButton;