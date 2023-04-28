import React from 'react';

import useFetch from '../hooks/useFetch';
import { getStorageAuth } from '../utils/helpers';

import CommentCard from '../components/ui/CommentCard';
import Counter from '../components/ui/Counter';

import '../styles/CommentPage.css';

function CommentsPage() {
  const { user } = getStorageAuth();

  const [comments, setComments] = useFetch(`comments?author=${user.id}&showPost=true&createdAt=desc`, []);

  return (
    <main className="comment-page">
      <Counter number={comments.length} clsName="font-large">
        <h2>Comments</h2>
      </Counter>
      {comments.length > 0
        ? <div className="comment-cards">{comments.map(comment =>
          <CommentCard key={comment._id} comment={comment} setComments={setComments} />)}</div>
        : <p>No comments to show.</p>}
    </main>
  );
}

export default CommentsPage;