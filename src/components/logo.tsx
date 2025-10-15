import { MicVocal } from 'lucide-react';
import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2">
      <MicVocal className="h-6 w-6 text-primary" />
      <span className="text-xl font-semibold">VoiceNotes</span>
    </div>
  );
}
