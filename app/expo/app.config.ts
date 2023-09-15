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
  slug: 'expo',
  scheme: 'expo',
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
