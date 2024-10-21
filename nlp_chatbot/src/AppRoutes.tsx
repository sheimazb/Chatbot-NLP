import React from 'react';
import ChatPage from './pages/Chat/chatPage';
import { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeChat from './pages/Chat/HomeChat';

function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomeChat />} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;