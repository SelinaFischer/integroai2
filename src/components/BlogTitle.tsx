// Shows a blog title with its opening question (or the part before a colon)
// on its own line, and the rest on the next line, so the question stands out.
// Titles without "? " or ": " are shown as they are.
export const splitBlogTitle = (title: string): [string, string] | null => {
  const match = title.match(/^(.+?[?:])\s+(.+)$/);
  return match ? [match[1], match[2]] : null;
};

const BlogTitle = ({ title }: { title: string }) => {
  const parts = splitBlogTitle(title);
  if (!parts) return <>{title}</>;
  return (
    <>
      <span className="block">{parts[0]}</span>
      <span className="block">{parts[1]}</span>
    </>
  );
};

export default BlogTitle;
