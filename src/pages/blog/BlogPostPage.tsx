import { useParams } from "react-router-dom";
import { articles } from "@/lib/blogData";
import BlogPostLayout from "@/components/BlogPostLayout";
import NotFound from "@/pages/NotFound";

// Dynamic blog page — renders any article from blogData.tsx by its slug.
// No changes needed here when adding new articles.

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  if (!article) return <NotFound />;

  const { Content, related, ...layoutProps } = article;

  // Two articles to suggest at the end: the hand-picked ones if the article
  // names any, otherwise the next two in the list (wrapping round).
  const index = articles.indexOf(article);
  const fallback = [1, 2].map((step) => articles[(index + step) % articles.length]);
  const picked = (related ?? [])
    .map((relatedSlug) => articles.find((a) => a.slug === relatedSlug))
    .filter((a): a is (typeof articles)[number] => Boolean(a));
  const keepReading = (picked.length ? picked : fallback)
    .filter((a) => a.slug !== article.slug)
    .slice(0, 2)
    .map(({ slug: nextSlug, title, category, readTime }) => ({ slug: nextSlug, title, category, readTime }));

  return (
    <BlogPostLayout {...layoutProps} keepReading={keepReading}>
      <Content />
    </BlogPostLayout>
  );
};

export default BlogPostPage;
