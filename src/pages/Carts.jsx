import React from "react";
import useCartStore from "./../zustand/cartStore";
import { useAuth } from "../zustand/authStore.js"

export default function Carts() {
  const { cartItems, addCartItem, reduceCartItem, removeCartItem, submitOrder } = useCartStore();
  const { userInfor } = useAuth();

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl text-gray-800 mb-6 font-medium">Carts</h1>
      <hr className="border-gray-100 mb-10" />

      {cartItems.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          Giỏ hàng của bạn đang trống.
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-[#d9d9d9] text-gray-800 text-sm font-medium">
                  <th className="py-3 px-4 w-12 text-center">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="accent-purple-600 w-4 h-4 cursor-pointer rounded"
                    />
                  </th>
                  <th className="py-3 px-4">id</th>
                  <th className="py-3 px-4">img</th>
                  <th className="py-3 px-4">name</th>
                  <th className="py-3 px-4">price</th>
                  <th className="py-3 px-4">quantity</th>
                  <th className="py-3 px-4">total</th>
                  <th className="py-3 px-4 text-center">action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((cartEntry, index) => {
                  const product = cartEntry.item;
                  const quantity = cartEntry.quantity;
                  const itemTotal = (product?.price || 0) * quantity;

                  return (
                    <tr
                      key={product?.id || index}
                      className="bg-white border-b border-gray-100"
                    >
                      <td className="py-6 px-4 text-center align-middle">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="accent-purple-600 w-4 h-4 cursor-pointer"
                        />
                      </td>
                      <td className="py-6 px-4 text-sm align-middle">
                        {product?.id || index + 1}
                      </td>
                      <td className="py-6 px-4 align-middle">
                        <img
                          src={product?.image}
                          alt={product?.name || "Product"}
                          className="h-10 w-16 object-cover rounded shadow-sm"
                        />
                      </td>
                      <td className="py-6 px-4 text-sm align-middle">
                        {product?.name || product?.title || "Chưa có tên"}
                      </td>
                      <td className="py-6 px-4 text-sm align-middle">
                        {product?.price?.toLocaleString() || 0}
                      </td>
                      <td className="py-6 px-4 align-middle">
                        <div className="flex items-center space-x-1">
                          <button className="bg-[#6200ea] text-white w-6 h-6 flex items-center justify-center rounded text-xs shadow-md font-bold cursor-pointer hover:bg-purple-800 transition"
                            onClick={() => {
                              addCartItem(product, 1)
                            }}>
                            +
                          </button>
                          <div className="bg-[#e0e0e0] px-4 py-1 text-sm rounded-sm font-medium">
                            {quantity}
                          </div>
                          <button className="bg-[#6200ea] text-white w-6 h-6 flex items-center justify-center rounded text-xs shadow-md font-bold cursor-pointer hover:bg-purple-800 transition"
                            onClick={() => {
                              reduceCartItem(product)
                            }}>
                            -
                          </button>
                        </div>
                      </td>
                      <td className="py-6 px-4 text-sm align-middle">
                        {itemTotal.toLocaleString()}
                      </td>
                      <td className="py-6 px-4 align-middle">
                        <div className="flex space-x-2 justify-center">
                          <button className="bg-[#6200ea] text-white px-4 py-1.5 rounded-sm text-xs font-semibold shadow-md hover:bg-purple-800 uppercase tracking-wide">
                            Edit
                          </button>
                          <button className="bg-[#ff5252] text-white px-4 py-1.5 rounded-sm text-xs font-semibold shadow-md hover:bg-red-600 uppercase tracking-wide"
                            onClick={() => {
                              removeCartItem(product)
                            }}>
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4">
            <button className="bg-[#ff9800] text-white px-5 py-2 rounded-sm shadow-md hover:bg-orange-500 text-xs font-bold uppercase tracking-wider"
              onClick={() => {
                submitOrder(userInfor.email)
              }}>
              Submit Order
            </button>
          </div>
        </>
      )}
    </div>
  );
}
