import React, { useState } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Link } from 'react-router-dom';

import useModal from '../../hooks/useModal';
import { formatDate } from '../../utils/helpers';

import LikeCommentCounts from './LikeCommentCounts';
import TogglePublishButton from './TogglePublishButton';
import DeleteButton from './DeleteButton';
import WarningModal from './WarningModal';

import verticalDots from '../../assets/dots-3-vertical.svg';
import placeholderImg from '../../assets/thumbnail-placeholder.png';
import crossIcon from '../../assets/cross.svg';

import '../../styles/PostCard.css';

function PostCard({ post, setPosts }) {
  const [showOptions, setShowOptions] = useState(false);
  const [modalOptions, setModalOptions] = useModal({
    show: false,
  });

  return (
    <div className="post-card">
      <div className="card-content" style={{
        opacity: modalOptions.show ? '30%' : '100%',
      }}>
        <div className="post-info">
          <div>
            {post.published
              ? <a className="post-card-title" href={`https://BLOGCLIENTTBD/posts/${post._id}`}>
                <p>{post.title}</p>
              </a> : <p className="post-card-title">{post.title}</p>}
            <div className="card-dates font-medium">
              <p>Created - {formatDate(post.createdAt, 'd MMM Y h:mm a')}</p>
              {post.updatedAt ? <p>Last modified - {formatDate(post.updatedAt, 'd MMM Y h:mm a')}</p> : null}
            </div>
          </div>
          <LikeCommentCounts likes={post.likesCount} comments={post.commentsCount}/>
        </div>
        <div className="post-thumbnail">
          <img src={post.imgUrl || placeholderImg} />
        </div>
        <button className="show-post-actions" onClick={() => setShowOptions(prev => !prev)}>
          <img src={verticalDots} alt="More actions" />
        </button>
      </div>
      <WarningModal
        options={modalOptions}
        setShowOptions={setShowOptions}
        setOptions={setModalOptions}
        message="Delete Post?"
      />
      {showOptions && !modalOptions.show && <div className="post-actions">
        <div>
          <Link to={`posts/${post._id}/edit`}>Edit</Link>
          <TogglePublishButton post={post} setPosts={setPosts} />
          <DeleteButton endpoint={'posts'} itemId={post._id} setItems={setPosts} setModalOptions={setModalOptions} mode="text" />
        </div>
        <button className="close-menu-btn" onClick={() => setShowOptions(false)}>
          <img src={crossIcon} alt="Close menu" />
        </button>
      </div>}
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
    imgUrl: PT.string,
  }),
  setPosts: PT.func.isRequired,
};

export default PostCard;