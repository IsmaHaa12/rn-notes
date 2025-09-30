import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import useDebouncedValue from '../hooks/useDebouncedValue';

export default function SearchBar({ value, onChangeText, placeholder }: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}) {
  const [debounced, setDebounced] = useDebouncedValue(value, 200);

  return (
    <View style={styles.wrap}>
      <TextInput
        style={styles.input}
        value={debounced}
        onChangeText={(t) => {
          setDebounced(t);
          onChangeText(t);
        }}
        placeholder={placeholder}
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 12, paddingTop: 12, paddingBottom: 4 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
});
