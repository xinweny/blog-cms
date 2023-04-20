import React from 'react';
import { PropTypes as PT } from 'prop-types';

import { sendReq, getStorageAuth } from '../../utils/helpers';

function DeletePostButton({ postId, setPosts }) {
  const { token } = getStorageAuth();

  const handleDelete = async () => {
    try {
      const res = await sendReq('DELETE', `posts/${postId}`, {}, token);

      if (res.status === 200) {
        setPosts(prev => prev.filter(post => post._id !== postId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}

DeletePostButton.propTypes = {
  postId: PT.string.isRequired,
  setPosts: PT.func.isRequired,
};

export default DeletePostButton;