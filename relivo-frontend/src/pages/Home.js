// src/pages/Home.js
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="font-sans">

      {/* 1️⃣ Hero Banner */}
      <div className="relative bg-gradient-to-r from-blue-800 to-blue-600 text-white h-screen flex items-center justify-center" 
           style={{ backgroundImage: 'url("/images/donation-bg.jpg")', backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="text-center bg-black bg-opacity-50 p-10 rounded-lg shadow-xl">
          <h1 className="text-6xl font-extrabold mb-6 animate-pulse">Help Those in Need</h1>
          <p className="text-xl mb-8">Track your donations and see the impact in real-time</p>
          <div className="flex justify-center gap-4">
            <a href="/donations" className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 px-6 py-3 rounded-full font-semibold shadow-lg transform hover:scale-105 transition duration-300">
              Donate Now
            </a>
            <a href="/map" className="bg-white text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-200 transform hover:scale-105 transition duration-300">
              Track Donations
            </a>
          </div>
        </div>
      </div>

      {/* 2️⃣ Statistics Section */}
      <div className="py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">Impact So Far</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white shadow-lg rounded-xl text-center hover:shadow-2xl transform hover:scale-105 transition duration-300" data-aos="fade-right">
            <h3 className="text-5xl font-bold text-blue-600 mb-2">500+</h3>
            <p className="text-gray-700 text-lg">Families Helped</p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-xl text-center hover:shadow-2xl transform hover:scale-105 transition duration-300" data-aos="fade-up">
            <h3 className="text-5xl font-bold text-green-600 mb-2">$120K</h3>
            <p className="text-gray-700 text-lg">Funds Raised</p>
          </div>
          <div className="p-8 bg-white shadow-lg rounded-xl text-center hover:shadow-2xl transform hover:scale-105 transition duration-300" data-aos="fade-left">
            <h3 className="text-5xl font-bold text-yellow-600 mb-2">800+</h3>
            <p className="text-gray-700 text-lg">Donations Made</p>
          </div>
        </div>
      </div>

      {/* 3️⃣ Live Map Section */}
      <div className="py-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-8" data-aos="fade-up">Track Your Donations</h2>
        <div 
          className="max-w-5xl mx-auto h-96 shadow-lg rounded-xl overflow-hidden cursor-pointer flex items-center justify-center bg-gray-100 hover:shadow-2xl transition duration-300"
          onClick={() => window.location.href="/map"} data-aos="zoom-in">
          <p className="text-gray-500 text-lg">Map Preview (click to view full map)</p>
        </div>
      </div>

      {/* 4️⃣ Past Disasters / News Section */}
      <div className="py-20 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">Recent Disasters & News</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300" data-aos="fade-right">
            <h3 className="text-xl font-semibold mb-2">Flood in Kerala</h3>
            <p className="text-gray-600 mb-2">August 2024</p>
            <a href="#" className="text-blue-600 hover:underline">Read News</a>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300" data-aos="fade-up">
            <h3 className="text-xl font-semibold mb-2">Cyclone in Odisha</h3>
            <p className="text-gray-600 mb-2">May 2025</p>
            <a href="#" className="text-blue-600 hover:underline">Read News</a>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-2xl transition duration-300" data-aos="fade-left">
            <h3 className="text-xl font-semibold mb-2">Earthquake in Assam</h3>
            <p className="text-gray-600 mb-2">January 2025</p>
            <a href="#" className="text-blue-600 hover:underline">Read News</a>
          </div>
        </div>
      </div>

      {/* 5️⃣ Testimonials / Reviews Section */}
      <div className="py-20 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12" data-aos="fade-up">Stories of Hope</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300" data-aos="fade-right">
            <p className="italic">"Thanks to Relivo, our family received essential supplies when the flood hit. Forever grateful!"</p>
            <p className="mt-4 font-bold">– Family 1</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300" data-aos="fade-left">
            <p className="italic">"The donations reached us on time. My children are safe and happy."</p>
            <p className="mt-4 font-bold">– Family 2</p>
          </div>
        </div>
      </div>

      {/* 6️⃣ Chatbot Button */}
      <div className="fixed bottom-4 right-4">
        <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-5 py-3 rounded-full shadow-xl hover:from-blue-600 hover:to-blue-800 transition transform hover:scale-110">
          Chat
        </button>
      </div>

    </div>
  );
}

export default Home;
