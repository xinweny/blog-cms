import React from 'react';
import { PropTypes as PT } from 'prop-types';
import { Link } from 'react-router-dom';

import useModal from '../../hooks/useModal';
import { formatDate } from '../../utils/helpers';

import TogglePublishButton from './TogglePublishButton';
import DeleteButton from './DeleteButton';
import WarningModal from './WarningModal';

function PostCard({ post, setPosts }) {
  const [modalOptions, setModalOptions] = useModal();

  return (
    <div>
      {post.published
        ? <a href={`https://BLOGCLIENTTBD/posts/${post._id}`}>
          <p>{post.title}</p>
        </a> : <p>{post.title}</p>}
      <p>Created {formatDate(post.createdAt, 'd MMM Y h:mm a')}</p>
      {post.updatedAt ? <p>Last modified {formatDate(post.updatedAt, 'd MMM Y h:mm a')}</p> : null}
      <p>{post.published ? 'Published' : 'Unpublished'}</p>
      <p>L{post.likesCount}</p>
      <p>C{post.commentsCount}</p>
      <Link to={`posts/${post._id}/edit`}>Edit</Link>
      <TogglePublishButton post={post} setPosts={setPosts} />
      <DeleteButton endpoint={'posts'} itemId={post._id} setItems={setPosts} setModalOptions={setModalOptions} />
      <WarningModal options={modalOptions} setOptions={setModalOptions} message="Delete Post?" />
    </div>
  );
}

PostCard.propTypes = {
  post: PT.shape({
    _id: PT.string.isRequired,
    title: PT.string.isRequired,
    createdAt: PT.string.isRequired,
    updatedAt: PT.string,
    published: PT.bool.isRequired,
    likesCount: PT.number.isRequired,
    commentsCount: PT.number.isRequired,
  }),
  setPosts: PT.func.isRequired,
};

export default PostCard;