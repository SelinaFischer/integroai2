import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { articles } from "@/lib/blogData";
import { fadeUp, fadeUpDelayed } from "@/lib/motion";

// Homepage shows only the latest 3 articles, newest first. The full list
// lives on /blog via "View all posts" below. Source of truth is articles in
// blogData.tsx.
const VISIBLE_COUNT = 3;

const latestPosts = [...articles]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, VISIBLE_COUNT);

const BlogPosts = () => {
  return (
    <section id="blog" className="bg-white py-14 sm:py-16">
      <div className="wrap flex flex-col gap-8">
        <SectionHeader eyebrow="Blog" title="Practical AI guides for business leaders" />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {latestPosts.map((post, index) => (
            <motion.article key={post.slug} {...fadeUpDelayed(index)} className="flex">
              <Link
                to={`/blog/${post.slug}`}
                className="card-soft group flex flex-1 flex-col gap-3 p-7 transition-colors hover:border-brand-amber"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-slate">{post.category}</p>
                <h3 className="text-[22px] leading-tight">{post.title}</h3>
                <p className="line-clamp-3 flex-1 text-base leading-relaxed text-brand-slate">{post.excerpt}</p>
                <span className="py-2.5 text-base font-bold text-brand-navy underline underline-offset-4 group-hover:decoration-brand-amber">
                  Read article
                </span>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div {...fadeUp} className="flex justify-center">
          <Link to="/blog" className="btn-outline-navy">
            View all posts
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPosts;
