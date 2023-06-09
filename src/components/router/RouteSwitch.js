import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import useStorageListener from '../../hooks/useStorageListener';

import Header from '../ui/Header';
import SideNav from '../ui/SideNav';
import LandingPage from '../../pages/LandingPage';
import DashboardPage from '../../pages/DashboardPage';
import CommentsPage from '../../pages/CommentsPage';
import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignupPage';
import PostFormPage from '../../pages/PostFormPage';
import Footer from '../ui/Footer';

function RouteSwitch() {
  const user = useStorageListener('user');

  return (
    <BrowserRouter>
      <Header />
      <div className="main-content">
        {user ? <SideNav /> : <div></div>}
        <Routes>
          <Route
            path="/"
            element={user ? <DashboardPage /> : <LandingPage />}
          />
          <Route path="/comments" element={<CommentsPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/posts/new" element={<PostFormPage />} />
          <Route path="/posts/:id/edit" element={<PostFormPage />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default RouteSwitch;