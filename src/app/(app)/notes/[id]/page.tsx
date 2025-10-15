import NoteEditor from '@/components/note-editor';
import { getNote } from '@/lib/data';
import { notFound } from 'next/navigation';

type NotePageProps = {
  params: {
    id: string;
  };
};

export default async function NotePage({ params }: NotePageProps) {
  const note = await getNote(params.id);

  if (!note) {
    notFound();
  }

  return <NoteEditor note={note} />;
}
