import React, { useState } from 'react';
import { PropTypes as PT } from 'prop-types';

import useModal from '../../hooks/useModal';
import { formatDate } from '../../utils/helpers';

import DeleteButton from './DeleteButton';
import WarningModal from './WarningModal';
import CommentForm from '../forms/CommentForm';

function CommentCard({ comment, setComments }) {
  const [showEditForm, setShowEditForm] = useState(false);

  const [modalOptions, setModalOptions] = useModal();

  return (
    <div>
      <p>{comment.text}</p>
      <a href={`https://BLOGCLIENTTBD/posts/${comment.post._id}`}>
        <p>{comment.post.title}</p>
      </a>
      <p>{formatDate(comment.createdAt, 'dd MMM Y hh:mm a')}</p>
      {comment.updatedAt ? <p>Edited at {formatDate(comment.updatedAt, 'dd MMM Y hh:mm a')}</p> : null}
      <button onClick={() => setShowEditForm(true)}>Edit</button>
      <DeleteButton endpoint={'comments'} itemId={comment._id} setItems={setComments} setModalOptions={setModalOptions} />
      <WarningModal options={modalOptions} setOptions={setModalOptions} message="Delete Comment?" />
      <CommentForm comment={comment} show={showEditForm}setShow={setShowEditForm} setComments={setComments} />
    </div>
  );
}

CommentCard.propTypes = {
  comment: PT.shape({
    _id: PT.string.isRequired,
    post: PT.shape({
      _id: PT.string.isRequired,
      title: PT.string.isRequired,
    }),
    text: PT.string.isRequired,
    createdAt: PT.string.isRequired,
    updatedAt: PT.string,
  }),
  setComments: PT.func.isRequired,
}

export default CommentCard;