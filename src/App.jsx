// App.jsx
import React, { useEffect } from "react";
import BlockRenderer from "./components/BlockRenderer";
import useBlockStore from "./components/store"; 

function App() {
  const { blocks, addBlock, updateBlock, removeBlock, loadBlocks } = useBlockStore();

  // Load from localStorage

useEffect(() => {
  const saved = localStorage.getItem("pageBlocks");
  if (saved) {
    loadBlocks(JSON.parse(saved));
  }
}, []); // only run once

// Save to localStorage on change
useEffect(() => {
  localStorage.setItem("pageBlocks", JSON.stringify(blocks));
}, [blocks]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      {/* Title */}
      <h2 className="text-3xl font-bold text-center mb-6">
        Let's Build Something Unique 
      </h2>

      {/* Toolbar */}
      <div className="flex gap-2 mb-6 justify-center">
        <button
          onClick={() =>
            addBlock({
              id: Date.now().toString(),
              type: "text",
              content: "Write here...",
            })
          }
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          + Text
        </button>
        <button
          onClick={() =>
            addBlock({
              id: Date.now().toString(),
              type: "image",
              src: "https://www.famousbaldpeople.com/wp-content/uploads/2016/12/Homer-Simpson.jpg",
            })
          }
          className="bg-green-500 text-white px-3 py-1 rounded "
        >
          + Image
        </button>
        <button
          onClick={() =>
            addBlock({
              id: Date.now().toString(),
              type: "video",
              src: "",
            })
          }
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          + Video
        </button>
      </div>

      {/* Render Blocks */}
      <div className="space-y-6">
        {blocks.map((block) => (
          <div key={block.id} className="border p-4 rounded shadow">
            <BlockRenderer block={block} updateBlock={updateBlock} />
            <button
              onClick={() => removeBlock(block.id)}
              className="text-sm text-red-500 mt-2"
            >
              Delete Block
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
