import { Text as NativeText } from 'react-native';

const Text = ({ children, ...props }) => {
  return (
    <NativeText {...props}>
      {children}
    </NativeText>
  );
};

export default Text;