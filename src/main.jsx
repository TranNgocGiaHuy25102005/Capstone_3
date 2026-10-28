import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import './index.css'; 
import Register from './pages/Register';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Login from './pages/Login';
import Carts from './pages/Carts'; 
import Search from './pages/Search'; 
import Profile from './pages/Profile'; 
import MainLayout from "./components/Layouts/MainLayout";
import CustomerLayout from "./components/Layouts/CustomerLayout";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="carts" element={<Carts />} />
          <Route path='/search' element={<Search />} />
        </Route>
        <Route element={<CustomerLayout />}>
            <Route path='/carts' element={<Carts />} />
            <Route path='/profile' element={<Profile />} />
          </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);