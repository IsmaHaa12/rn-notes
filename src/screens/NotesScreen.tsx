import React, { useCallback, useMemo, useState } from 'react';
import { View, FlatList, StyleSheet, Pressable, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { makeSelectFilteredNotes, selectPinnedNotes, selectAllNotes, togglePinned, deleteNote } from '../slices/notesSlice';
import { useAppDispatch } from '../types';
import NoteItem from '../components/NoteItem';
import SearchBar from '../components/SearchBar';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';

const ROW_HEIGHT = 84;

type Props = { showPinnedOnly: boolean };

const NotesScreen: React.FC<Props> = ({ showPinnedOnly }) => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [query, setQuery] = useState('');
  const selectFiltered = useMemo(() => makeSelectFilteredNotes(), []);

  const allNotes = useSelector(selectAllNotes);
  const pinnedNotes = useSelector(selectPinnedNotes);
  const data = useSelector((s) => selectFiltered(s as any, query));

  const source = showPinnedOnly ? pinnedNotes : data;

  const onAdd = useCallback(() => navigation.navigate('EditNote'), [navigation]);

  const renderItem = useCallback(
    ({ item }: any) => (
      <NoteItem
        note={item}
        onPress={() => navigation.navigate('EditNote', { id: item.id })}
        onTogglePin={() => dispatch(togglePinned(item.id))}
        onDelete={() => dispatch(deleteNote(item.id))}
      />
    ),
    [navigation, dispatch]
  );

  const keyExtractor = useCallback((item: any) => item.id, []);

  const getItemLayout = useCallback(
    (_: any, index: number) => ({ length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index }),
    []
  );

  return (
    <LinearGradient colors={[colors.bg, '#0f1a35']} style={{ flex: 1 }}>
      {!showPinnedOnly && (
        <SearchBar value={query} onChangeText={setQuery} placeholder="Search notes…" />
      )}

      <FlatList
        data={source}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        removeClippedSubviews
        initialNumToRender={12}
        windowSize={7}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.empty}>No notes yet. Tap + to add.</Text>}
      />

      <Pressable onPress={onAdd} style={styles.fab} android_ripple={{ borderless: true }}>
        <Text style={styles.fabText}>＋</Text>
      </Pressable>
    </LinearGradient>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  listContent: { padding: 12, paddingBottom: 96 },
  sep: { height: 8 },
  empty: { textAlign: 'center', marginTop: 48, color: colors.muted },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  fabText: { color: 'white', fontSize: 28, marginTop: -2 },
});
