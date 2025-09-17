// src/components/blocks/ImageBlock.jsx
import React from "react";

function ImageBlock({ block, removeBlock }) {
  return (
    <div className="p-2 border rounded mb-2">
      <img src={block.src} alt="Image Block" className="w-1/2" />
      <button 
        onClick={() => removeBlock(block.id)} 
        className="mt-1 text-red-500"
      >
        Delete
      </button>
    </div>
  );
}

export default ImageBlock;
