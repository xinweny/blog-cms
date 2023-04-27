import React, { useRef, useState, useEffect } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';
import uniqid from 'uniqid';

import tinymceConfig from '../../config/tinyMCE';
import { sendReqMultipart, getStorageAuth, sanitize } from '../../utils/helpers';

import TagInput from '../ui/TagInput';
import Counter from '../ui/Counter';

import '../../styles/PostForm.css';

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
      data.append('published', published);
      if (image) data.append('imgFile', image);
      data.append('tags', JSON.stringify(tags.filter(tag => tag.length > 0)));

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
    <form className="post-form" onSubmit={handleSubmit}>
      <div className="form-field title-field">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
      </div>
      <Editor
        apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
        onInit={(e, editor) => editorRef.current = editor}
        init={tinymceConfig}
        value={text}
        onEditorChange={handleChange}
        required
      />
      <div className="tags-field">
        <div className="tags-label">
          <Counter number={tags.length}>
            <label>Tags</label>
          </Counter>
          <button type="button" onClick={() => setTags(prev => [...prev, ''])}>+</button>
        </div>
        <div className="tag-inputs">
          {tags.map((tag, i) => (
            <TagInput key={uniqid()} tag={tag} setTags={setTags} index={i} />
          ))}
        </div>
      </div>
      <div className="form-field">
        <label htmlFor="imgFile">Image</label>
        <input
          type="file"
          id="imgFile"
          multiple={false}
          onChange={e => setImage(e.target.files[0])}
        />
      </div>
      <div className="form-field">
        <label htmlFor="published">Publish?</label>
        <input
          type="checkbox"
          id="published"
          checked={published}
          onChange={() => setPublished(prev => !prev)}
        />
      </div>
      <p className="form-error">{errorMsg}</p>
      <button className="submit-btn" type="Submit">{post ? 'Save' : 'Create' }</button>
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