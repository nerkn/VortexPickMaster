import { create } from "zustand";

type ToastStore = {
  toasts: string[];
  add: (msg: string) => void;
};

export const useToast = create<ToastStore>()((set) => ({
  toasts: [],
  add(what: string) {
    set((s) => ({ toasts: [...s.toasts, what] }));
    setTimeout(
      () =>
        set((s) => {
          s.toasts.shift();
          return { toasts: s.toasts };
        }),
      10000
    );
  },
}));
