import React, { useState, useEffect } from "react";
import { useAuth } from "../zustand/authStore.js";

export default function Profile() {
  const { userInfor, isCheckingAuth, updateUserinfor, orders, getOrders, setUserInfor } = useAuth();
  
  useEffect(() => {
    setUserInfor()
    getOrders()
  }, [])

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    password: "",
    gender: true 
  });

  console.log(orders)

  useEffect(() => {
    if (userInfor) {
      setFormData({
        name: userInfor.name || "",
        phone: userInfor.phone || "",
        password: "",
        gender: userInfor.gender === "male" || userInfor.gender === true
      });
    }
  }, [userInfor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      const dataToUpdate = {
        id: userInfor?.id || 0,
        email: userInfor?.email || "",
        password: formData.password,
        name: formData.name,
        gender: formData.gender,
        phone: formData.phone
      };

      await updateUserinfor(dataToUpdate);
      alert("Cập nhật thông tin thành công!");
    } catch (error) {
      console.error(error);
      alert("Cập nhật thông tin thất bại. Vui lòng thử lại!");
    }
  };

  if (isCheckingAuth) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-gradient-to-r from-purple-700 to-pink-500 text-white p-3 mb-8 w-1/3">
        <h1 className="text-2xl font-semibold">Profile</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8 mb-12 items-start">
        <div className="w-32 h-32 rounded-full overflow-hidden shrink-0 border-4 border-gray-200">
          <img
            src={userInfor?.avatar || "https://i.pravatar.cc/150?u=a042581f4e29026704d"}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 w-full">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Email</label>
              <input
                type="email"
                placeholder="email"
                value={userInfor?.email || ""}
                disabled
                className="w-full bg-gray-100 p-2 rounded outline-none border-none text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Phone</label>
              <input
                type="text"
                name="phone"
                placeholder="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-gray-100 p-2 rounded outline-none border-none text-gray-700"
              />
            </div>
          </div>
          
          <div className="space-y-4 relative">
            <div>
              <label className="block text-sm text-gray-500 mb-1">Name</label>
              <input
                type="text"
                name="name" 
                placeholder="name"
                value={formData.name} 
                onChange={handleChange} 
                className="w-full bg-gray-100 p-2 rounded outline-none border-none text-gray-700"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-500 mb-1">Password</label>
              <input
                type="password"
                name="password"
                placeholder="********"
                value={formData.password} 
                onChange={handleChange}
                className="w-full bg-gray-100 p-2 rounded outline-none border-none text-gray-700"
              />
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-500">Gender</span>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === true}
                    onChange={() => setFormData({ ...formData, gender: true })}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <span className="text-xs text-gray-500">Male</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === false}
                    onChange={() => setFormData({ ...formData, gender: false })}
                    className="w-4 h-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <span className="text-xs text-gray-500">Female</span>
                </label>
              </div>
              
              <button 
                onClick={handleUpdate}
                className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-1.5 rounded-full text-sm font-medium transition-colors"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex border-b border-gray-200 mb-8">
        <button className="px-6 py-2 text-pink-500 font-medium text-lg border-b-2 border-pink-500">
          Order history
        </button>
        <button className="px-6 py-2 text-gray-600 font-medium text-lg hover:text-gray-800 transition-colors">
          Favourite
        </button>
      </div>
      
      <div className="space-y-8">
        {orders && orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={order.id || index}>
              <h3 className="text-purple-600 text-sm mb-2 font-medium">
                + Orders have been placed on {order.date ? new Date(order.date).toLocaleDateString("en-US") : "N/A"}
              </h3>
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 text-sm">
                      <th className="p-3 w-16 text-center">id</th>
                      <th className="p-3 w-24 text-center">img</th>
                      <th className="p-3">name</th>
                      <th className="p-3">price</th>
                      <th className="p-3 text-center">quantity</th>
                      <th className="p-3">total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Map qua mảng chi tiết sản phẩm của mỗi order, tùy chỉnh 'orderDetail' thành tên mảng thực tế từ API của bạn nếu cần */}
                    {order.orderDetail?.map((item, idx) => (
                      <tr key={idx} className="border-b border-gray-100">
                        <td className="p-3 text-center text-sm">{item.id || idx + 1}</td>
                        <td className="p-3 text-center">
                          <div className="w-12 h-12 bg-gray-100 mx-auto flex items-center justify-center overflow-hidden">
                            {item.image || item.img ? (
                              <img 
                                src={item.image || item.img} 
                                alt={item.name} 
                                className="w-full h-full object-cover" 
                              />
                            ) : (
                              <span className="text-xs text-gray-400">Giày</span>
                            )}
                          </div>
                        </td>
                        <td className="p-3 text-sm">{item.name || "Product Name"}</td>
                        <td className="p-3 text-sm">{item.price?.toLocaleString()}</td>
                        <td className="p-3 text-center">
                          <span className="bg-gray-200 px-3 py-1 rounded text-sm">
                            {item.quantity || 1}
                          </span>
                        </td>
                        <td className="p-3 text-sm">
                          {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-4">
            Bạn chưa có lịch sử đặt hàng nào.
          </div>
        )}
      </div>
      
      {orders && orders.length > 0 && (
        <div className="flex justify-end mt-8">
          <nav className="inline-flex items-center gap-1">
            <button className="p-1.5 border border-gray-300 rounded text-gray-400 hover:bg-gray-50 bg-gray-100 cursor-not-allowed">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="px-2.5 py-1 border border-purple-500 text-purple-600 rounded">1</button>
            <button className="px-2.5 py-1 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded">2</button>
            <span className="px-2.5 py-1 text-gray-400">...</span>
            <button className="px-2.5 py-1 border border-gray-300 text-gray-600 hover:bg-gray-50 rounded">10</button>
            <button className="p-1.5 border border-gray-300 rounded text-gray-600 hover:bg-gray-50">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}