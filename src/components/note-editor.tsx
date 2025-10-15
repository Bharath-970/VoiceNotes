'use client';

import type { Note } from '@/lib/types';
import { useFormState } from 'react-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { saveNote, removeNote } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { X, Wand2, Trash2 } from 'lucide-react';
import Recorder from './recorder';
import { generateTags } from '@/ai/flows/generate-tags';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const NoteSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  content: z.string(),
  tags: z.array(z.string()),
});

type NoteFormData = z.infer<typeof NoteSchema>;

export default function NoteEditor({ note }: { note?: Note }) {
  const [isGeneratingTags, setIsGeneratingTags] = useState(false);
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm<NoteFormData>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      title: note?.title || '',
      content: note?.content || '',
      tags: note?.tags || [],
    },
  });

  const [formState, formAction] = useFormState(saveNote, { message: '' });

  const currentContent = watch('content');
  const currentTags = watch('tags');

  const handleTranscriptChange = (transcript: string) => {
    setValue('content', transcript, { shouldDirty: true });
  };

  const handleGenerateTags = async () => {
    const content = watch('content');
    if (!content) {
      toast({
        variant: 'destructive',
        title: 'Cannot generate tags',
        description: 'Note content is empty.',
      });
      return;
    }
    setIsGeneratingTags(true);
    try {
      const result = await generateTags({ noteContent: content });
      if (result.tags) {
        const newTags = Array.from(new Set([...currentTags, ...result.tags]));
        setValue('tags', newTags, { shouldDirty: true });
      }
    } catch (error) {
      console.error('Failed to generate tags:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate tags. Please try again.',
      });
    } finally {
      setIsGeneratingTags(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      'tags',
      currentTags.filter((tag) => tag !== tagToRemove),
      { shouldDirty: true }
    );
  };

  return (
    <div className="relative h-full">
      <form action={formAction} className="flex h-full flex-col">
        <input type="hidden" name="id" value={note?.id} />
        {currentTags.map((tag, index) => (
          <input key={index} type="hidden" name="tags[]" value={tag} />
        ))}
        <Card className="flex flex-1 flex-col rounded-none border-0 border-b shadow-none sm:border-r">
          <CardHeader className="p-4 sm:p-6">
            <Input
              {...register('title')}
              placeholder="Note Title"
              className="border-none text-2xl font-bold shadow-none focus-visible:ring-0"
            />
          </CardHeader>
          <CardContent className="flex-1 p-4 pt-0 sm:p-6 sm:pt-0">
            <Textarea
              {...register('content')}
              placeholder="Start typing or use the microphone to record your note..."
              className="h-full resize-none border-none bg-transparent shadow-none focus-visible:ring-0"
            />
          </CardContent>
          <CardFooter className="flex-col items-start gap-4 p-4 sm:p-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-medium">Tags:</span>
              {currentTags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="group">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="ml-1 rounded-full p-0.5 text-muted-foreground opacity-50 transition-opacity group-hover:opacity-100">
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              <Button type="button" variant="ghost" size="sm" onClick={handleGenerateTags} disabled={isGeneratingTags}>
                <Wand2 className={`mr-2 h-4 w-4 ${isGeneratingTags ? 'animate-pulse' : ''}`} />
                {isGeneratingTags ? 'Generating...' : 'Generate Tags'}
              </Button>
            </div>
          </CardFooter>
        </Card>
        <div className="sticky bottom-0 z-10 flex items-center justify-between gap-4 border-t bg-background/80 p-4 backdrop-blur-sm sm:px-6">
          <div className="absolute bottom-full left-1/2 mb-4 -translate-x-1/2">
            <Recorder onTranscriptChange={handleTranscriptChange} initialTranscript={note?.content || ''} />
          </div>
          <div className="flex items-center gap-2">
            {note && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" type="button">
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete Note</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <form action={removeNote}>
                    <input type="hidden" name="id" value={note.id} />
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your note.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction asChild>
                         <Button type="submit" variant="destructive">Delete</Button>
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </form>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
          <Button type="submit" disabled={!isDirty}>Save Note</Button>
        </div>
      </form>
    </div>
  );
}
