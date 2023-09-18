import { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { StatusBar } from 'expo-status-bar';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function FacebookLogin() {
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: '264325039833558',
  });

  useEffect(() => {
    if (response && response.type === 'success' && response.authentication) {
      (async () => {
        const userInfoResponse = await fetch(
          `https://graph.facebook.com/me?access_token=${response.authentication?.accessToken}&fields=id,name,picture.type(large)}`,
        );
        const userInfo = await userInfoResponse.json();
        setUser(userInfo);
      })();
    }
  }, [response]);

  const handlePressAsync = async () => {
    const result = await promptAsync();
    if (result.type !== 'success') {
      alert('Something went wrong');
      return;
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <Profile user={user} />
      ) : (
        <Button
          disabled={!request}
          title="Sign in with facebook"
          onPress={handlePressAsync}
        />
      )}
    </View>
  );
}

function Profile({ user }) {
  return (
    <View>
      <Image source={{ uri: user.picture.data.url }} style={styles.image} />
      <Text style={styles.name}>{user.name}</Text>
      <Text> ID: {user.id}</Text>
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
  profile: {
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});

// exp+destamp-app://expo-development-client/?url=http%3A%2F%2F192.168.254.108%3A8081
