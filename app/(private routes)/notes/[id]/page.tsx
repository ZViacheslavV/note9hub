import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NoteDetailsClient from './NoteDetails.client';
import { GRAPH_IMAGE_URL, SITE_URL } from '@/lib/constants';
import { Metadata } from 'next';
// import { fetchNoteById } from '@/lib/api/clientApi';
import { fetchServerNoteById } from '@/lib/api/serverApi';

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { id } = await params;
  const { title, content } = await fetchServerNoteById(id);

  return {
    title: `NoteHub · Note: ${title}`,
    description: content,
    openGraph: {
      title: `NoteHub · Note: ${title}`,
      description: content,
      url: `${SITE_URL}/notes/filter/${id}`,
      siteName: 'NoteHub',
      images: [
        {
          url: GRAPH_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: 'Note image',
        },
      ],
    },
  };
};

const NoteDetails = async ({ params }: Props) => {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchServerNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
};

export default NoteDetails;
