// App.jsx
import React, { useEffect } from "react";
import BlockRenderer from "./components/BlockRenderer";
import useBlockStore from "./components/store"; 
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import DraggableBlock from "./components/DraggableBlock";

function App() {
  const { blocks, addBlock, updateBlock, removeBlock, loadBlocks } = useBlockStore();

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("pageBlocks");
    if (saved) {
      loadBlocks(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("pageBlocks", JSON.stringify(blocks));
  }, [blocks]);

  // Reorder function
  const moveBlock = (dragIndex, hoverIndex) => {
    const updatedBlocks = [...blocks];
    const [dragged] = updatedBlocks.splice(dragIndex, 1);
    updatedBlocks.splice(hoverIndex, 0, dragged);
    loadBlocks(updatedBlocks); // store update
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
          {blocks.map((block, index) => (
            <DraggableBlock
              key={block.id}
              index={index}
              block={block}
              moveBlock={moveBlock}
              updateBlock={updateBlock}
              removeBlock={removeBlock}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
