import React, { useRef, useState, useEffect } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';

import tinymceConfig from '../../config/tinyMCE';
import { sendReqMultipart, getStorageAuth, sanitize } from '../../utils/helpers';

function PostForm({ post }) {
  const editorRef = useRef(null);

  const { token } = getStorageAuth();

  const [title, setTitle] = useState(post ? post.title : '');
  const [text, setText] = useState('');
  const [tags, setTags] = useState(post ? post.tags : []);
  const [published, setPublished] = useState(post ? post.published : false);
  const [image, setImage] = useState(post ? post.imgUrl : null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (post) {
      const parser = new DOMParser();
      const decodedString = parser.parseFromString(post.text, 'text/html').body.textContent;

      setText(decodedString);
    }
  }, []);

  const navigate = useNavigate();

  const handleChange = content => {
    setText(sanitize(content));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (text.trim().length === 0) {
        setErrorMsg('Content must not be empty!');
        return;
      }

      const data = new FormData();
      data.append('title', title);
      data.append('text', text);
      tags.forEach(tag => data.append('tags', tag));
      data.append('published', published);
      if (image) data.append('imgFile', image);

      const res = await sendReqMultipart(
        post ? 'PUT' : 'POST',
        post ? `posts/${post._id}` : 'posts',
        data,
        token,
      );


      const json = await res.json();

      if (res.ok) {
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
      <label htmlFor="imgFile">Image</label>
      <input
        type="file"
        id="imgFile"
        multiple={false}
        onChange={e => setImage(e.target.files[0])}
      />
      {image ? (
        <img src={URL.createObjectURL(image)} alt={image.name} />
      ) : null}
      <label htmlFor="published">Publish?</label>
      <input
        type="checkbox"
        id="published"
        checked={published}
        onChange={() => setPublished(prev => !prev)}
      />
      <button type="Submit">{post ? 'Save' : 'Create' }</button>
    </form>
  );
}

PostForm.propTypes = {
  post: PT.shape({
    _id: PT.string.isRequired,
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    tags: PT.arrayOf(PT.string),
    published: PT.bool.isRequired,
    imgUrl: PT.string,
  }),
};

export default PostForm;