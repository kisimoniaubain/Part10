import { useMutation } from '@apollo/client';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';
import { useNavigate } from 'react-router-native';
import { CREATE_USER } from '../graphql/mutations';
import useSignIn from '../hooks/useSignIn';

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
  serverError: {
    color: '#d73a4a',
    marginBottom: 15,
    fontSize: 15,
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

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required')
    .min(5, 'Username must be between 5 and 30 characters')
    .max(30, 'Username must be between 5 and 30 characters'),

  password: yup
    .string()
    .required('Password is required')
    .min(5, 'Password must be between 5 and 50 characters')
    .max(50, 'Password must be between 5 and 50 characters'),

  passwordConfirmation: yup
    .string()
    .required('Password confirmation is required')
    .oneOf(
      [yup.ref('password')],
      'Password confirmation does not match password',
    ),
});

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirmation: '',
    },

    validationSchema,

    onSubmit: async (values, { setStatus }) => {
      setStatus(undefined);

      try {
        await createUser({
          variables: {
            user: {
              username: values.username,
              password: values.password,
            },
          },
        });

        await signIn({
          username: values.username,
          password: values.password,
        });

        navigate('/');
      } catch (error) {
        setStatus(
          error.message || 'Sign up failed',
        );
      }
    },
  });

  return (
    <View style={styles.container}>
      {formik.status && (
        <Text style={styles.serverError}>
          {formik.status}
        </Text>
      )}

      <TextInput
        style={[
          styles.input,
          formik.touched.username &&
            formik.errors.username &&
            styles.inputError,
        ]}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        autoCapitalize="none"
      />

      {formik.touched.username &&
        formik.errors.username && (
          <Text style={styles.error}>
            {formik.errors.username}
          </Text>
        )}

      <TextInput
        style={[
          styles.input,
          formik.touched.password &&
            formik.errors.password &&
            styles.inputError,
        ]}
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        secureTextEntry
      />

      {formik.touched.password &&
        formik.errors.password && (
          <Text style={styles.error}>
            {formik.errors.password}
          </Text>
        )}

      <TextInput
        style={[
          styles.input,
          formik.touched.passwordConfirmation &&
            formik.errors.passwordConfirmation &&
            styles.inputError,
        ]}
        placeholder="Password confirmation"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange(
          'passwordConfirmation',
        )}
        onBlur={formik.handleBlur('passwordConfirmation')}
        secureTextEntry
      />

      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={styles.error}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}

      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>
          Sign up
        </Text>
      </Pressable>
    </View>
  );
};

export default SignUp;