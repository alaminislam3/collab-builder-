import { create } from "zustand";

const useBlockStore = create((set) => ({
  blocks: [],

  addBlock: (block) =>
    set((state) => ({ blocks: [...state.blocks, block] })),

  updateBlock: (id, newData) =>
    set((state) => ({
      blocks: state.blocks.map((b) =>
        b.id === id ? { ...b, ...newData } : b
      ),
    })),

  removeBlock: (id) =>
    set((state) => ({
      blocks: state.blocks.filter((b) => b.id !== id),
    })),

    loadBlocks: (savedBlocks) => {
      console.log("Loading from storage:", savedBlocks);
      set({ blocks: savedBlocks });
    },
    
}));

export default useBlockStore;
