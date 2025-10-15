'use client';

import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import type { Note } from '@/lib/types';
import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { formatDistanceToNow } from 'date-fns';

export default function NoteListControls({ notes }: { notes: Note[] }) {
  const [search, setSearch] = useState('');
  const pathname = usePathname();

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-full flex-col">
      <div className="p-2">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search notes..."
            className="w-full rounded-lg bg-background pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <div className="flex flex-col gap-2 p-2 pt-0">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <Link
                key={note.id}
                href={`/notes/${note.id}`}
                className={cn(
                  'block rounded-lg p-3 hover:bg-accent/50',
                  pathname === `/notes/${note.id}` ? 'bg-accent' : 'bg-card'
                )}
              >
                <h3 className="truncate font-semibold">{note.title}</h3>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {note.content}
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(note.updatedAt), { addSuffix: true })}
                </p>
              </Link>
            ))
          ) : (
            <p className="p-4 text-center text-sm text-muted-foreground">
              No notes found.
            </p>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
