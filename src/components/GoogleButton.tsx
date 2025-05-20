import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function GoogleButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg',
        }}
        style={styles.icon}
      />
      <Text style={styles.text}>Google</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 25,
    justifyContent: 'center',
    marginVertical: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
});
