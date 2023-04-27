import React from 'react';
import { PropTypes as PT } from 'prop-types';

import likeIcon from '../../assets/heart.svg';
import commentIcon from '../../assets/comment-dots.svg';

import '../../styles/LikeCommentCounts.css'

function LikeCommentCounts({ likes, comments }) {
  return (
    <div className="lc-counts font-small">
      <div>
        <img src={likeIcon} alt="Likes" />
        <p>{likes}</p>
      </div>
      <div>
        <img src={commentIcon} alt="Comments" />
        <p>{comments}</p>
      </div>
    </div>
  );
}

LikeCommentCounts.propTypes = {
  likes: PT.number.isRequired,
  comments: PT.number.isRequired,
}

export default LikeCommentCounts;