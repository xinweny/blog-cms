import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import useStorageListener from '../../hooks/useStorageListener';

import Header from '../ui/Header';
import LandingPage from '../../pages/LandingPage';
import DashboardPage from '../../pages/DashboardPage';
import LoginPage from '../../pages/LoginPage';
import SignupPage from '../../pages/SignupPage';
import PostFormPage from '../../pages/PostFormPage';
import Footer from '../ui/Footer';

function RouteSwitch() {
  const user = useStorageListener('user');

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path="/"
          element={user ? <DashboardPage /> : <LandingPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/posts/new" element={<PostFormPage />} />
        <Route path="/posts/:id" element={<PostFormPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default RouteSwitch;