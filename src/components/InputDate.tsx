import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  icon: string;
  placeholder: string;
  value: string;
  onChange: (dateString: string) => void;
}

export default function InputDate({ icon, placeholder, value, onChange }: Props) {
  const [showPicker, setShowPicker] = useState(false);

  const onChangeDate = (_event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios'); 
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split('T')[0]; 
      onChange(formatted);
    }
  };

  return (
    <View style={styles.container}>
      <Ionicons name={icon as any} size={20} style={styles.icon} />
      <TouchableOpacity style={styles.touchable} onPress={() => setShowPicker(true)}>
        <Text style={[styles.text, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginBottom: 12,
    width: 355,
    height:65
  },
  icon: {
    marginRight: 11, 
    marginLeft: 8,
    color: '#2626268F',
  },
  touchable: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  placeholder: {
    color: '#aaa',
  },
});
