import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import User from './components/User';
import Posts from './components/Posts';

import CreatePost from './components/CreatePost';
import Login from './components/Login';

const App = () => {
  return (
    <>
      <div className="container-fluid">
        <BrowserRouter>
          <Navbar />
          <br />
          <Routes>
            <Route path="/" exact element={<Posts />} />
            <Route path="register" exact element={<User />} />
            <Route path="login" exact element={<Login />} />
            <Route path="/:id" exact element={<CreatePost />} />
            <Route path="new" exact element={<CreatePost />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
};

export default App;
