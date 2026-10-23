import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginAction } from '../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      await dispatch(loginAction(formData)).unwrap(); 
      alert('Đăng nhập thành công!');
      navigate('/'); 
    } catch (error) {
      alert('Đăng nhập thất bại: Sai email hoặc mật khẩu!');
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-md">
      <h2 className="text-4xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="border p-6 rounded shadow-md">
        
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email</label>
          <input 
            type="email" 
            name="email" 
            onChange={handleChange}
            className="w-full border rounded p-2" 
            placeholder="Nhập email" 
            required 
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2">Password</label>
          <input 
            type="password" 
            name="password" 
            onChange={handleChange}
            className="w-full border rounded p-2" 
            placeholder="Nhập password" 
            required 
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded hover:bg-indigo-700"
        >
          LOGIN
        </button>
      </form>
    </div>
  );
}