import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 mt-10">
      <div className="container mx-auto grid grid-cols-3 gap-8 py-10 px-4">
        <div>
          <h3 className="font-bold text-xl mb-4">GET HELP</h3>
          <ul className="text-gray-600 space-y-2">
            <li>Home</li>
            <li>Nike</li>
            <li>Adidas</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-xl mb-4">SUPPORT</h3>
          <ul className="text-gray-600 space-y-2">
            <li>About</li>
            <li>Contact</li>
            <li>Help</li>
            <li>Phone</li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-xl mb-4">REGISTER</h3>
          <ul className="text-gray-600 space-y-2">
            <li>Register</li>
            <li>Login</li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-300 text-center py-4 text-gray-700 font-semibold">
        © 2026 CyberSoft All Rights Reserved | Design Theme by Truong Tan Khai
      </div>
    </footer>
  );
}