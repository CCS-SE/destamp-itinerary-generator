import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type setType = { userId: string; isPremium: boolean; tripCount: number };

interface State {
  userId: string;
  isPremium: boolean;
  tripCount: number;
  setUser: ({ userId, isPremium, tripCount }: setType) => void;
}

export const initialFormState = {
  userId: '',
  isPremium: false,
  tripCount: 0,
};

const userStore = create<State>()(
  devtools((set) => ({
    ...initialFormState,
    setUser: ({ userId, isPremium, tripCount }) =>
      set((state) => ({
        ...state,
        userId: userId,
        isPremium: isPremium,
        tripCount: tripCount,
      })),
  })),
);

export default userStore;
