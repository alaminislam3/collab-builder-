// BlockRenderer.jsx
import React from "react";

function BlockRenderer({ block, updateBlock }) {
  switch (block.type) {
    case "text":
      return (
        <div>
          <input
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            className="border p-2 w-full"
          />
        </div>
      );

    case "image":
      return (
        <div>
          <img src={block.src} alt="uploaded" className="w-full h-auto" />
        </div>
      );

    case "video":
      return (
        <div>
          <iframe
            width="560"
            height="315"
            src={block.src}
            title="video"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      );

    default:
      return <div>Unknown Block</div>;
  }
}

export default BlockRenderer;
