import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Note } from '../slices/notesSlice';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

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
    <Pressable onPress={onPress} style={styles.card} android_ripple={{ color: 'rgba(255,255,255,0.06)' }}>
      <View style={styles.row}>
        <Text style={styles.title} numberOfLines={1}>
          {note.title || '(No title)'}
        </Text>
        <Pressable onPress={onTogglePin} style={styles.iconBtn} hitSlop={8}>
          <Ionicons name={note.pinned ? 'star' : 'star-outline'} size={18} color={colors.primary2} />
        </Pressable>
        <Pressable onPress={onDelete} style={styles.iconBtn} hitSlop={8}>
          <Ionicons name="trash" size={18} color={colors.danger} />
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
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  title: { flex: 1, fontWeight: '700', color: colors.text },
  content: { marginTop: 6, color: colors.muted },
  iconBtn: { marginLeft: 10 },
});
