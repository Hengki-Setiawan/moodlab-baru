import Link from 'next/link';
import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)} aria-label="Mood Lab Homepage">
      <div className="bg-gradient-to-br from-gradient-blue/20 to-gradient-pink/20 p-2 rounded-lg">
        <Lightbulb className="h-5 w-5 text-primary" />
      </div>
      <span className="font-headline font-bold text-xl tracking-tight">
        Mood Lab
      </span>
    </Link>
  );
}