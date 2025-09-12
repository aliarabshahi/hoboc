import { redirect } from 'next/navigation';

export default function TopicPage({
  params,
}: {
  params: { topicSlug: string }
}) {
  // Immediately redirect to the main blog page,
  // adding the selected topic as a query parameter
  redirect(`/blog?topic=${params.topicSlug}`);
}
