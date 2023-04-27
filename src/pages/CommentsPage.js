import React from 'react';

import useFetch from '../hooks/useFetch';
import { getStorageAuth } from '../utils/helpers';

import CommentCard from '../components/ui/CommentCard';
import Counter from '../components/ui/Counter';

function CommentsPage() {
  const { user } = getStorageAuth();

  const [comments, setComments] = useFetch(`comments?author=${user.id}&showPost=true&createdAt=desc`, []);

  return (
    <main>
      <Counter number={comments.length}>
        <h3>Comments</h3>
      </Counter>
      {comments.length > 0
        ? comments.map(comment =>
          <CommentCard key={comment._id} comment={comment} setComments={setComments} />
        )
        : <p>No comments to show.</p>}
    </main>
  );
}

export default CommentsPage;