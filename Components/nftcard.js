import React from "react";

function NFTCard({ image, title, description }) {
  return (
    <div className="bg-green-900 bg-opacity-60 rounded-2xl shadow-lg p-4 text-center hover:scale-105 transition">
      <img src={image} alt={title} className="rounded-xl mb-3 w-full h-48 object-cover" />
      <h3 className="text-yellow-400 font-bold text-lg">{title}</h3>
      <p className="text-sm mt-2">{description}</p>
    </div>
  );
}

export default NFTCard;
