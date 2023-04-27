import React from 'react';

import { getStorageAuth } from '../utils/helpers';

import PostWidget from '../components/ui/PostWidget';

import '../styles/DashboardPage.css';

function DashboardPage() {
  const { user } = getStorageAuth();

  return (
    <main className="dashboard-page">
      <PostWidget userId={user.id} />
    </main>
  );
}

export default DashboardPage;