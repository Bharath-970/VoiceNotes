import { getNotes } from '@/lib/data';
import NoteListControls from './note-list-controls';

export default async function NoteList() {
  const notes = await getNotes();
  return <NoteListControls notes={notes} />;
}
