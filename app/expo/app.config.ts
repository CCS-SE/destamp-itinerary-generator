import type { ExpoConfig } from '@expo/config';
import * as dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (typeof SUPABASE_URL !== 'string' || typeof SUPABASE_ANON_KEY !== 'string') {
  throw new Error('Missing Supabase URL or anonymous key');
}

const defineConfig = (): ExpoConfig => ({
  name: 'expo',
  slug: 'destamp-app',

  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/splash.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#1F104A',
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'your.bundle.identifier',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/images/splash.png',
      backgroundColor: '#1F104A',
    },
    package: 'com.destamp.login',
  },
  scheme: ['destamp-app', 'fb264325039833558'],

  extra: {
    // eas: {
    //   projectId: "ijgufbptbcpxemkduevh",
    // },
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  plugins: [
    'expo-facebook',
    'expo-router',
    './expo-plugins/with-modify-gradle.js',
  ],
});

export default defineConfig;

//  exp+destamp-app://expo-development-client/?url=http%3A%2F%2F192.168.254.108%3A8081
// https://com.destamp.login/exp+destamp-app://expo-development-client/?url=http%3A%2F%2F192.168.254.108%3A8081
