import AddDocumentBtn from '@/components/AddDocumentBtn';
import { DeleteModal } from '@/components/DeleteModal';
import DocumentSearch from '@/components/DocumentSearch';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Notifications from '@/components/Notifications';
import { getDocuments } from '@/lib/actions/room.actions';
import { dateConverter } from '@/lib/utils';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import { FileText } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

type DocItem = {
  id: string;
  metadata: RoomMetadata;
  createdAt: string;
  lastConnectionAt?: string | null;
};

const Home = async ({
  searchParams,
}: {
  searchParams: { q?: string; sort?: string };
}) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');

  const email = clerkUser.emailAddresses[0].emailAddress;

  let roomDocuments;
  try {
    roomDocuments = await getDocuments(email);
  } catch {
    roomDocuments = null;
  }

  const allDocuments = (roomDocuments?.data ?? []) as DocItem[];

  const query = searchParams.q?.toLowerCase().trim() ?? '';
  const sort  = searchParams.sort ?? 'updated';

  const documents = allDocuments
    .filter((d) => !query || (d.metadata.title ?? 'Untitled').toLowerCase().includes(query))
    .sort((a, b) => {
      const aDate = sort === 'updated' ? (a.lastConnectionAt ?? a.createdAt) : a.createdAt;
      const bDate = sort === 'updated' ? (b.lastConnectionAt ?? b.createdAt) : b.createdAt;
      return new Date(bDate).getTime() - new Date(aDate).getTime();
    });

  return (
    <main className="home-container">
      <Header className="sticky left-0 top-0">
        <div className="flex items-center gap-2">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      <div className="document-list-container pt-8">
        {/* ── Page heading row ── */}
        <div className="document-list-title">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tracking-tight text-[#F4F4F5]">
              Documents
            </h1>
            {allDocuments.length > 0 && (
              <span className="inline-flex items-center rounded-full bg-dark-400 border border-dark-500 px-2.5 py-0.5 text-xs font-medium text-[#A1A1AA]">
                {allDocuments.length}
              </span>
            )}
          </div>
          <AddDocumentBtn userId={clerkUser.id} email={email} />
        </div>

        {/* ── Search + sort bar ── */}
        {allDocuments.length > 0 && (
          <DocumentSearch initialQ={searchParams.q ?? ''} initialSort={sort} />
        )}

        {/* ── Document list ── */}
        {allDocuments.length > 0 ? (
          documents.length > 0 ? (
            <ul className="document-ul animate-fade-in">
              {documents.map(({ id, metadata, createdAt, lastConnectionAt }) => {
                const edited = sort === 'updated'
                  ? (lastConnectionAt ?? createdAt)
                  : createdAt;
                return (
                  <li key={id} className="document-list-item">
                    <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4 min-w-0">
                      {/* Doc icon */}
                      <div className="hidden shrink-0 sm:flex size-10 items-center justify-center rounded-xl bg-dark-350 border border-dark-500">
                        <FileText className="size-4 text-blue-400" strokeWidth={1.5} />
                      </div>

                      {/* Title + meta */}
                      <div className="min-w-0 space-y-0.5">
                        <p className="line-clamp-1 text-sm font-medium text-[#F4F4F5] group-hover:text-white transition-colors">
                          {metadata.title || 'Untitled'}
                        </p>
                        <p className="text-xs text-[#71717A]">
                          {sort === 'updated' ? 'Edited' : 'Created'}{' '}
                          {dateConverter(edited)}
                        </p>
                      </div>
                    </Link>

                    {/* Delete — revealed on row hover */}
                    <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                      <DeleteModal roomId={id} />
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            /* No search results */
            <div className="flex w-full max-w-[860px] flex-col items-center justify-center gap-2 py-16">
              <p className="text-sm font-medium text-[#F4F4F5]">
                No results for &ldquo;{searchParams.q}&rdquo;
              </p>
              <p className="text-sm text-[#71717A]">Try a different search term.</p>
            </div>
          )
        ) : (
          /* Empty state */
          <div className="document-list-empty animate-fade-in">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-dark-400 border border-dark-500">
              <FileText className="size-6 text-[#52525B]" strokeWidth={1.5} />
            </div>

            <div className="text-center space-y-1">
              <p className="text-base font-semibold text-[#F4F4F5]">No documents yet</p>
              <p className="text-sm text-[#71717A] max-w-[260px]">
                Create your first document and start collaborating with your team.
              </p>
            </div>

            <AddDocumentBtn userId={clerkUser.id} email={email} />
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
};

export default Home;
