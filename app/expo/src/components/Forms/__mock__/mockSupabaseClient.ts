export const mockSupabaseClient = {
  auth: {
    signInWithPassword: jest.fn((email: string, password: string) => {
      if (email != 'shemjehrojondanero@gmail.com' || password != 'shemjehro') {
        return {
          error: {
            name: 'AuthApiError',
          },
        };
      } else {
        return {
          error: null,
        };
      }
    }),
    signUp: jest.fn(() => ({
      error: null,
    })),
  },
  error: null,
};
