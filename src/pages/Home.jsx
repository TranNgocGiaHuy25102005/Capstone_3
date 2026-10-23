import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductAction } from '../redux/slices/productSlice';
import { NavLink } from 'react-router-dom';

export default function Home() {
  const dispatch = useDispatch();
  const { listProduct } = useSelector((state) => state.productReducer);

  useEffect(() => {
    dispatch(fetchProductAction());
  }, [dispatch]);

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-3xl font-bold mb-6">Product Feature</h2>
      
      <div className="grid grid-cols-3 gap-6">
        {listProduct.map((item) => (
          <div className="border p-4 rounded shadow" key={item.id}>
            <div className="relative">
              <img src={item.image} alt={item.name} className="w-full" />
              <i className="fa-regular fa-heart absolute top-2 right-2 text-2xl text-red-500 cursor-pointer"></i>
            </div>
            
            <h3 className="text-xl font-semibold mt-2">{item.name}</h3>
            <p className="text-gray-500 text-sm truncate">{item.shortDescription}</p>
            
            <div className="flex justify-between items-center mt-4">
              <NavLink 
                to={`/detail/${item.id}`} 
                className="bg-yellow-400 px-6 py-2 font-semibold rounded hover:bg-yellow-500"
              >
                Buy now
              </NavLink>
              <span className="font-bold text-xl">{item.price}$</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}