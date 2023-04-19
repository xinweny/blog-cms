import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Link } from 'react-router-dom';

import { formatDate } from '../../utils/helpers';

function PostCard({ post }) {
  return (
    <div>
      <p>{post.title}</p>
      <p>{formatDate(post.createdAt, 'd MMM Y')}</p>
      <p>{post.published ? 'Published' : 'Unpublished'}</p>
      <p>L{post.likesCount}</p>
      <p>C{post.commentsCount}</p>
      <Link to={`posts/${post._id}/edit`}>Edit</Link>
    </div>
  );
}

PostCard.propTypes = {
  post: PT.shape({
    _id: PT.string.isRequired,
    title: PT.string.isRequired,
    createdAt: PT.string.isRequired,
    published: PT.bool.isRequired,
    likesCount: PT.number.isRequired,
    commentsCount: PT.number.isRequired,
  }),
};

export default PostCard;