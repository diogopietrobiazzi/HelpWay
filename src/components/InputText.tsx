import React, { useState } from 'react';
import { TextInput, View, StyleSheet, TextInputProps, NativeSyntheticEvent, TextInputContentSizeChangeEventData } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

interface Props extends TextInputProps {
  icon: string;
}

export default function InputText({ icon, style, ...rest }: Props) {
  const [inputHeight, setInputHeight] = useState(40); 

  function onContentSizeChange(event: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) {
    setInputHeight(event.nativeEvent.contentSize.height);
  }

  return (
    <View style={styles.container}>
      <FontAwesome5 name={icon} size={15} color="gray" style={styles.icon} />
      <TextInput
        {...rest}
        multiline={true}
        onContentSizeChange={onContentSizeChange}
        style={[styles.input, { height: Math.max(40, inputHeight) }, style]}
        placeholderTextColor="#aaa"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 22,
    alignItems: 'flex-start',  
    marginBottom: 10,
    width: 355,
   
  },
  icon: {
    marginRight: 15,
    color: '#888',
    marginTop: 6, 
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginHorizontal: 0,
    padding: 0,
    textAlignVertical: 'top', 
  },
});
