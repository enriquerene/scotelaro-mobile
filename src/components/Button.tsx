import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import colors from '../shared/colors';

interface ButtonProps {
  title: string;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <View style={buttonStyle.container}>
      <TouchableOpacity style={buttonStyle.button} onPress={() => onClick()}>
        <Text style={buttonStyle.text}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const buttonStyle = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  text: {
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
    paddingVertical: 12,
    fontWeight: 'bold',
  },
});

export default Button;
