import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { cartList } = useSelector((state) => state.cartReducer);
  const { currentUser } = useSelector((state) => state.userReducer);

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
          <NavLink to="/carts" className="flex items-center gap-2 text-xl">
            <i className="fa-solid fa-cart-shopping"></i>
            <span>({totalQuantity})</span>
          </NavLink>

          {currentUser ? (
            <span className="text-yellow-400 font-bold">
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
