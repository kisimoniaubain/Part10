import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react-native';
import SignInContainer from '../components/SignInContainer';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      const onSubmit = jest.fn();

      await render(<SignInContainer onSubmit={onSubmit} />);

      const usernameInput = screen.getByPlaceholderText('Username');
      const passwordInput = screen.getByPlaceholderText('Password');
      const signInButton = screen.getByText('Sign in');

      await fireEvent.changeText(usernameInput, 'kalle');
      await fireEvent.changeText(passwordInput, 'password');
      await fireEvent.press(signInButton);

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit).toHaveBeenCalledWith({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});