import { motion } from "framer-motion";
import { ArrowRight, Tag, Clock, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { articles } from "@/lib/blogData";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// All posts from blogData.tsx — single source of truth
const allPosts = articles.map(({ slug, title, excerpt, category, date, readTime }) => ({
  slug,
  title,
  excerpt,
  category,
  date,
  readTime,
}));

const BlogPage = () => {
  return (
    <>
      <Helmet>
        <title>AI Strategy Insights | IntegroAI Consulting Blog</title>
        <meta
          name="description"
          content="Practical guidance for business leaders navigating AI adoption. Articles on AI readiness, operational efficiency, data strategy, and measuring ROI from AI investment."
        />
        <link rel="canonical" href="https://integroai.tech/blog" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "IntegroAI Consulting — AI Strategy Insights",
            url: "https://integroai.tech/blog",
            description:
              "Practical guidance for business leaders navigating AI adoption. Operations first. AI second. ROI always.",
            publisher: {
              "@type": "Organization",
              name: "IntegroAI Consulting",
              url: "https://integroai.tech",
            },
          })}
        </script>
      </Helmet>

      <main className="min-h-screen bg-background">
        <Header />
        {/* Hero */}
        <section className="py-20 lg:py-28 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-accent-warm font-semibold text-sm tracking-wider uppercase">
                Insights
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mt-3 mb-4">
                AI Strategy Insights
              </h1>
              <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
                Practical guidance for business leaders making clearer AI decisions before investing in tools, automation or new systems.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {allPosts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col h-full bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-accent-warm/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent-warm/5"
                  >
                    {/* Colour bar */}
                    <div className="h-1.5 bg-gradient-to-r from-primary via-primary/80 to-accent-warm" />

                    <div className="p-6 flex flex-col flex-1 space-y-4">
                      {/* Meta */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5 text-accent-warm">
                          <Tag className="w-3.5 h-3.5" />
                          {post.category}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5" />
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {post.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-base font-bold text-foreground group-hover:text-accent-warm transition-colors line-clamp-3 leading-snug">
                        {post.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>

                      {/* Read more */}
                      <div className="pt-2">
                        <span className="inline-flex items-center gap-2 text-accent-warm font-medium text-sm group-hover:gap-3 transition-all">
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default BlogPage;
