import { SignIn } from '@clerk/nextjs';
import Image from 'next/image';
import { FileText, Users, MessageSquare } from 'lucide-react';

const features = [
  { icon: FileText,      label: 'Rich-text editing',     desc: 'Full formatting with headings, lists, and inline styles.' },
  { icon: Users,         label: 'Live presence',          desc: 'See collaborators in real time — cursors, selections, avatars.' },
  { icon: MessageSquare, label: 'Threaded comments',      desc: 'Annotate any passage and resolve discussions inline.' },
];

const SignInPage = () => (
  <main className="auth-page">
    {/* ── Brand panel (desktop only) ── */}
    <aside className="auth-brand-panel">
      {/* Subtle radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 size-[500px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #4F6FE8 0%, transparent 70%)' }}
      />

      {/* Logo */}
      <div className="relative z-10 flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
          <Image src="/assets/icons/logo-icon.svg" alt="CoDraft" width={20} height={20} />
        </div>
        <span className="text-lg font-semibold tracking-tight text-[#F4F4F5]">CoDraft</span>
      </div>

      {/* Hero copy */}
      <div className="relative z-10 space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-[#F4F4F5] leading-tight">
            Real-time collaboration<br />
            <span className="text-[#6581F5]">for modern teams.</span>
          </h1>
          <p className="text-base leading-relaxed text-[#71717A]">
            Write, edit, and ship documents together — without the back-and-forth.
          </p>
        </div>

        <ul className="space-y-5">
          {features.map(({ icon: Icon, label, desc }) => (
            <li key={label} className="flex items-start gap-3.5">
              <div className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-lg bg-dark-400 border border-dark-500">
                <Icon className="size-3.5 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-[#F4F4F5]">{label}</p>
                <p className="text-sm text-[#71717A] leading-relaxed">{desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer quote */}
      <div className="relative z-10 border-t border-dark-500 pt-6">
        <p className="text-sm italic text-[#52525B]">
          &ldquo;CoDraft replaced three tools for our team. We ship docs faster now.&rdquo;
        </p>
        <p className="mt-2 text-xs text-[#3F3F46]">— Founding team, Veritas Labs</p>
      </div>
    </aside>

    {/* ── Form panel ── */}
    <div className="auth-form-panel">
      {/* Mobile-only logo */}
      <div className="mb-8 flex items-center gap-2 lg:hidden">
        <div className="flex size-8 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/20">
          <Image src="/assets/icons/logo-icon.svg" alt="CoDraft" width={18} height={18} />
        </div>
        <span className="text-base font-semibold text-[#F4F4F5]">CoDraft</span>
      </div>

      <SignIn />
    </div>
  </main>
);

export default SignInPage;
