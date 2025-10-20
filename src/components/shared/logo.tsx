import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center", className)} aria-label="Mood Lab Homepage">
      <Image 
        src="https://iili.io/KSB81hN.md.png" 
        alt="Mood Lab Logo" 
        width={150} 
        height={50} 
        className="h-auto"
        priority
      />
    </Link>
  );
}