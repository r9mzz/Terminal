import { create } from 'zustand';

interface AppState {
  lastOpened: { type: string; id: number; titre: string } | null;
  setLastOpened: (v: AppState['lastOpened']) => void;
}

export const useAppStore = create<AppState>((set) => ({
  lastOpened: null,
  setLastOpened: (v) => set({ lastOpened: v }),
}));
