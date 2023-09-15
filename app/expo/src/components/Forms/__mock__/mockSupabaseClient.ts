export const mockSupabaseClient = {
  auth: {
    signInWithPassword: jest.fn(() => ({
      error: null,
    })),
  },
  error: null,
};
