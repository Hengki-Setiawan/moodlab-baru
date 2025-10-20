import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)} aria-label="Mood Lab Homepage">
      <Image 
        src="https://iili.io/KSB81hN.md.png" 
        alt="Mood Lab Logo" 
        width={80} 
        height={27} 
        className="h-auto"
        priority
      />
      <span className="font-headline font-bold text-xl tracking-tight">
        Mood Lab
      </span>
    </Link>
  );
}