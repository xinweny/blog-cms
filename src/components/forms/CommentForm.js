import React, { useState } from 'react';
import { PropTypes as PT } from 'prop-types';

import { sendReqJson, getStorageAuth } from '../../utils/helpers';

function CommentForm({ comment, show, setShow, setComments }) {
  const { user, token } = getStorageAuth();

  const [text, setText] = useState(comment.text);

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await sendReqJson('PUT', `comments/${comment._id}`, { text }, token);

      const json = await res.json();

      if (res.status === 200) {
        const updatedComment = json.data;
        updatedComment.author = { _id: user.id, username: user.username };

        setComments(prev => prev.map(c => {
          if (c._id === comment._id) return updatedComment;
          return c;
        }));
        setShow(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (!show) return null;

  return (
    <div>
      <h3>Edit Comment</h3>
      <form onSubmit={handleSubmit}>
        <textarea
          id="comment-text"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
      <button onClick={() => setShow(false)}>x</button>
    </div>
  )
}

CommentForm.propTypes = {
  comment: PT.shape({ _id: PT.string.isRequired, text: PT.string.isRequired }),
  show: PT.bool.isRequired,
  setShow: PT.func.isRequired,
  setComments: PT.func.isRequired,
};

export default CommentForm;