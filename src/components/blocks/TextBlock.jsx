import React from "react";
import { useStore } from "./store"; // ✅ ঠিক path বসাও

function TextBlock({ block }) {
  const updateBlock = useStore((s) => s.updateBlock);
  const removeBlock = useStore((s) => s.removeBlock);

  return (
    <div className="p-2 border rounded mb-2">
      <div
        contentEditable
        suppressContentEditableWarning
        className="outline-none"
        onInput={(e) =>
          updateBlock(block.id, { content: e.currentTarget.textContent })
        }
      >
        {block.content}
      </div>
      <button
        onClick={() => removeBlock(block.id)}
        className="mt-1 text-red-500"
      >
        Delete
      </button>
    </div>
  );
}

export default TextBlock;
