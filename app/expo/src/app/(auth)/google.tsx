import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { AuthSessionResult } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GoogleSignIn() {
  const [userInfo, setUserInfo] = useState<any>(null);

  // Call Google.useAuthRequest to get the request and response objects
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      '132131926000-ov9froqbabvbrq1mfikb53ia079pjalt.apps.googleusercontent.com',
  });

  useEffect(() => {
    hangleSignInWithGoogle();
  }, [response]);

  async function hangleSignInWithGoogle() {
    const user = await AsyncStorage.getItem('@user');
    if (!user) {
      if (response) {
        if (response.type === 'success') {
          const idToken = response.params?.id_token;
          if (idToken) {
            getUserInfo(idToken);
          }
        }
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  const getUserInfo = async (idToken: string) => {
    if (!idToken) return;
    try {
      const response = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: { Authorization: `Bearer ${idToken}` },
        },
      );

      const user = await response.json();
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* <Text>{JSON.stringify(userInfo)}</Text> */}
      <Text>Google</Text>
      <Button title="Sign in with Google" onPress={() => promptAsync?.()} />
      <Button
        title="Delete local storage"
        onPress={async () => {
          await AsyncStorage.removeItem('@user');
          setUserInfo(null);
        }}
      />
      {/* <StatusBar style="auto"/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
