import React, { useRef, useState } from 'react';
import { PropTypes as PT } from 'prop-types';
import { Editor } from '@tinymce/tinymce-react';

import tinymceConfig from '../../config/tinyMCE';

function PostForm({ post }) {
  const editorRef = useRef(null);

  const [title, setTitle] = useState(post ? post.title : '');
  const [tags, setTags] = useState(post ? post.tags : []);

  const handleSubmit = e => {
    e.preventDefault();

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
      <Editor
        apiKey=""
        onInit={(e, editor) => editorRef.current = editor}
        init={tinymceConfig}
      />
      <label htmlFor="tags">Tags</label>
      <input
        type="text"
        id="tags"
        value={tags.join(' ')}
        onChange={e => setTags(e.target.value.split(' '))}
      />
      <button type="Submit">{post ? 'Update' : 'Create' }</button>
    </form>
  );
}

PostForm.propTypes = {
  post: PT.shape({
    title: PT.string.isRequired,
    text: PT.string.isRequired,
    tags: PT.arrayOf(PT.string),
  }),
};

export default PostForm;