'use server';

import { z } from 'zod';
import { createNote, deleteNote, updateNote } from './data';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const NoteSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, 'Title is required.'),
  content: z.string(),
  tags: z.array(z.string()),
});

export type FormState = {
  message: string;
  errors?: {
    title?: string[];
    content?: string[];
  };
};

export async function saveNote(prevState: FormState, formData: FormData) {
  const rawId = formData.get('id');
  const validatedFields = NoteSchema.safeParse({
    id: rawId || undefined,
    title: formData.get('title'),
    content: formData.get('content'),
    tags: formData.getAll('tags[]'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { id, ...data } = validatedFields.data;

  let savedNote;
  try {
    if (id) {
      savedNote = await updateNote(id, data);
      if (!savedNote) {
        return { message: 'Failed to update note. Note not found.' };
      }
    } else {
      savedNote = await createNote(data);
    }
  } catch (e) {
    return { message: 'Database error: Failed to save note.' };
  }

  revalidatePath('/notes');
  if (savedNote) {
    redirect(`/notes/${savedNote.id}`);
  } else {
    // Fallback redirect if savedNote is not available for some reason
    redirect('/notes');
  }
}

export async function removeNote(formData: FormData) {
    const id = formData.get('id') as string;
    if (!id) {
        return { message: 'Note ID is required.' };
    }
    try {
        await deleteNote(id);
    } catch (e) {
        return { message: 'Database error: Failed to delete note.' };
    }
    revalidatePath('/notes');
    redirect('/notes');
}
