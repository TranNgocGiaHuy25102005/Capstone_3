import React, { useEffect, useState } from "react";
import useProductStore from "./../zustand/productStore";

export default function Search() {
  const { products, getProducts, setKeyword, keywords } = useProductStore();
  const [searchInput, setSearchInput] = useState(keywords || "");
  useEffect(() => {
    getProducts();
    console.log(products);
  }, [keywords]);
  const handleSearch = () => {
    setKeyword(searchInput);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="mb-6 space-y-2">
        <label className="block text-sm text-gray-800 font-medium">
          Search
        </label>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="product name ...."
            className="w-80 px-4 py-2 bg-[#d9d9d9] text-gray-800 outline-none rounded-sm"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-full uppercase text-sm transition-colors"
            onClick={handleSearch}
          >
            SEARCH
          </button>
        </div>
      </div>

      <div className="w-full bg-gradient-to-r from-purple-800 via-purple-600 to-pink-500 py-3 px-6 mb-8 rounded-sm">
        <h1 className="text-2xl text-white font-medium">Search result</h1>
      </div>

      <div className="mb-8 w-64 space-y-2">
        <label className="block text-sm text-gray-800 font-medium">Price</label>
        <select className="w-full px-4 py-2 bg-[#d9d9d9] text-gray-800 outline-none rounded-sm cursor-pointer">
          <option value="decrease">decrease</option>
          <option value="ascending">ascending</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products && products.length > 0 ? (
          products.map((item, index) => (
            <div key={item.id || index} className="bg-white rounded border border-gray-100 shadow-sm overflow-hidden flex flex-col justify-between">
              <div className="p-6 flex flex-col items-center">
                <img
                  src={item.image || "https://assets.adidas.com/images/w_600,f_auto,q_auto/b58fae4f8d674b7891faab3700cd1192_9366/Giay_Prophere_den_BD7834_01_standard.jpg"}
                  alt={item.name}
                  className="h-40 object-contain my-2"
                />
                <div className="w-full text-left mt-4">
                  <h2 className="text-lg font-medium text-gray-800">
                    {item.name || "Adidas Prophere"}
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">{item.shortDescription || "short descript ..."}</p>
                </div>
              </div>
              <div className="flex h-12">
                <button className="w-1/2 bg-[#e0a855] hover:bg-[#d09744] text-gray-800 font-medium flex items-center justify-center transition-colors">
                  Buy now
                </button>
                <div className="w-1/2 bg-[#d9d9d9] text-gray-800 font-medium flex items-center justify-center">
                  {item.price}$
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
}