import { create } from "zustand";

interface CategoryStore {
  selectName: string;
  setSelectName: (name: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useCategoryInfo = create<CategoryStore>((set) => ({
  selectName: "",
  setSelectName: (name) => set({ selectName: name }),
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));
