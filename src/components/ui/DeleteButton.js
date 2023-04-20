import React from 'react';
import { PropTypes as PT } from 'prop-types';

import { sendReq, getStorageAuth } from '../../utils/helpers';

function DeleteCommentButton({ endpoint, itemId, setItems }) {
  const { token } = getStorageAuth();

  const handleDelete = async () => {
    try {
      const res = await sendReq('DELETE', `${endpoint}/${itemId}`, {}, token);

      if (res.status === 200) {
        setItems(prev => prev.filter(item => item._id !== itemId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}

DeleteCommentButton.propTypes = {
  endpoint: PT.string.isRequired,
  itemId: PT.string.isRequired,
  setItems: PT.func.isRequired,
};

export default DeleteCommentButton;