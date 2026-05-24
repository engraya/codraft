import Link from 'next/link';

const Footer = () => (
  <footer className="border-t border-dark-400 bg-dark-100">
    <div className="mx-auto flex max-w-[860px] items-center justify-between px-5 py-4">
      <p className="text-xs text-[#52525B]">
        &copy; {new Date().getFullYear()} CoDraft. All rights reserved.
      </p>
      <div className="flex items-center gap-4">
        <Link href="#" className="text-xs text-[#52525B] transition-colors hover:text-[#A1A1AA]">
          Privacy
        </Link>
        <Link href="#" className="text-xs text-[#52525B] transition-colors hover:text-[#A1A1AA]">
          Terms
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
