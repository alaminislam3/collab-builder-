import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import BlockRenderer from "./BlockRenderer";

const ItemType = "BLOCK";

function DraggableBlock({ block, index, moveBlock, updateBlock, removeBlock }) {
  const ref = useRef(null);

  // Drag
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // Drop
  const [, drop] = useDrop({
    accept: ItemType,
    hover: (item, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      moveBlock(dragIndex, hoverIndex);
      item.index = hoverIndex; // update index
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`border p-4 rounded shadow bg-white ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <BlockRenderer block={block} updateBlock={updateBlock} />
      <button
        onClick={() => removeBlock(block.id)}
        className="text-sm text-red-500 mt-2"
      >
        Delete Block
      </button>
    </div>
  );
}

export default DraggableBlock;
