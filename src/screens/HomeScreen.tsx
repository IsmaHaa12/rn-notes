import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../App';
import { selectAllNotes, selectPinnedNotes, togglePinned, deleteNote } from '../slices/notesSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme';
import { Ionicons } from '@expo/vector-icons';
import NoteItem from '../components/NoteItem';
import { useAppDispatch } from '../types';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const dispatch = useAppDispatch();

  const notes = useSelector(selectAllNotes);
  const pinned = useSelector(selectPinnedNotes);

  const recent = useMemo(() => notes.slice(0, 5), [notes]);

  return (
    <LinearGradient colors={[colors.bg, '#0f1a35']} style={{ flex: 1 }}>
      <View style={styles.hero}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name='sparkles-outline' size={18} color={colors.primary2} />
          <Text style={styles.heroTitle}>Welcome back</Text>
        </View>
        <Text style={styles.heroSub}>{notes.length} notes • {pinned.length} pinned</Text>

        <View style={styles.actions}>
          <Pressable style={[styles.actionBtn, styles.primary]} onPress={() => navigation.navigate('EditNote')}>
            <Ionicons name='add' size={16} color='#fff' />
            <Text style={styles.actionText}>New Note</Text>
          </Pressable>
          <Pressable style={[styles.actionBtn, styles.ghost]} onPress={() => navigation.navigate('Tabs')}>
            <Ionicons name='albums-outline' size={16} color={colors.primary2} />
            <Text style={[styles.actionText, { color: colors.primary2 }]}>All Notes</Text>
          </Pressable>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pinned</Text>
        {pinned.length === 0 ? (
          <Text style={styles.muted}>No pinned notes yet.</Text>
        ) : (
          <FlatList
            data={pinned.slice(0, 8)}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <NoteItem
                note={item}
                onPress={() => navigation.navigate('EditNote', { id: item.id })}
                onTogglePin={() => dispatch(togglePinned(item.id))}
                onDelete={() => dispatch(deleteNote(item.id))}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            contentContainerStyle={{ paddingVertical: 8 }}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent</Text>
        {recent.length === 0 ? (
          <Text style={styles.muted}>No notes yet. Tap New Note to start.</Text>
        ) : (
          <FlatList
            data={recent}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <NoteItem
                note={item}
                onPress={() => navigation.navigate('EditNote', { id: item.id })}
                onTogglePin={() => dispatch(togglePinned(item.id))}
                onDelete={() => dispatch(deleteNote(item.id))}
              />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            contentContainerStyle={{ paddingVertical: 8, paddingBottom: 96 }}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  heroTitle: {
    marginLeft: 8,
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  heroSub: {
    color: colors.muted,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: colors.border,
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
  section: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  sectionTitle: {
    color: colors.text,
    fontWeight: '700',
    marginBottom: 6,
  },
  muted: { color: colors.muted },
});
