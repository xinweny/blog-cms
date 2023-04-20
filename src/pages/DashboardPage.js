import React from 'react';

import { getStorageAuth } from '../utils/helpers';

import SideNav from '../components/ui/SideNav';
import PostWidget from '../components/ui/PostWidget';
import CommentWidget from '../components/ui/CommentWidget';

function DashboardPage() {
  const { user } = getStorageAuth();

  return (
    <main>
      <SideNav />
      <PostWidget userId={user.id} />
      <CommentWidget userId={user.id} />
    </main>
  );
}

export default DashboardPage;