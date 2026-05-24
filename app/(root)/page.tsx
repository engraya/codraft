import AddDocumentBtn from '@/components/AddDocumentBtn';
import { DeleteModal } from '@/components/DeleteModal';
import DocumentSearch from '@/components/DocumentSearch';
import Header from '@/components/Header';
import Notifications from '@/components/Notifications';
import { getDocuments } from '@/lib/actions/room.actions';
import { dateConverter } from '@/lib/utils';
import { SignedIn, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
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
  const sort = searchParams.sort ?? 'updated';

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
        <div className="flex items-center gap-2 lg:gap-4">
          <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {allDocuments.length > 0 ? (
        <div className="document-list-container">
          <div className="document-list-title">
            <h1 className="text-4xl font-extrabold leading-none tracking-normal md:text-3xl md:tracking-tight">
              <span className="block w-full bg-gradient-to-r from-green-400 to-purple-300 bg-clip-text text-center text-transparent lg:inline">
                All Documents
              </span>
            </h1>
            <AddDocumentBtn userId={clerkUser.id} email={email} />
          </div>

          <DocumentSearch initialQ={searchParams.q ?? ''} initialSort={sort} />

          {documents.length > 0 ? (
            <ul className="document-ul">
              {documents.map(({ id, metadata, createdAt }) => (
                <li key={id} className="document-list-item">
                  <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
                    <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                      <Image
                        src="/assets/icons/doc.svg"
                        alt="Document"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="line-clamp-1 text-lg font-medium">
                        {metadata.title || 'Untitled'}
                      </p>
                      <p className="text-sm font-light text-blue-100">
                        Created {dateConverter(createdAt)}
                      </p>
                    </div>
                  </Link>
                  <DeleteModal roomId={id} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-12 text-center">
              <p className="text-white">No documents match &ldquo;{searchParams.q}&rdquo;</p>
              <p className="mt-1 text-sm text-blue-100">Try a different search term</p>
            </div>
          )}
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doc.svg"
            alt="No documents"
            width={40}
            height={40}
            className="mx-auto opacity-50"
          />
          <div className="text-center">
            <p className="text-lg font-semibold text-white">No documents yet</p>
            <p className="mt-1 text-sm text-blue-100">
              Create your first document to start collaborating
            </p>
          </div>
          <AddDocumentBtn userId={clerkUser.id} email={email} />
        </div>
      )}
    </main>
  );
};

export default Home;
