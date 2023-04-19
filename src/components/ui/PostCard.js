import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Link } from 'react-router-dom';

import { formatDate } from '../../utils/helpers';

import TogglePublishButton from './TogglePublishButton';

function PostCard({ post, setPosts }) {
  return (
    <div>
      <p>{post.title}</p>
      <p>{formatDate(post.createdAt, 'd MMM Y')}</p>
      <p>{post.published ? 'Published' : 'Unpublished'}</p>
      <p>L{post.likesCount}</p>
      <p>C{post.commentsCount}</p>
      <Link to={`posts/${post._id}/edit`}>Edit</Link>
      <TogglePublishButton postId={post._id} published={post.published} setPosts={setPosts} />
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
  setPosts: PT.func.isRequired,
};

export default PostCard;