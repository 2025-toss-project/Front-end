import { create } from "zustand";

interface CategoryStore {
  selectCategory: string;
  setSelectCategory: (name: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useCategoryInfo = create<CategoryStore>((set) => ({
  selectCategory: "",
  setSelectCategory: (name) => set({ selectCategory: name }),
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));
