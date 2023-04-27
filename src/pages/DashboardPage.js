import React from 'react';

import { getStorageAuth } from '../utils/helpers';

import PostWidget from '../components/ui/PostWidget';
import CommentWidget from './CommentsPage';

function DashboardPage() {
  const { user } = getStorageAuth();

  return (
    <main>
      <PostWidget userId={user.id} />
      <CommentWidget userId={user.id} />
    </main>
  );
}

export default DashboardPage;