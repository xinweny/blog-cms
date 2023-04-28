import React, { useState } from 'react';
import { PropTypes as PT } from 'prop-types';

import useModal from '../../hooks/useModal';
import { formatDate } from '../../utils/helpers';

import DeleteButton from './DeleteButton';
import WarningModal from './WarningModal';
import CommentForm from '../forms/CommentForm';

import editIcon from '../../assets/edit-pencil.svg';

import '../../styles/CommentCard.css';

function CommentCard({ comment, setComments }) {
  const [showEditForm, setShowEditForm] = useState(false);

  const [modalOptions, setModalOptions] = useModal();

  return (
    <div className="comment-card">
      <div className="comment-card-content" style={{
        opacity: showEditForm || modalOptions.show ? '30%' : '100%',
      }}>
        <div className="comment-info">
          <p className="comment-text">{comment.text}</p>
          <a href={`https://BLOGCLIENTTBD/posts/${comment.post._id}`} className="font-small comment-post">
            <p>{comment.post.title}</p>
          </a>
          <p className="comment-date font-small">{comment.updatedAt
            ? `${formatDate(comment.updatedAt, 'dd MMM Y hh:mm a')} (edited)`
            : formatDate(comment.createdAt, 'dd MMM Y hh:mm a')}
          </p>
        </div>
        <div className="comment-card-btns">
          <button onClick={() => setShowEditForm(true)}>
            <img src={editIcon} alt="Edit" />
          </button>
          <DeleteButton endpoint={'comments'} itemId={comment._id} setItems={setComments} setModalOptions={setModalOptions} />
        </div>
      </div>
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