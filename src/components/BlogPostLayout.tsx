import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Tag, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

interface BlogPostLayoutProps {
  title: string;
  subtitle: string;
  date: string;
  category: string;
  readTime: string;
  children: React.ReactNode;
}

const BlogPostLayout = ({ title, subtitle, date, category, readTime, children }: BlogPostLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Header */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link 
              to="/#blog" 
              className="inline-flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Articles
            </Link>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/70 mb-6">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {date}
              </span>
              <span className="flex items-center gap-1.5 text-accent-warm">
                <Tag className="w-4 h-4" />
                {category}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readTime}
              </span>
            </div>
            
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight mb-6">
              {title}
            </h1>
            
            <p className="text-xl text-primary-foreground/80 leading-relaxed">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Article Content */}
      <article className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none
              prose-headings:text-foreground prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
              prose-strong:text-foreground prose-strong:font-semibold
              prose-ul:text-muted-foreground prose-ul:my-6
              prose-ol:text-muted-foreground prose-ol:my-6
              prose-li:mb-3
            "
          >
            {children}
          </motion.div>
          
          {/* Back to Blog */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-8 border-t border-border"
          >
            <Link 
              to="/#blog" 
              className="inline-flex items-center gap-2 text-accent-warm hover:text-accent-warm/80 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to All Articles
            </Link>
          </motion.div>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default BlogPostLayout;
