import React from "react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAuth } from "./zustand/authStore.js";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";
import CustomerLayout from "./components/Layouts/CustomerLayout";
import Home from "./pages/Home";
import Carts from './pages/Carts';
import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Search from "./pages/Search";

function App() {
  const setUserInfor = useAuth((state) => state.setUserInfor);
  useEffect(() => {
    setUserInfor();
  }, []);
  return (
    <div>
      <Header />
      
      <div style={{ minHeight: '75vh' }}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path='detail/:id' element={<Detail />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route element={<CustomerLayout />}>
            <Route path='/carts' element={<Carts />} />
            <Route path='/search' element={<Search />} />
          </Route>
        </Routes>
      </div>


      <Footer />
    </div>
  );
}

export default App;
