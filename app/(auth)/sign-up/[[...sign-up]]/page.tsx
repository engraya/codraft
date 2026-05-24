import { SignUp } from '@clerk/nextjs';
import Image from 'next/image';
import { Zap, Lock, Globe } from 'lucide-react';

const perks = [
  { icon: Zap,   label: 'Instant sync',     desc: 'Changes appear for all collaborators in under 100 ms.' },
  { icon: Lock,  label: 'Secure by default', desc: 'Role-based access control on every document.' },
  { icon: Globe, label: 'Works anywhere',    desc: 'Browser-native — no install, no plugins required.' },
];

const SignUpPage = () => (
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
            Start collaborating<br />
            <span className="text-[#6581F5]">in seconds.</span>
          </h1>
          <p className="text-base leading-relaxed text-[#71717A]">
            One account gives your whole team a shared workspace — no credit card needed.
          </p>
        </div>

        <ul className="space-y-5">
          {perks.map(({ icon: Icon, label, desc }) => (
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

        {/* Social proof pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-dark-500 bg-dark-300 px-4 py-2">
          <span className="size-2 rounded-full bg-emerald-400" />
          <span className="text-xs font-medium text-[#A1A1AA]">Free to start · No credit card</span>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-dark-500 pt-6">
        <p className="text-xs text-[#3F3F46]">
          By signing up you agree to our Terms of Service and Privacy Policy.
        </p>
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

      <SignUp />
    </div>
  </main>
);

export default SignUpPage;
