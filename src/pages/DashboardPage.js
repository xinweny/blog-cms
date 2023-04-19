import React from 'react';

import useFetch from '../hooks/useFetch';
import { getStorageAuth } from '../utils/helpers';

import SideNav from '../components/ui/SideNav';
import PostCard from '../components/ui/PostCard';

function DashboardPage() {
  const { user } = getStorageAuth();
  
  const [posts] = useFetch(`posts?author=${user.id}`, []);

  return (
    <main>
      <SideNav />
      <h3>Articles ({posts.length})</h3>
      {posts.length > 0
        ? posts.map(post => (
          <PostCard key={post._id} post={post} />
        ))
        : <p>No articles yet. Write one now!</p>}
      <h3>Comments</h3>
    </main>
  );
}

export default DashboardPage;