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
import { CREATE_REVIEW } from '../graphql/mutations';

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
  reviewInput: {
    minHeight: 100,
    textAlignVertical: 'top',
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
  ownerName: yup
    .string()
    .required('Repository owner name is required'),
  repositoryName: yup
    .string()
    .required('Repository name is required'),
  rating: yup
    .number()
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
  text: yup.string(),
});

const CreateReview = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      ownerName: '',
      repositoryName: '',
      rating: '',
      text: '',
    },

    validationSchema,

    onSubmit: async (values) => {
      const response = await createReview({
        variables: {
          review: {
            ownerName: values.ownerName,
            repositoryName: values.repositoryName,
            rating: Number(values.rating),
            text: values.text || undefined,
          },
        },
      });

      const repositoryId =
        response.data.createReview.repositoryId;

      navigate(`/repository/${repositoryId}`);
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.input,
          formik.touched.ownerName &&
            formik.errors.ownerName &&
            styles.inputError,
        ]}
        placeholder="Repository owner name"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
      />

      {formik.touched.ownerName &&
        formik.errors.ownerName && (
          <Text style={styles.error}>
            {formik.errors.ownerName}
          </Text>
        )}

      <TextInput
        style={[
          styles.input,
          formik.touched.repositoryName &&
            formik.errors.repositoryName &&
            styles.inputError,
        ]}
        placeholder="Repository name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
      />

      {formik.touched.repositoryName &&
        formik.errors.repositoryName && (
          <Text style={styles.error}>
            {formik.errors.repositoryName}
          </Text>
        )}

      <TextInput
        style={[
          styles.input,
          formik.touched.rating &&
            formik.errors.rating &&
            styles.inputError,
        ]}
        placeholder="Rating between 0 and 100"
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        keyboardType="numeric"
      />

      {formik.touched.rating &&
        formik.errors.rating && (
          <Text style={styles.error}>
            {formik.errors.rating}
          </Text>
        )}

      <TextInput
        style={[
          styles.input,
          styles.reviewInput,
          formik.touched.text &&
            formik.errors.text &&
            styles.inputError,
        ]}
        placeholder="Review"
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
        multiline
      />

      {formik.touched.text &&
        formik.errors.text && (
          <Text style={styles.error}>
            {formik.errors.text}
          </Text>
        )}

      <Pressable
        style={styles.button}
        onPress={formik.handleSubmit}
      >
        <Text style={styles.buttonText}>
          Create review
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;