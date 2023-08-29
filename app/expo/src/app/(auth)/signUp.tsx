import { useState } from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';

import { supabase } from '../../../config/initSupabase';

const SignUpScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hidePassword, sethidePassword] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword2, sethidePassword2] = useState(true);

  const handleSignUp = async () => {
    setLoading(true);

    if (password == confirmPassword) {
      const { error } = await supabase.auth.signUp({ email, password });

      if (error) Alert.alert('Error signing up', error.message);
      else
        Alert.alert(
          'Your account is ready! Please check your email for confirmation.',
        );
      setLoading(false);
    } else {
      Alert.alert('Error signing up', 'Passwords do not match');
    }
  };

  //add spinner if (loading)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.password}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword}
        />
        <TouchableOpacity onPress={() => sethidePassword(!hidePassword)}>
          {hidePassword ? (
            <Entypo style={styles.icon} name="eye" size={24} color="black" />
          ) : (
            <Entypo
              style={styles.icon}
              name="eye-with-line"
              size={24}
              color="black"
            />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.password}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={hidePassword2}
        />
        <TouchableOpacity onPress={() => sethidePassword2(!hidePassword2)}>
          {hidePassword2 ? (
            <Entypo style={styles.icon} name="eye" size={24} color="black" />
          ) : (
            <Entypo
              style={styles.icon}
              name="eye-with-line"
              size={24}
              color="black"
            />
          )}
        </TouchableOpacity>
      </View>

      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  password: {
    flex: 1,
  },
  icon: {
    paddingTop: 5,
  },
});

export default SignUpScreen;
