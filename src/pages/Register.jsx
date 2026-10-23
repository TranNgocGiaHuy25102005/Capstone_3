import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerAction } from '../redux/slices/userSlice';

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
    phone: '',
    gender: true 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'gender' ? value === 'true' : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }

    const { passwordConfirm, ...submitData } = formData;

    try {
      await dispatch(registerAction(submitData)).unwrap();
      alert('Đăng ký thành công! Chuyển sang trang Đăng nhập...');
      navigate('/login');
    } catch (error) {
      alert('Đăng ký thất bại! Email có thể đã được sử dụng.');
    }
  };

  return (
    <div className="container mx-auto mt-10 max-w-2xl mb-10">
      <h2 className="text-4xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="border p-6 rounded shadow-md grid grid-cols-2 gap-6">
        
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input type="email" name="email" onChange={handleChange} className="w-full border rounded p-2" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input type="password" name="password" onChange={handleChange} className="w-full border rounded p-2" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Password confirm</label>
            <input type="password" name="passwordConfirm" onChange={handleChange} className="w-full border rounded p-2" required />
          </div>
        </div>

        <div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name</label>
            <input type="text" name="name" onChange={handleChange} className="w-full border rounded p-2" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Phone</label>
            <input type="text" name="phone" onChange={handleChange} className="w-full border rounded p-2" required />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Gender</label>
            <div className="flex gap-4 mt-3">
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="true" onChange={handleChange} defaultChecked /> Male
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="gender" value="false" onChange={handleChange} /> Female
              </label>
            </div>
          </div>

          <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 mt-2 rounded hover:bg-indigo-700">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}