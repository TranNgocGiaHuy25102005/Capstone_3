import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetailAction } from "../redux/slices/productSlice";
import { addToCart } from "../redux/slices/cartSlice";
import useCartStore from './../zustand/cartStore';

export default function Detail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail } = useSelector((state) => state.productReducer);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1)
  const { addCartItem } = useCartStore()

  useEffect(() => {
    dispatch(fetchProductDetailAction(id));
  }, [id, dispatch]);

  function increaseQuantity() {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
  }
  function reduceQuantity() {
    const newQuantity = quantity - 1
    if(newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  if (!productDetail)
    return <div className="text-center mt-10">Đang tải...</div>;

  return (
    <div className="container mx-auto mt-10 flex gap-10">
      <div className="w-1/3 p-4 bg-gray-50 flex items-center justify-center">
        <img
          src={productDetail.image}
          alt={productDetail.name}
          className="w-full"
        />
      </div>

      <div className="w-2/3">
        <h2 className="text-3xl font-bold mb-2">{productDetail.name}</h2>
        <p className="text-gray-600 mb-4">{productDetail.description}</p>

        <h3 className="text-lg text-green-500 font-semibold mb-2">
          Available size
        </h3>
        <div className="flex gap-2 mb-6">
          {productDetail.size?.map((size, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded font-bold"
            >
              {size}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-[#7b8df2] text-white w-8 h-8 flex items-center justify-center text-xl font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
            onClick={increaseQuantity}>
            +
          </button>
          <span className="text-gray-800 font-bold text-lg px-1">{quantity}</span>
          <button className="bg-[#7b8df2] text-white w-8 h-8 flex items-center justify-center text-xl font-medium cursor-pointer hover:bg-indigo-500 transition-colors"
            onClick={reduceQuantity}>
            -
          </button>
        </div>

        <div className="text-red-500 text-3xl font-bold mb-4">
          {productDetail.price}$
        </div>

        <div className="flex items-center gap-4">
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded text-lg font-bold hover:bg-blue-700 transition"
            onClick={() => {
              addCartItem(productDetail, quantity)
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
