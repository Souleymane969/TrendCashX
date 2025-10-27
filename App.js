import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import NFTs from "./pages/NFTs";
import Mint from "./pages/Mint";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-green-700 via-yellow-400 to-green-600 text-white">
        <Navbar />
        <main className="p-4 mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/nfts" element={<NFTs />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
