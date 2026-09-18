import { Text as NativeText } from 'react-native';
import theme from '../theme';

const Text = ({ style, children, ...props }) => {
  return (
    <NativeText
      style={[{ fontFamily: theme.fonts.main }, style]}
      {...props}
    >
      {children}
    </NativeText>
  );
};

export default Text;