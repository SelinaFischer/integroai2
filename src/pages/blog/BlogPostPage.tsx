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

  const { Content, ...layoutProps } = article;

  return (
    <BlogPostLayout {...layoutProps}>
      <Content />
    </BlogPostLayout>
  );
};

export default BlogPostPage;
