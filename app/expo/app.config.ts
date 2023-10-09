import type { ExpoConfig } from '@expo/config';
import * as dotenv from 'dotenv';

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;
const CLERK_PUBLISHABLE_KEY = process.env.CLERK_PUBLISHABLE_KEY;

if (typeof SUPABASE_URL !== 'string' || typeof SUPABASE_ANON_KEY !== 'string') {
  throw new Error('Missing Supabase URL or anonymous key');
}

if (typeof CLERK_PUBLISHABLE_KEY !== 'string') {
  throw new Error('Missing Clerk Publishable key');
}

if (typeof MAPBOX_API_KEY !== 'string') {
  throw new Error('Missing Mapbox API key');
}

const defineConfig = (): ExpoConfig => ({
  name: 'Destamp',
  slug: 'expo',
  scheme: 'expo',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  userInterfaceStyle: 'light',
  splash: {
    image: './assets/images/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#ffffff',
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
    package: 'com.destamp.cpu.se',
    adaptiveIcon: {
      foregroundImage: './assets/images/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
  },
  extra: {
    eas: {
      projectId: 'b8267833-d96d-457b-b504-3ac20709979e',
    },
    SUPABASE_URL,
    SUPABASE_ANON_KEY,
    MAPBOX_API_KEY,
    CLERK_PUBLISHABLE_KEY,
  },
  experiments: {
    tsconfigPaths: true,
    typedRoutes: true,
  },
  web: {
    bundler: 'metro',
  },
  plugins: ['expo-router', './expo-plugins/with-modify-gradle.js'],
});

export default defineConfig;
