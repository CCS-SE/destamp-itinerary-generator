import type { Config } from 'tailwindcss';

export default {
  content: [''],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans'],
        'poppins-medium': ['PoppinsMedium'],
        'poppins-bold': ['PoppinsBold'],
        'poppins-thin': ['PoppinsThin'],
        'poppins-black': ['PoppinsBlack'],
        'poppins-semibold': ['PoppinsSemiBold'],
        'poppins-extrabold': ['PoppinsExtraBold'],
      },
    },
  },
  plugins: [],
} satisfies Config;
