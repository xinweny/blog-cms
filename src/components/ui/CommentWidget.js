import React from 'react';
import { PropTypes as PT } from 'prop-types';

import useFetch from '../../hooks/useFetch';

import CommentCard from './CommentCard';

function CommentWidget({ userId }) {
  const [comments, setComments] = useFetch(`comments?author=${userId}&showPost=true`, []);

  return (
    <div>
      <h3>Comments ({comments.length})</h3>
      {comments.map(comment => (
        <CommentCard key={comment._id} comment={comment} setComments={setComments} />
      ))}
    </div>
  );
}

CommentWidget.propTypes = {
  userId: PT.string.isRequired,
};

export default CommentWidget;