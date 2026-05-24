# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint check
npm start        # Run production server
```

No test suite is configured.

## Architecture

CoDraft is a real-time collaborative document editor built on **Next.js 14 App Router**, **Liveblocks** (rooms + presence + threads), **Clerk** (auth), and **Lexical** (rich text editor). There is no database — Liveblocks rooms are the persistence layer.

### Key Data Model

- **Document = Liveblocks Room.** Each room has metadata `{ creatorId, email, title }`.
- **Permissions are email-based, per-room.** Three tiers:
  - Creator: implicit owner
  - Editor: `room:write`
  - Viewer: `room:read + room:presence:write`
- `getAccessType()` in [lib/utils.ts](lib/utils.ts) maps UI role strings to Liveblocks access arrays.

### Request Flow

1. `middleware.ts` — Clerk protects all routes except `/sign-in` and `/sign-up`
2. `app/(root)/page.tsx` — Lists user's rooms via `getDocuments()` server action
3. `app/(root)/documents/[id]/page.tsx` — Loads room, renders `<CollaborativeRoom>`
4. `components/CollaborativeRoom.tsx` — Wraps `<RoomProvider>`, handles title editing via `useDocumentTitle` hook
5. `components/editor/Editor.tsx` — Lexical editor with Liveblocks plugins for real-time sync

### Server Actions

All mutations live in `lib/actions/`:
- [room.actions.ts](lib/actions/room.actions.ts) — `createDocument`, `getDocument`, `updateDocument`, `deleteDocument`, `updateDocumentAccess`, `removeCollaborator`, `getDocuments`
- [user.actions.ts](lib/actions/user.actions.ts) — `getClerkUsers` (resolve Clerk users by email), `getDocumentUsers` (users in a room for @mentions)

### Liveblocks Auth

`/api/liveblocks-auth/route.ts` — The Liveblocks auth endpoint. It receives a Clerk session, resolves user info, and returns a Liveblocks token with room permissions. **User identity in Liveblocks uses `email` as the `userId`**, not the Clerk ID.

### Types

Global types in [types/index.d.ts](types/index.d.ts): `SearchParamProps`, `AccessType`, `RoomAccess`, `RoomMetadata`, `CreateDocumentParams`, `ShareDocumentParams`, etc.

Liveblocks-specific types (presence, storage, user meta, room event, thread metadata) in [liveblocks.config.ts](liveblocks.config.ts).

## Environment Variables

```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
CLERK_SECRET_KEY
LIVEBLOCKS_SECRET_KEY
SENTRY_AUTH_TOKEN
```

## UI Component Library

shadcn/ui (base color: slate) with Radix UI primitives. Add new components via `npx shadcn-ui@latest add <component>`. Custom primitives live in [components/ui/](components/ui/).

Custom Tailwind tokens: `dark-*` shades (100–500), `blue-100/400/500`, `red-400/500`. See [tailwind.config.ts](tailwind.config.ts).

## Error Monitoring

Sentry is integrated for client, server, and edge runtimes via `instrumentation.ts` and `sentry.*.config.ts`. The Next.js config in `next.config.mjs` wraps the config with Sentry's build plugin.
