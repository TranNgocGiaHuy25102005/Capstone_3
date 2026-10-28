import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useCartStore from './../zustand/cartStore';

export default function Header() {
  const { cartList } = useSelector((state) => state.cartReducer);
  const { currentUser } = useSelector((state) => state.userReducer);
  const { cartCount } = useCartStore()
  const navigate = useNavigate();

  const totalQuantity = cartList.reduce(
    (total, item) => total + item.quantityCart,
    0,
  );

  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-3xl font-bold">
          <img
            src="https://cybersoft.edu.vn/wp-content/uploads/2022/10/cyberlogo-white.png"
            alt="logo"
            className="h-10"
          />
        </NavLink>

        <div className="flex items-center gap-6 font-semibold">
          <div to="/search" className="flex items-center gap-2 text-xl"
            onClick={() => {
              navigate("/search")
            }}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <NavLink to="/carts" className="flex items-center gap-2 text-xl">
            <i className="fa-solid fa-cart-shopping"></i>
            <span>({cartCount})</span>
          </NavLink>

          {currentUser ? (
            <span className="text-yellow-400 font-bold"
              onClick={() => {
                navigate("/profile")
              }}>
              Hi, {currentUser.email}
            </span>
          ) : (
            <>
              <NavLink to="/login" className="hover:text-yellow-400">
                Login
              </NavLink>
              <NavLink to="/register" className="hover:text-yellow-400">
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>

      <div className="bg-gray-200 text-black py-2">
        <div className="container mx-auto flex gap-6 px-4 font-medium">
          <NavLink to="/" className="hover:text-blue-600">
            Home
          </NavLink>
          <span className="hover:text-blue-600 cursor-pointer">Men</span>
          <span className="hover:text-blue-600 cursor-pointer">Woman</span>
          <span className="hover:text-blue-600 cursor-pointer">Kid</span>
          <span className="hover:text-blue-600 cursor-pointer">Sport</span>
        </div>
      </div>
    </header>
  );
}
