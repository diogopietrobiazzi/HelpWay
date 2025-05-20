import { TouchableOpacity, Text, StyleSheet } from 'react-native';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
};

export default function Button({ title, onPress, variant = 'primary' }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, variant === 'secondary' && styles.secondary]}
      onPress={onPress}
    >
      <Text style={[styles.text, variant === 'secondary' && styles.secondaryText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2D4BFF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 10,
  },
  secondary: {
    backgroundColor: '#a6b1ff',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
  secondaryText: {
    color: '#fff',
  },
});
