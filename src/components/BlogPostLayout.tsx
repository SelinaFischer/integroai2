import { motion } from "framer-motion";
import { ChevronRight, Calendar, Tag, Clock, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "./Header";
import Footer from "./Footer";

interface BlogPostLayoutProps {
  title: string;
  subtitle: string;
  date: string;
  category: string;
  readTime: string;
  slug: string;
  children: React.ReactNode;
}

const BlogPostLayout = ({ title, subtitle, date, category, readTime, slug, children }: BlogPostLayoutProps) => {
  // Parse date string to ISO format (e.g., "December 6, 2025" -> "2025-12-06")
  const parseDate = (dateStr: string): string => {
    const parsed = new Date(dateStr);
    return parsed.toISOString().split('T')[0];
  };

  // Extract minutes from readTime (e.g., "10 min read" -> 10)
  const parseReadTime = (time: string): number => {
    const match = time.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 5;
  };

  const isoDate = parseDate(date);
  const readMinutes = parseReadTime(readTime);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://integroai.tech"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://integroai.tech/#blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": `https://integroai.tech/blog/${slug}`
      }
    ]
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": subtitle,
    "datePublished": isoDate,
    "dateModified": isoDate,
    "author": {
      "@type": "Person",
      "name": "Selina Fischer",
      "url": "https://integroai.tech/#founder",
      "jobTitle": "Founder & AI Strategist"
    },
    "publisher": {
      "@type": "Organization",
      "name": "IntegroAI Consulting",
      "url": "https://integroai.tech",
      "logo": {
        "@type": "ImageObject",
        "url": "https://integroai.tech/apple-touch-icon.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://integroai.tech/blog/${slug}`
    },
    "articleSection": category,
    "wordCount": readMinutes * 200, // Approximate word count based on reading time
    "timeRequired": `PT${readMinutes}M`,
    "image": "https://integroai.tech/og-image.png"
  };

  return (
    <>
      <Helmet>
        <title>{title} | IntegroAI Consulting</title>
        <meta name="description" content={subtitle} />
        <link rel="canonical" href={`https://integroai.tech/blog/${slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={subtitle} />
        <meta property="og:url" content={`https://integroai.tech/blog/${slug}`} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={isoDate} />
        <meta property="article:author" content="Selina Fischer" />
        <meta property="article:section" content={category} />
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>
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
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex items-center gap-1.5 text-sm text-primary-foreground/70">
                  <li>
                    <a 
                      href="/" 
                      className="flex items-center gap-1 hover:text-primary-foreground transition-colors"
                    >
                      <Home className="w-3.5 h-3.5" />
                      <span>Home</span>
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-3.5 h-3.5 mx-1" />
                    <a 
                      href="/#blog" 
                      className="hover:text-primary-foreground transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="flex items-center">
                    <ChevronRight className="w-3.5 h-3.5 mx-1" />
                    <span className="text-primary-foreground font-medium truncate max-w-[200px] sm:max-w-[300px]">
                      {title}
                    </span>
                  </li>
                </ol>
              </nav>
              
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
              <a 
                href="/#blog" 
                className="inline-flex items-center gap-2 text-accent-warm hover:text-accent-warm/80 transition-colors font-medium"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Back to All Articles
              </a>
            </motion.div>
          </div>
        </article>
        
        <Footer />
      </div>
    </>
  );
};

export default BlogPostLayout;
