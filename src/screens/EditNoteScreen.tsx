import React, { useCallback, useEffect, useState } from 'react';
import { View, TextInput, StyleSheet, Pressable, Text, Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native';
import type { RootStackParamList } from '../../App';
import { useSelector } from 'react-redux';
import { selectNoteById, addNote, updateNote, deleteNote } from '../slices/notesSlice';
import { useAppDispatch } from '../types';

export default function EditNoteScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'EditNote'>>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const noteId = route.params?.id;
  const note = useSelector(noteId ? selectNoteById(noteId) : () => undefined);

  const [title, setTitle] = useState(note?.title ?? '');
  const [content, setContent] = useState(note?.content ?? '');

  useEffect(() => {
    navigation.setOptions({ title: noteId ? 'Edit Note' : 'New Note' });
  }, [navigation, noteId]);

  const onSave = useCallback(() => {
    if (!title.trim() && !content.trim()) {
      Alert.alert('Nothing to save', 'Please type a title or content.');
      return;
    }
    if (noteId) {
      dispatch(updateNote({ id: noteId, title, content }));
    } else {
      dispatch(addNote(title, content));
    }
    navigation.goBack();
  }, [dispatch, navigation, title, content, noteId]);

  const onDelete = useCallback(() => {
    if (!noteId) return;
    Alert.alert('Delete', 'Delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteNote(noteId));
          navigation.goBack();
        },
      },
    ]);
  }, [dispatch, navigation, noteId]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.title}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.content}
        placeholder="Start typing…"
        value={content}
        onChangeText={setContent}
        multiline
        textAlignVertical="top"
      />

      <View style={styles.toolbar}>
        {noteId ? (
          <Pressable onPress={onDelete} style={[styles.btn, styles.danger]}>
            <Text style={styles.btnText}>Delete</Text>
          </Pressable>
        ) : (
          <View />
        )}
        <Pressable onPress={onSave} style={[styles.btn, styles.primary]}>
          <Text style={styles.btnText}>Save</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, gap: 12 },
  title: {
    fontSize: 18,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  content: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  btn: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 8,
  },
  primary: { backgroundColor: '#1e88e5' },
  danger: { backgroundColor: '#e53935' },
  btnText: { color: 'white', fontWeight: '600' },
});
