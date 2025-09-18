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
            onChange={(e) => updateBlock(block.id, { content: e.target.value })}
            className="border p-2 w-full"
          />
        </div>
      );

    case "image":
      return (
        <div>
          {block.src ? (
            <img src={block.src} alt="uploaded" className="w-full h-auto" />
          ) : (
            <input
              type="text"
              placeholder="paste your hosted url "
              onBlur={(e) => updateBlock(block.id, { src: e.target.value })}
              className="border p-2 w-full"
            />
          )}
        </div>
      );

    case "video":
      return (
        <div>
          {block.src ? (
            <iframe
              width="560"
              height="315"
              src={block.src}
              title="video"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <input
              type="text"
              placeholder="Paste video link..."
              onBlur={(e) => updateBlock(block.id, { src: e.target.value })}
              className="border p-2 w-full"
            />
          )}
        </div>
      );

    default:
      return <div>Unknown Block</div>;
  }
}

export default BlockRenderer;
