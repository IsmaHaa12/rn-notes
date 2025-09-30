import React, { useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export default function SearchBar({ value, onChangeText, placeholder }: {
  value: string;
  onChangeText: (t: string) => void;
  placeholder?: string;
}) {
  const [text, setText] = useState(value);

  useEffect(() => setText(value), [value]);

  useEffect(() => {
    const id = setTimeout(() => onChangeText(text), 250);
    return () => clearTimeout(id);
  }, [text, onChangeText]);

  return (
    <View style={styles.wrap}>
      <View style={styles.inner}>
        <Ionicons name="search" size={18} color={colors.muted} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder={placeholder}
          placeholderTextColor={colors.muted}
          clearButtonMode="while-editing"
        />
        {text?.length ? (
          <Pressable onPress={() => setText('')} hitSlop={8}>
            <Ionicons name="close-circle" size={18} color={colors.muted} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 12, paddingTop: 12, paddingBottom: 8 },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    color: colors.text,
    paddingVertical: 10,
  },
});