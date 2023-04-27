import React from 'react';

import useFetch from '../hooks/useFetch';
import { getStorageAuth } from '../utils/helpers';

import CommentCard from '../components/ui/CommentCard';

function CommentsPage() {
  const { user } = getStorageAuth();

  const [comments, setComments] = useFetch(`comments?author=${user.id}&showPost=true&createdAt=desc`, []);

  return (
    <main>
      <h3>Comments ({comments.length})</h3>
      {comments.map(comment => (
        <CommentCard key={comment._id} comment={comment} setComments={setComments} />
      ))}
    </main>
  );
}

export default CommentsPage;