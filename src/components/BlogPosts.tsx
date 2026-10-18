import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
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

type BlogPostsProps = {
  /** Homepage version: sits right under the guide banner, titles only. */
  compact?: boolean;
};

const BlogPosts = ({ compact = false }: BlogPostsProps) => {
  return (
    <section id="blog" className={compact ? "bg-white pb-14 pt-12 sm:pb-16 sm:pt-14" : "bg-white py-14 sm:py-16"}>
      <div className="wrap flex flex-col gap-8">
        <SectionHeader eyebrow="Blog" title="Practical AI guides for business leaders" />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {latestPosts.map((post, index) => (
            <m.article key={post.slug} {...fadeUpDelayed(index)} className="flex">
              <Link
                to={`/blog/${post.slug}`}
                className="group flex flex-1 flex-col gap-4 rounded-[20px] border border-brand-sand bg-white px-7 pb-6 pt-7 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-amber/60 hover:shadow-[0_16px_36px_-18px_rgba(4,27,43,0.22)]"
              >
                <p className="flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.16em] text-brand-teal">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-amber" aria-hidden="true" />
                  {post.category}
                </p>
                <h3 className="font-heading text-[21px] font-semibold leading-[1.25] text-brand-navy [text-wrap:balance] sm:text-[22px]">
                  {post.title}
                </h3>
                {compact ? (
                  <span className="flex-1" />
                ) : (
                  <p className="line-clamp-3 flex-1 text-[15px] leading-relaxed text-brand-slate">{post.excerpt}</p>
                )}
                <span className="mt-1 flex items-center gap-1.5 border-t border-brand-sand pt-4 text-[13.5px] font-medium text-brand-slate transition-colors group-hover:text-brand-navy">
                  Read article
                  <ArrowRight className="h-3.5 w-3.5 text-brand-amber transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
                </span>
              </Link>
            </m.article>
          ))}
        </div>

        <m.div {...fadeUp} className="flex justify-center">
          <Link to="/blog" className="btn-outline-navy">
            View all posts
          </Link>
        </m.div>
      </div>
    </section>
  );
};

export default BlogPosts;
