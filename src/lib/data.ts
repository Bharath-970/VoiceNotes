import { v4 as uuidv4 } from 'uuid';
import type { Note } from './types';

// Simulate a database
let notes: Note[] = [
  {
    id: '1',
    title: 'Meeting Notes',
    content: 'Discussed Q3 goals and roadmap. Key takeaways: focus on user acquisition and improve onboarding flow. Action items assigned to John and Jane.',
    tags: ['meeting', 'q3', 'roadmap'],
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Brainstorming Ideas',
    content: 'New feature ideas for the app: dark mode, collaborative editing, and voice commands for navigation. Need to prioritize and create mockups.',
    tags: ['ideas', 'features', 'brainstorming'],
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Grocery List',
    content: 'Milk, bread, eggs, cheese, apples, bananas, chicken breast.',
    tags: ['personal', 'shopping'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Simulate API latency
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export async function getNotes(query?: string): Promise<Note[]> {
  await delay(100);
  let filteredNotes = notes;
  if (query) {
    const lowerCaseQuery = query.toLowerCase();
    filteredNotes = notes.filter(
      note =>
        note.title.toLowerCase().includes(lowerCaseQuery) ||
        note.content.toLowerCase().includes(lowerCaseQuery) ||
        note.tags.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
    );
  }
  return [...filteredNotes].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export async function getNote(id: string): Promise<Note | null> {
  await delay(50);
  const note = notes.find(n => n.id === id);
  return note ? { ...note } : null;
}

export async function createNote(data: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> {
  await delay(100);
  const now = new Date().toISOString();
  const newNote: Note = {
    ...data,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
  };
  notes.unshift(newNote);
  return { ...newNote };
}

export async function updateNote(id: string, data: Partial<Omit<Note, 'id' | 'createdAt'>>): Promise<Note | null> {
  await delay(100);
  const noteIndex = notes.findIndex(n => n.id === id);
  if (noteIndex === -1) {
    return null;
  }
  const updatedNote = {
    ...notes[noteIndex],
    ...data,
    updatedAt: new Date().toISOString(),
  };
  notes[noteIndex] = updatedNote;
  return { ...updatedNote };
}

export async function deleteNote(id: string): Promise<boolean> {
  await delay(100);
  const initialLength = notes.length;
  notes = notes.filter(n => n.id !== id);
  return notes.length < initialLength;
}
