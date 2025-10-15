import { FilePlus2 } from 'lucide-react';
import Link from 'next/link';

export default function NotesPage() {
  return (
    <div className="flex h-full items-center justify-center bg-card">
      <div className="text-center">
        <FilePlus2 className="mx-auto h-16 w-16 text-muted-foreground" />
        <h2 className="mt-4 text-2xl font-semibold">No Note Selected</h2>
        <p className="mt-2 text-muted-foreground">
          Select a note from the list on the left, or{' '}
          <Link href="/notes/new" className="text-primary hover:underline">
            create a new one
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
