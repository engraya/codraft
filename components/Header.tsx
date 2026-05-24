import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const Header = ({ children, className }: HeaderProps) => (
  <div className={cn('header', className)}>
    <Link href="/" className="flex items-center gap-2.5 shrink-0 md:flex-none">
      {/* Icon mark */}
      <div className="flex size-8 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
        <Image
          src="/assets/icons/logo-icon.svg"
          alt="CoDraft"
          width={18}
          height={18}
        />
      </div>

      {/* Wordmark — hidden on mobile */}
      <span className="hidden text-[15px] font-semibold tracking-tight text-[#F4F4F5] md:block">
        CoDraft
      </span>
    </Link>

    {children}
  </div>
);

export default Header;
