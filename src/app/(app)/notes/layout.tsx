import Link from 'next/link';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import NoteList from '@/components/note-list';
import { Logo } from '@/components/logo';
import { UserNav } from '@/components/user-nav';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex w-full items-center justify-between">
            <div className="flex-1">
              <Logo />
            </div>
            <SidebarTrigger />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <div className="p-2">
            <Button asChild className="w-full justify-start" size="sm">
              <Link href="/notes/new">
                <Plus className="mr-2 h-4 w-4" />
                New Note
              </Link>
            </Button>
          </div>
          <Suspense fallback={<NoteListSkeleton />}>
            <NoteList />
          </Suspense>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
          <div className="flex-1">
            <SidebarTrigger className="md:hidden" />
          </div>
          <UserNav />
        </header>
        <main className="flex-1 overflow-y-auto">{children}</main>
      </SidebarInset>
    </>
  );
}

function NoteListSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-2">
      <Skeleton className="h-8 w-full" />
      <div className="flex flex-col gap-2 px-2 pt-2">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    </div>
  );
}
