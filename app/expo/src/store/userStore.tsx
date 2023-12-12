import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type setType = { userId: string; isPremium: boolean };

interface State {
  userId: string;
  isPremium: boolean;
  setUser: ({ userId, isPremium }: setType) => void;
}

export const initialFormState = {
  userId: '',
  isPremium: false,
};

const userStore = create<State>()(
  devtools((set) => ({
    ...initialFormState,
    setUser: ({ userId, isPremium }) =>
      set((state) => ({
        ...state,
        userId: userId,
        isPremium: isPremium,
      })),
  })),
);

export default userStore;
