import React from 'react';
import { PropTypes as PT } from 'prop-types';

import { sendReqJson, getStorageAuth } from '../../utils/helpers';

import deleteIcon from '../../assets/trash-can.svg';

function DeleteButton({
  endpoint,
  itemId,
  setItems,
  setModalOptions,
}) {
  const { token } = getStorageAuth();

  const handleDelete = async () => {
    try {
      const res = await sendReqJson('DELETE', `${endpoint}/${itemId}`, {}, token);

      if (res.status === 200) {
        setItems(prev => prev.filter(item => item._id !== itemId));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button onClick={() => setModalOptions({
      show: true,
      action: handleDelete,
    })}>
      <img src={deleteIcon} alt="Delete" />
    </button>
  );
}

DeleteButton.propTypes = {
  endpoint: PT.string.isRequired,
  itemId: PT.string.isRequired,
  setItems: PT.func.isRequired,
  setModalOptions: PT.func.isRequired,
};

export default DeleteButton;