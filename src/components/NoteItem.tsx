import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Note } from '../slices/notesSlice';

const NoteItem = React.memo(function NoteItem({
  note,
  onPress,
  onTogglePin,
  onDelete,
}: {
  note: Note;
  onPress: () => void;
  onTogglePin: () => void;
  onDelete: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={styles.card} android_ripple={{ color: '#e0e0e0' }}>
      <View style={styles.row}>
        <Text style={styles.title} numberOfLines={1}>
          {note.title || '(No title)'}
        </Text>
        <Pressable onPress={onTogglePin} style={styles.iconBtn} hitSlop={8}>
          <Text style={styles.icon}>{note.pinned ? '★' : '☆'}</Text>
        </Pressable>
        <Pressable onPress={onDelete} style={styles.iconBtn} hitSlop={8}>
          <Text style={[styles.icon, { color: '#e53935' }]}>🗑️</Text>
        </Pressable>
      </View>
      <Text numberOfLines={2} style={styles.content}>
        {note.content || '(No content)'}
      </Text>
    </Pressable>
  );
});

export default NoteItem;

const styles = StyleSheet.create({
  card: {
    minHeight: 84,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  title: { flex: 1, fontWeight: '700' },
  content: { marginTop: 6, opacity: 0.7 },
  iconBtn: { marginLeft: 8 },
  icon: { fontSize: 16 },
});
