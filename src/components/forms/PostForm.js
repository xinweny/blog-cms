import React, { useRef, useState } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';

import tinymceConfig from '../../config/tinyMCE';
import { sendReq, getStorageAuth } from '../../utils/helpers';

function PostForm({ post }) {
  const editorRef = useRef(null);

  const { user, token } = getStorageAuth();

  const [title, setTitle] = useState(post ? post.title : '');
  const [text, setText] = useState(post);
  const [tags, setTags] = useState(post ? post.tags : []);
  const [published, setPublished] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleChange = content => setText(content);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (text.trim().length === 0) {
        setErrorMsg('Content must not be empty!');
        return;
      }

      const res = await sendReq(
        post ? 'PUT' : 'POST',
        post ? `posts/${post._id}` : 'posts',
        {
          author: user._id,
          title, text, tags, published,
          createdAt: new Date(),
        },
        token,
      );

      const json = await res.json();

      if (res.status === 200) {
        navigate('/');
      } else {
        const message = json.error
          ? json.error.message
          : json.errors.map(err => err.msg).join(' ');
        
        setErrorMsg(message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <p className="form-error">{errorMsg}</p>
      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        onInit={(e, editor) => editorRef.current = editor}
        init={tinymceConfig}
        value={text}
        onEditorChange={handleChange}
        required
      />
      <label htmlFor="tags">Tags</label>
      <input
        type="text"
        id="tags"
        value={tags.join(' ')}
        onChange={e => setTags(e.target.value.split(' '))}
        placeholder="food cooking healthy"
      />
      <label htmlFor="published">Publish?</label>
      <input
        type="checkbox"
        id="published"
        checked={published}
        onChange={() => setPublished(prev => !prev)}
      />
      <button type="Submit">{post ? 'Update' : 'Create' }</button>
    </form>
  );
}

PostForm.propTypes = {
  post: PT.shape({
    _id: PT.string.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    tags: PT.arrayOf(PT.string),
  }),
};

export default PostForm;