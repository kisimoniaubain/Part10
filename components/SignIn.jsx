import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 5,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#d73a4a',
  },
  error: {
    color: '#d73a4a',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#0366d6',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [touched, setTouched] = useState({
    username: false,
    password: false,
  });

  const usernameError =
    touched.username && username.length === 0
      ? 'Username is required'
      : null;

  const passwordError =
    touched.password && password.length === 0
      ? 'Password is required'
      : null;

  const onSubmit = () => {
    const values = {
      username,
      password,
    };

    console.log(values);
  };

  const handleSubmit = () => {
    setTouched({
      username: true,
      password: true,
    });

    if (username.length === 0 || password.length === 0) {
      return;
    }

    onSubmit();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          usernameError && styles.inputError,
        ]}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        onBlur={() =>
          setTouched((previous) => ({
            ...previous,
            username: true,
          }))
        }
      />

      {usernameError && (
        <Text style={styles.error}>{usernameError}</Text>
      )}

      <TextInput
        style={[
          styles.input,
          passwordError && styles.inputError,
        ]}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        onBlur={() =>
          setTouched((previous) => ({
            ...previous,
            password: true,
          }))
        }
      />

      {passwordError && (
        <Text style={styles.error}>{passwordError}</Text>
      )}

      <Pressable style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;