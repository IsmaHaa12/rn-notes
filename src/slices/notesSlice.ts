import { createSlice, PayloadAction, nanoid, createSelector } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export type Note = {
  id: string;
  title: string;
  content: string;
  pinned: boolean;
  createdAt: number;
  updatedAt: number;
};

export type NotesState = {
  items: Record<string, Note>;
  order: string[]; // keep order for stable FlatList
};

const initialState: NotesState = {
  items: {},
  order: [],
};

const slice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: {
      prepare: (title: string, content: string) => ({
        payload: {
          id: nanoid(),
          title,
          content,
          pinned: false,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        } as Note,
      }),
      reducer: (state, action: PayloadAction<Note>) => {
        const note = action.payload;
        state.items[note.id] = note;
        state.order.unshift(note.id); // newest on top
      },
    },
    updateNote: (state, action: PayloadAction<{ id: string; title: string; content: string }>) => {
      const n = state.items[action.payload.id];
      if (!n) return;
      n.title = action.payload.title;
      n.content = action.payload.content;
      n.updatedAt = Date.now();
      // move to top on edit
      state.order = [n.id, ...state.order.filter((id) => id !== n.id)];
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      delete state.items[id];
      state.order = state.order.filter((x) => x !== id);
    },
    togglePinned: (state, action: PayloadAction<string>) => {
      const n = state.items[action.payload];
      if (!n) return;
      n.pinned = !n.pinned;
      n.updatedAt = Date.now();
      // keep ordering by updatedAt; already moved to top on edit
    },
  },
});

export const { addNote, updateNote, deleteNote, togglePinned } = slice.actions;
export default slice.reducer;

// ===== Selectors (memoized) =====
const selectNotesDomain = (s: RootState) => s.notes;

export const selectAllNotes = createSelector([selectNotesDomain], (domain) =>
  domain.order.map((id) => domain.items[id])
);

export const selectPinnedNotes = createSelector([selectAllNotes], (notes) =>
  notes.filter((n) => n.pinned)
);

export const selectNoteById = (id: string) =>
  createSelector([(s: RootState) => s.notes], (domain) => domain.items[id]);

export const makeSelectFilteredNotes = () =>
  createSelector([selectAllNotes, (_: RootState, q: string) => q], (notes, q) => {
    const query = q.trim().toLowerCase();
    if (!query) return notes;
    return notes.filter(
      (n) => n.title.toLowerCase().includes(query) || n.content.toLowerCase().includes(query)
    );
  });
