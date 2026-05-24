<div align="center">

# CoDraft

**Real-time collaborative document editing for modern teams.**

Write, edit, and ship together — with live cursors, threaded comments, and instant sharing.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Liveblocks](https://img.shields.io/badge/Liveblocks-2.5-FF4154?style=flat-square)](https://liveblocks.io)
[![Clerk](https://img.shields.io/badge/Clerk-5.3-6C47FF?style=flat-square&logo=clerk&logoColor=white)](https://clerk.com)
[![Lexical](https://img.shields.io/badge/Lexical-0.17-0866FF?style=flat-square)](https://lexical.dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-22C55E?style=flat-square)](LICENSE)

</div>

---

## Overview

CoDraft is a production-grade, real-time collaborative document editor built with the Next.js 14 App Router. It solves the friction of async document workflows — instead of emailing files back and forth or resolving version conflicts, CoDraft lets multiple users edit the same document simultaneously with live awareness of who is doing what.

**The problem it solves:** Most teams default to Google Docs for collaboration, but building the same capability with a modern, type-safe, developer-owned stack is non-trivial. CoDraft demonstrates exactly how to do that — a fully-featured collaborative editor with presence, threaded comments, in-app notifications, and role-based sharing, built entirely on Next.js infrastructure.

**Who it is for:**
- Teams that need lightweight, self-hostable collaborative editing
- Developers who want to extend a battle-tested collaborative editing foundation
- Builders integrating rich-text collaboration into a larger product

---

## Features

### Real-Time Collaboration
- **Simultaneous editing** — Multiple users can edit the same document at the same time. All changes are synced in under 100ms via Liveblocks' WebSocket infrastructure.
- **Live presence** — Active collaborator avatars appear in the editor header, each with a deterministically assigned identity color. Overflow is handled gracefully with a `+N` pill.
- **Conflict-free sync** — Liveblocks' CRDT-backed storage layer handles concurrent edits without merge conflicts.

### Rich Text Editing
- **Lexical editor** — Meta's production-grade editor framework powers the editing surface, supporting headings (H1–H3), paragraphs, block quotes, bold, italic, underline, strikethrough, and text alignment.
- **Fixed toolbar** — Persistent formatting toolbar above the editor for block-level and inline formatting, plus undo/redo.
- **Floating toolbar** — Context-aware formatting toolbar that appears on text selection for quick inline changes without breaking flow.

### Threaded Comments
- **Inline annotation** — Select any passage and attach a comment thread directly to it, anchored to that text.
- **@mention support** — Mention collaborators by email within threads; suggestions are resolved from the document's collaborator list in real time.
- **Resolved threads** — Threads can be marked resolved and are visually distinguished at reduced opacity.

### In-App Notifications
- **Notification inbox** — Bell icon in the header opens a popover inbox powered by the Liveblocks Inbox API.
- **Three notification kinds:**
  - `thread` — Someone replied to a comment thread you're participating in.
  - `textMention` — Someone @-mentioned you in a comment.
  - `$documentAccess` — A collaborator granted you access to a document.
- **Unread indicator** — A dot badge on the bell icon shows unread count without a full page reload.

### Document Management
- **Create** — Instantly creates a new "Untitled" document with a nanoid room key; navigates directly to the editor.
- **Inline rename** — Click the pencil icon in the editor header to rename the document. Auto-saves on Enter, click-outside, or blur. Escape reverts to the last saved title with optimistic rollback on server failure.
- **Search & sort** — Filter documents by title with live URL-synced search. Sort by last edited or date created.
- **Delete** — Confirmation dialog before permanent deletion. Removes the room from Liveblocks and revalidates the dashboard cache.

### Sharing & Access Control
- **Email-based invitations** — Share a document by entering a collaborator's email. They receive an in-app notification immediately upon being granted access.
- **Role-based access:** Two roles — `editor` (full read/write) and `viewer` (read + presence only). Roles can be changed at any time by the document owner.
- **Owner protection** — The document creator cannot be removed from their own document; enforced server-side in the Server Action.
- **Inline collaborator management** — The share modal lists all current collaborators with roles that can be changed or revoked without leaving the modal.

### Authentication
- **Clerk integration** — Full social and email/password auth with pre-built, themed UI components. Session management, token refresh, and security are handled by Clerk.
- **Middleware-level protection** — Every route except `/sign-in` and `/sign-up` is protected at the Edge via Clerk middleware before any server work executes.
- **Liveblocks identity bridge** — `/api/liveblocks-auth` verifies the Clerk session, derives user metadata (name, avatar, deterministic color), and returns a signed Liveblocks token. This is the sole HTTP API route in the project.

### Performance & Developer Experience
- **Next.js Server Actions** — All document operations (create, read, update, delete, share) use Next.js Server Actions. No separate API layer required. Cache invalidation via `revalidatePath`.
- **`parseStringify` utility** — Strips non-serializable properties from Liveblocks SDK responses before they cross the Server Action boundary, preventing silent runtime failures.
- **`ClientSideSuspense` with fallback** — The collaborative room suspends on the client until Liveblocks is ready, showing a spinner with no layout shift.
- **Sentry integration** — Error tracking and performance monitoring via `@sentry/nextjs` for both client and server environments.
- **Deterministic user colors** — `getUserColor` maps a Clerk user ID to a stable color from a 19-color palette using character-code summation, ensuring collaborators always appear with consistent colors across sessions.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | [Next.js](https://nextjs.org) — App Router, Server Actions, Edge middleware | 14.2.5 |
| **Language** | [TypeScript](https://typescriptlang.org) | 5 |
| **Real-time** | [Liveblocks](https://liveblocks.io) — rooms, CRDT, presence, threads, inbox | 2.5.2 |
| **Rich-text editor** | [Lexical](https://lexical.dev) — Meta's extensible editor framework | 0.17.0 |
| **Auth** | [Clerk](https://clerk.com) — session management, social auth, user profiles | 5.3.2 |
| **Styling** | [Tailwind CSS](https://tailwindcss.com) | 3.4.1 |
| **UI primitives** | [Radix UI](https://radix-ui.com) — Dialog, Select, Popover, Label | latest |
| **Icons** | [Lucide React](https://lucide.dev) | 0.429.0 |
| **Class utilities** | [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastil/tailwind-merge) | latest |
| **ID generation** | [nanoid](https://github.com/ai/nanoid) — room and notification IDs | 5.0.7 |
| **Monitoring** | [Sentry](https://sentry.io) — error and performance tracking | 8.26.0 |
| **Font** | [Inter](https://fonts.google.com/specimen/Inter) via `next/font/google` | — |
| **Deployment** | [Vercel](https://vercel.com) | — |

---

## Architecture

### How It Works

CoDraft uses **Liveblocks Rooms** as both the real-time collaboration engine and the document store. There is intentionally no traditional database — each document maps 1:1 to a Liveblocks Room, with document metadata (title, creator ID, creator email) stored as room metadata and collaborator permissions stored in `usersAccesses`.

```
User browser
    │
    ├── Clerk (identity + session)
    │
    ├── Next.js App Router
    │   ├── Server Components  →  read rooms via Liveblocks Node SDK
    │   ├── Server Actions     →  mutate rooms, revalidate RSC cache
    │   └── /api/liveblocks-auth  →  Clerk session → Liveblocks signed token
    │
    └── Liveblocks WebSocket
        ├── CRDT document state (Lexical editor content)
        ├── Presence (active users + metadata)
        ├── Threads (anchored comment threads)
        └── Inbox notifications
```

### Identity Model

Liveblocks uses **email address as `userId`** (not the Clerk internal user ID). This allows Liveblocks to look up room access permissions by email directly, without an additional join through Clerk. The Clerk user ID is stored only as `RoomMetadata.creatorId` for owner-level checks.

### Data Flow — Creating a Document

```
AddDocumentBtn (client)
  └── createDocument() Server Action
        ├── nanoid()               →  generate unique room ID
        ├── liveblocks.createRoom  →  room with metadata + usersAccesses
        ├── revalidatePath('/')    →  invalidate dashboard RSC cache
        └── router.push('/documents/[id]')
```

### Data Flow — Real-Time Editing

```
CollaborativeRoom
  └── RoomProvider (Liveblocks)
        └── LexicalComposer
              ├── LiveblocksPlugin    →  sync Lexical state via Liveblocks CRDT
              ├── FloatingComposer   →  create new comment threads
              ├── FloatingThreads    →  display anchored thread markers
              └── Comments sidebar   →  full thread list view
```

---

## Project Structure

```
codraft/
├── app/
│   ├── (auth)/                          # Unauthenticated route group
│   │   ├── sign-in/[[...sign-in]]/      # Clerk catch-all sign-in route
│   │   └── sign-up/[[...sign-up]]/      # Clerk catch-all sign-up route
│   ├── (root)/                          # Authenticated route group
│   │   ├── documents/[id]/              # Document editor page
│   │   │   └── page.tsx
│   │   └── page.tsx                     # Dashboard (document list)
│   ├── api/
│   │   └── liveblocks-auth/             # Clerk → Liveblocks auth bridge
│   │       └── route.ts
│   ├── globals.css                      # Global styles + Clerk/Liveblocks overrides
│   ├── layout.tsx                       # Root layout (ClerkProvider, fonts)
│   └── Provider.tsx                     # LiveblocksProvider + user resolution
│
├── components/
│   ├── editor/
│   │   ├── plugins/
│   │   │   ├── FloatingToolbarPlugin.tsx  # Selection-triggered formatting toolbar
│   │   │   ├── Theme.ts                   # Lexical → CSS class name map
│   │   │   └── ToolbarPlugin.tsx          # Persistent formatting toolbar
│   │   └── Editor.tsx                     # Root Lexical composer
│   ├── ui/                              # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── popover.tsx
│   │   └── select.tsx
│   ├── ActiveCollaborators.tsx          # Live presence avatars
│   ├── AddDocumentBtn.tsx               # Create document CTA
│   ├── Collaborator.tsx                 # Single collaborator row in share modal
│   ├── CollaborativeRoom.tsx            # Room context + editor layout shell
│   ├── Comments.tsx                     # Comment threads sidebar
│   ├── DeleteModal.tsx                  # Delete confirmation dialog
│   ├── DocumentSearch.tsx               # Search + sort bar (URL-synced)
│   ├── Footer.tsx                       # Dashboard footer
│   ├── Header.tsx                       # Top navigation bar
│   ├── Loader.tsx                       # Full-screen CSS spinner
│   ├── Notifications.tsx                # Notification bell + popover inbox
│   ├── ShareModal.tsx                   # Invite collaborators dialog
│   └── UserTypeSelector.tsx             # Editor / Viewer role dropdown
│
├── hooks/
│   └── useDocumentTitle.ts              # Inline title editing with auto-save
│
├── lib/
│   ├── actions/
│   │   ├── room.actions.ts              # All document CRUD Server Actions
│   │   └── user.actions.ts             # Clerk user resolution + mention search
│   ├── liveblocks.ts                   # Liveblocks Node SDK singleton
│   └── utils.ts                        # cn(), parseStringify(), dateConverter(),
│                                        # getUserColor(), getAccessType()
│
├── styles/
│   ├── dark-theme.css                   # Lexical editor dark theme CSS classes
│   └── light-theme.css                  # Lexical editor light theme CSS classes
│
├── types/
│   └── index.d.ts                       # Shared TypeScript type declarations
│
├── liveblocks.config.ts                 # Liveblocks global type augmentation
├── middleware.ts                        # Clerk Edge middleware (route protection)
├── tailwind.config.ts                   # Tailwind config + design tokens
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- A [Clerk](https://clerk.com) account and application
- A [Liveblocks](https://liveblocks.io) account and project

### 1. Clone the repository

```bash
git clone https://github.com/Engraya/codraft.git
cd codraft
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env.local
```

Open `.env.local` and fill in your Clerk and Liveblocks credentials. See [Environment Variables](#environment-variables) for details.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Sign up for an account and start creating documents.

### 5. Production build

```bash
npm run build
npm run start
```

---

## Environment Variables

Create `.env.local` in the project root. **Never commit this file.**

```bash
# ─────────────────────────────────────────────
# CLERK — Authentication
# Dashboard → Your App → API Keys
# https://dashboard.clerk.com
# ─────────────────────────────────────────────

# Public key used client-side (safe to expose)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...

# Secret key — server-side only, never exposed to the browser
CLERK_SECRET_KEY=sk_test_...

# Route configuration for Clerk's built-in redirects
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# ─────────────────────────────────────────────
# LIVEBLOCKS — Real-time collaboration
# Dashboard → Your Project → API Keys
# https://liveblocks.io/dashboard
# ─────────────────────────────────────────────

# Secret key for server-side Liveblocks SDK (room management, auth endpoint)
LIVEBLOCKS_SECRET_KEY=sk_prod_...

# ─────────────────────────────────────────────
# SENTRY — Error monitoring (optional)
# https://sentry.io → Your Project → Settings → SDK Setup
# ─────────────────────────────────────────────

# DSN for client and server error reporting
NEXT_PUBLIC_SENTRY_DSN=https://...@sentry.io/...

# Auth token for uploading source maps at build time
SENTRY_AUTH_TOKEN=sntrys_...
```

---

## API Reference

CoDraft uses **Next.js Server Actions** for all data mutations — there is no separate REST or GraphQL API. One HTTP endpoint exists for the Liveblocks auth handshake.

### `POST /api/liveblocks-auth`

Authenticates the current Clerk session with Liveblocks and returns a signed identity token. Called automatically by `LiveblocksProvider` on mount.

**Auth:** Requires a valid Clerk session cookie. Redirects to `/sign-in` if unauthenticated.

**Response:** A Liveblocks signed token with the following user metadata:

```typescript
{
  id: string;     // Clerk user ID
  name: string;   // "First Last"
  email: string;  // Primary email address
  avatar: string; // Clerk profile image URL
  color: string;  // Deterministic hex color derived from user ID
}
```

---

### Server Actions — Documents (`lib/actions/room.actions.ts`)

| Action | Description |
|--------|-------------|
| `createDocument({ userId, email })` | Creates a Liveblocks room with a nanoid key. Sets the creator as the only `room:write` user. |
| `getDocument({ roomId, userEmail })` | Fetches a room. Throws if the requesting email is not in `usersAccesses`. |
| `getDocuments(email)` | Returns all rooms where the given email has any level of access. |
| `updateDocument(roomId, title)` | Updates `metadata.title`. Revalidates the editor page cache. |
| `updateDocumentAccess({ roomId, email, userType, updatedBy })` | Grants or changes access. Triggers a `$documentAccess` inbox notification to the recipient. |
| `removeCollaborator({ roomId, email })` | Revokes access by setting `usersAccesses[email]` to `null`. Cannot remove the room owner. |
| `deleteDocument(roomId)` | Permanently deletes the Liveblocks room. Revalidates and redirects to `/`. |

### Server Actions — Users (`lib/actions/user.actions.ts`)

| Action | Description |
|--------|-------------|
| `getClerkUsers({ userIds })` | Resolves an array of emails to Clerk user profiles. Preserves input order; silently drops unknown emails. |
| `getDocumentUsers({ roomId, currentUser, text })` | Returns collaborator emails on a room for @mention suggestions, excluding the current user. Filters by `text` if provided. |

---

## Key Patterns & Developer Notes

### `parseStringify`

Next.js Server Actions must return plain JSON-serializable values. Liveblocks SDK responses include non-serializable fields (class instances, Dates, circular references). All Server Actions pass their return values through:

```typescript
const parseStringify = <T>(value: T): T => JSON.parse(JSON.stringify(value));
```

This strips non-serializable fields at the boundary. Code consuming Server Action results should expect ISO 8601 strings instead of `Date` objects.

### `userId` = email, not Clerk ID

Liveblocks room access is keyed by email: `{ [email]: ['room:write'] }`. This means Liveblocks' `userId` must be the user's email, not the Clerk user ID. The `/api/liveblocks-auth` endpoint explicitly passes the email as `userId` to `liveblocks.identifyUser()`. The Clerk ID is used only for `RoomMetadata.creatorId` (owner checks).

### Access Type Mapping

```typescript
// editor / creator  →  ['room:write']
// viewer            →  ['room:read', 'room:presence:write']
getAccessType(userType: UserType): string[]
```

Viewers can see presence (their avatar appears to others, they can see others' avatars) but cannot modify document content.

### Deterministic Collaborator Colors

Each user is assigned a stable hex color from a curated 19-color palette using character-code summation of their Clerk user ID:

```typescript
const getUserColor = (userId: string): string => {
  let sum = 0;
  for (let i = 0; i < userId.length; i++) sum += userId.charCodeAt(i);
  return brightColors[sum % brightColors.length];
};
```

The same user always appears with the same color across sessions and across all collaborators' views, with no database storage required.

### `useDocumentTitle` Hook

Manages inline document title editing with the following behavior:

| Action | Result |
|--------|--------|
| Press **Enter** | Save title, exit edit mode |
| Press **Escape** | Discard changes, revert to last saved title |
| **Click outside** | Save if changed, exit edit mode |
| Server failure | Rollback to `committedTitleRef` (last successful save) |

The hook tracks a `committedTitleRef` separately from the live `title` state to avoid unnecessary Server Action calls when the title has not actually changed.

---

## Deployment

### Vercel (recommended)

CoDraft is a standard Next.js project with no custom build steps.

1. Push the repository to GitHub.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Add all environment variables from `.env.local` in the Vercel dashboard.
4. Deploy. Vercel detects Next.js automatically and configures the build pipeline.

Verify your production build locally before pushing:

```bash
npm run build && npm run start
```

### Self-Hosted

The project runs on any Node.js 18+ host:

```bash
npm run build
PORT=3000 npm run start
```

Set all required environment variables in your platform's config panel. Ensure `NEXT_PUBLIC_*` variables are available at **build time** — they are inlined at compile time by Next.js and cannot be injected at runtime.

---

## Screenshots

> Replace these placeholders with actual screenshots after deployment.

| Screen | Preview |
|--------|---------|
| **Sign In** | ![Sign In](docs/screenshots/sign-in.png) |
| **Dashboard** | ![Dashboard](docs/screenshots/dashboard.png) |
| **Document Editor** | ![Editor](docs/screenshots/editor.png) |
| **Share Modal** | ![Share](docs/screenshots/share-modal.png) |
| **Notification Inbox** | ![Notifications](docs/screenshots/notifications.png) |
| **Mobile View** | ![Mobile](docs/screenshots/mobile.png) |

---

## Future Improvements

The following improvements are natural extensions based on the current architecture:

- **Document templates** — Pre-populated room content for common formats (meeting notes, product specs, briefs).
- **Cursor presence** — Extend the `Presence` type in `liveblocks.config.ts` to broadcast cursor positions and render each collaborator's cursor inline in the Lexical editor.
- **Document versioning** — Expose Liveblocks' room history API to view and restore previous document states.
- **Export** — Render the Lexical editor state server-side to produce Markdown, PDF, or plain text exports.
- **Public share links** — Generate a signed, read-only URL allowing access without a Clerk account.
- **Workspace model** — Group documents under a shared workspace with team-wide access defaults.
- **Dark / light mode toggle** — Both `dark-theme.css` and `light-theme.css` exist for Lexical; wiring up a `next-themes` toggle completes the feature.
- **Email notifications** — Supplement in-app notifications with Clerk or Resend-backed email delivery for offline collaborators.
- **Offline support** — Queue edits locally when disconnected and sync on reconnect using Liveblocks offline persistence.

---

## Contributing

Contributions are welcome. Please follow these steps:

**1. Fork and branch**

```bash
git checkout -b feat/your-feature-name
```

**2. Develop**

Ensure the TypeScript compiler has no new errors:

```bash
npx tsc --noEmit
npm run lint
```

**3. Test locally** with a real Clerk application and Liveblocks project. The real-time features cannot be meaningfully tested without live services.

**4. Commit** using [Conventional Commits](https://www.conventionalcommits.org):

```
feat: add cursor presence to live collaborators
fix: prevent owner removal via removeCollaborator action
refactor: extract notification kinds into shared constants
```

**5. Open a pull request** against `main` with a clear description of what changed and why.

### Code Conventions

- All new code must be TypeScript — no `any` types.
- Data fetching and mutations belong in Server Actions under `lib/actions/`.
- Use `cn()` for all conditional class name composition.
- All Liveblocks mutations must go through the Node SDK server-side; never call Liveblocks management APIs from the client.
- New Server Actions must pass Liveblocks SDK responses through `parseStringify()` before returning.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">

Built by [Ahmad](https://github.com/Engraya) &nbsp;·&nbsp; Powered by [Next.js](https://nextjs.org), [Liveblocks](https://liveblocks.io), and [Clerk](https://clerk.com)

</div>
