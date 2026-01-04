import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    title: "Beyond Chatbots: How AI Agents Redefine Efficiency, Decision-Making & Growth",
    excerpt: "Automation saved time. But does autonomy create value? Discover how AI Agents move beyond rule-following to bring reasoning, adaptability, and strategic intelligence into business operations.",
    date: "December 6, 2025",
    category: "AI Strategy",
    slug: "beyond-chatbots-ai-agents"
  },
  {
    title: "Why AI Projects Fail: The Data Gap Nobody Talks About",
    excerpt: "The most advanced AI in the world is worthless without quality data. Learn why 85% of AI project failures are caused by data issues, not technology problems, and how to build solid data foundations for AI success.",
    date: "December 5, 2025",
    category: "Data Strategy",
    slug: "why-ai-fails-the-data-gap"
  },
  {
    title: "ROT to Resilience: The Data Cleanup Your AI Needs",
    excerpt: "30-40% of enterprise data is Redundant, Obsolete, and Trivial—costing money, creating risk, and sabotaging AI initiatives. Learn how to transform data clutter into competitive advantage.",
    date: "November 28, 2025",
    category: "Data Management",
    slug: "rot-to-resilience-data-cleanup"
  }
];

const BlogPosts = () => {
  return (
    <section id="blog" className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-accent-warm font-semibold text-sm tracking-wider uppercase">
            Insights
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mt-2">
            AI Strategy Insights
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Practical guidance for leaders navigating AI adoption
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link 
                to={`/blog/${post.slug}`}
                className="group block bg-card rounded-2xl border border-border/50 overflow-hidden hover:border-accent-warm/30 transition-all duration-300 hover:shadow-lg hover:shadow-accent-warm/5"
              >
                {/* Card Header with gradient */}
                <div className="h-2 bg-gradient-to-r from-primary via-primary/80 to-accent-warm" />
                
                <div className="p-6 space-y-4">
                  {/* Meta info */}
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5 text-accent-warm">
                      <Tag className="w-4 h-4" />
                      {post.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-foreground group-hover:text-accent-warm transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Read more link */}
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button variant="heroOutline" size="lg" className="group">
            View All Articles
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPosts;
