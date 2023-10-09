import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { fetch } from 'cross-fetch';

import { AuthProvider } from '~/context/AuthProvider';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

const LOCAL_SYSTEM_IP_ADDRESS = '10.10.10.99'; // change this with your own ip address
const PORT = 4000;

const devUrl = `http://${LOCAL_SYSTEM_IP_ADDRESS}:${PORT}/graphql`;
const prodUrl = 'https://destamp-cpu.onrender.com/graphql';

const client = new ApolloClient({
  link: createHttpLink({
    uri: devUrl,
    fetch,
  }),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          travelerTrips: {
            merge(_, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

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
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AutocompleteDropdownContextProvider>
        <AuthProvider>
          <ApolloProvider client={client}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </ApolloProvider>
        </AuthProvider>
      </AutocompleteDropdownContextProvider>
    </ThemeProvider>
  );
}
