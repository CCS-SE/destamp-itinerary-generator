import React, { useEffect } from 'react';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ClerkProvider } from '@clerk/clerk-expo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { supabase } from 'config/initSupabase';
import { fetch } from 'cross-fetch';

import { AuthProvider } from '~/context/AuthProvider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const URL = 'https://cpu-destamp.onrender.com';

// const LOCAL_SYSTEM_IP_ADDRESS = '192.168.1.3';
// const PORT = 4000;

const httpLink = createHttpLink({
  uri: URL,
  // uri: `http://${LOCAL_SYSTEM_IP_ADDRESS}:${PORT}/graphql`,
  fetch,
});

const authLink = setContext(async (_, { headers }) => {
  const token = (await supabase.auth.getSession()).data.session?.access_token;

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins: require('../../assets/fonts/Poppins-Regular.ttf'),
    PoppinsThin: require('../../assets/fonts/Poppins-Thin.ttf'),
    PoppinsMedium: require('../../assets/fonts/Poppins-Medium.ttf'),
    PoppinsBold: require('../../assets/fonts/Poppins-Bold.ttf'),
    PoppinsBlack: require('../../assets/fonts/Poppins-Black.ttf'),
    PoppinsSemiBold: require('../../assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsExtraBold: require('../../assets/fonts/Poppins-ExtraBold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ThemeProvider value={DefaultTheme}>
      <AutocompleteDropdownContextProvider>
        <AuthProvider>
          <ClerkProvider
            publishableKey={
              Constants.expoConfig?.extra?.CLERK_PUBLISHABLE_KEY as string
            }
          >
            <ApolloProvider client={client}>
              <Stack>
                <Stack.Screen
                  name="business/(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="traveler/(tabs)"
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack>
            </ApolloProvider>
          </ClerkProvider>
        </AuthProvider>
      </AutocompleteDropdownContextProvider>
    </ThemeProvider>
  );
}

export { RootLayoutNav };
