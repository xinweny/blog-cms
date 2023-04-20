import React from 'react';

import { getStorageAuth } from '../utils/helpers';

import SideNav from '../components/ui/SideNav';
import PostWidget from '../components/ui/PostWidget';

function DashboardPage() {
  const { user } = getStorageAuth();

  return (
    <main>
      <SideNav />
      <PostWidget userId={user.id} />
      <h3>Comments</h3>
    </main>
  );
}

export default DashboardPage;