import React from 'react';
import { useParams } from 'react-router-dom';

import useFetch from '../hooks/useFetch';

import PostForm from '../components/forms/PostForm';

function PostFormPage() {
  const { id } = useParams();
  const post = id ? useFetch(`posts/${id}`)[0] : null;

  if (!post) return null;

  return (
    <main>
      <h2>{post ? 'Edit' : 'Create'} Post</h2>
      <PostForm post={post} />
    </main>
  );
}

export default PostFormPage;