import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeQuantity, removeItem, clearCart } from '../redux/slices/cartSlice';
import axios from 'axios';

export default function Carts() {
  const { cartList } = useSelector(state => state.cartReducer);
  const { currentUser } = useSelector(state => state.userReducer);
  const dispatch = useDispatch();

  const handleOrder = async () => {
    if (!currentUser) {
      alert('Vui lòng đăng nhập để đặt hàng!');
      return;
    }
    
    const orderData = {
      orderDetail: cartList.map(item => ({
        productId: item.id,
        quantity: item.quantityCart
      })),
      email: currentUser.email
    };

    try {
      await axios.post('https://shop.cyberlearn.vn/api/Users/order', orderData);
      alert('Đặt hàng thành công!');
      dispatch(clearCart());
    } catch (error) {
      alert('Đặt hàng thất bại!');
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-3xl font-bold mb-6">Carts</h2>
      
      <table className="w-full text-left border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Price</th>
            <th className="p-3 border">Quantity</th>
            <th className="p-3 border">Total</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartList.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="p-3 border"><img src={item.image} alt={item.name} className="w-16" /></td>
              <td className="p-3 border font-semibold">{item.name}</td>
              <td className="p-3 border">{item.price}$</td>
              <td className="p-3 border flex items-center gap-2 mt-3">
                <button onClick={() => dispatch(changeQuantity({id: item.id, quantity: -1}))} className="px-3 bg-blue-500 text-white rounded">-</button>
                <span className="font-bold">{item.quantityCart}</span>
                <button onClick={() => dispatch(changeQuantity({id: item.id, quantity: 1}))} className="px-3 bg-blue-500 text-white rounded">+</button>
              </td>
              <td className="p-3 border font-bold text-red-500">{item.price * item.quantityCart}$</td>
              <td className="p-3 border">
                <button onClick={() => dispatch(removeItem(item.id))} className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-6 flex justify-end">
        <button onClick={handleOrder} className="bg-yellow-500 text-white font-bold px-8 py-3 rounded text-lg">
          SUBMIT ORDER
        </button>
      </div>
    </div>
  );
}