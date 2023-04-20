import React from 'react';
import { PropTypes as PT } from 'prop-types';

import { formatDate } from '../../utils/helpers';

import DeleteButton from './DeleteButton';

function CommentCard({ comment, setComments }) {
  return (
    <div>
      <p>{comment.text}</p>
      <p>{comment.post.title}</p>
      <p>{formatDate(comment.createdAt, 'dd MMM Y hh:mm a')}</p>
      <DeleteButton endpoint={'comments'} itemId={comment._id} setItems={setComments} />
    </div>
  );
}

CommentCard.propTypes = {
  comment: PT.shape({
    _id: PT.string.isRequired,
    post: PT.shape({ title: PT.string.isRequired }),
    text: PT.string.isRequired,
    createdAt: PT.string.isRequired,
  }),
  setComments: PT.func.isRequired,
}

export default CommentCard;