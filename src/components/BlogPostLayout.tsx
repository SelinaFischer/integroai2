import { useState, useEffect } from "react";
import { m } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Tag, Clock, Share2, Check, Linkedin, ArrowUp, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createScrollHandler } from "@/lib/scrollToSection";
import Header from "./Header";
import Footer from "./Footer";

interface BlogPostLayoutProps {
  title: string;
  subtitle: string;
  date: string;
  category: string;
  readTime: string;
  slug: string;
  image?: string;
  /** Up to two articles suggested at the end of this one. */
  keepReading?: { slug: string; title: string; category: string; readTime: string }[];
  children: React.ReactNode;
}

const BlogPostLayout = ({ title, subtitle, date, category, readTime, slug, image, keepReading = [], children }: BlogPostLayoutProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Track reading progress
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setReadingProgress(Math.min(100, Math.max(0, progress)));
      setShowScrollTop(scrollTop > 400);
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Initial call
    
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const articleUrl = `https://integroai.tech/blog/${slug}`;
  const articleImage = image ? `https://integroai.tech${image}` : "https://integroai.tech/og-image.png";
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Article link has been copied to clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the URL manually.",
        variant: "destructive",
      });
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${title} - Great insights from @IntegroAI`);
    const url = encodeURIComponent(articleUrl);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank', 'noopener,noreferrer');
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(articleUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'noopener,noreferrer');
  };
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
        "item": "https://integroai.tech/blog"
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
    "image": articleImage
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
        <meta property="og:image" content={articleImage} />
        <meta property="og:image:alt" content={title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={subtitle} />
        <meta name="twitter:image" content={articleImage} />
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
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted/30">
        <m.div
          className="h-full bg-gradient-to-r from-accent-warm to-accent-warm/80"
          style={{ width: `${readingProgress}%` }}
          initial={{ width: 0 }}
          transition={{ duration: 0.1 }}
        />
      </div>
      
      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Hero Header */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-primary via-primary/95 to-primary/90">
          <div className="mx-auto w-full max-w-[calc(832px+2*var(--gutter))] px-gutter">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* One clear way back to the article list. */}
              <Link
                to="/blog"
                className="group mb-8 inline-flex items-center gap-2 text-[15px] font-medium text-primary-foreground/90 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
              >
                <ArrowLeft className="h-4 w-4 text-accent-warm transition-transform group-hover:-translate-x-1" strokeWidth={2.4} aria-hidden="true" />
                All articles
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
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  Selina Fischer
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-foreground leading-tight mb-6">
                {title}
              </h1>
              
              <p className="text-xl text-primary-foreground/80 leading-relaxed">
                {subtitle}
              </p>
            </m.div>
          </div>
        </section>
        
      
        {/* Article Content */}
        <article className="py-16 relative">
          {/* Floating Share Bar - Desktop Only */}
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col gap-3 z-40"
          >
            <div className="bg-card border border-border rounded-2xl shadow-lg p-3 flex flex-col gap-3">
              <span className="text-xs text-muted-foreground text-center font-medium pb-2 border-b border-border">
                Share
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={shareOnTwitter}
                className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Share on X (Twitter)"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={shareOnLinkedIn}
                className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCopyLink}
                className="h-10 w-10 rounded-xl hover:bg-primary/10 hover:text-primary transition-colors"
                aria-label="Copy link"
              >
                {copied ? (
                  <Check className="w-5 h-5 text-green-500" />
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                )}
              </Button>
            </div>
          </m.div>
          
          <div className="mx-auto w-full max-w-[calc(832px+2*var(--gutter))] px-gutter">
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg max-w-none
  prose-headings:text-foreground prose-headings:font-bold
  prose-h2:text-2xl prose-h2:mt-16 prose-h2:mb-7 prose-h2:leading-tight
  prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-5 prose-h3:leading-snug
  prose-p:text-muted-foreground prose-p:leading-8 prose-p:mb-8
  prose-strong:text-foreground prose-strong:font-semibold
  prose-ul:text-muted-foreground prose-ul:my-8
  prose-ol:text-muted-foreground prose-ol:my-8
  prose-li:mb-4 prose-li:leading-7

  [&>p]:mb-8
  [&>p]:leading-8
  [&>h2]:mt-16
  [&>h2]:mb-7
  [&>h3]:mt-10
  [&>h3]:mb-5
  [&>ul]:my-8
  [&>ol]:my-8
              "
            >
              {children}
            </m.div>
            
            {/* Keep reading: two suggested articles as cards. */}
            {keepReading.length > 0 && (
              <nav aria-label="Keep reading" className="mt-14 border-t border-border pt-8">
                <p className="eyebrow mb-4">Keep reading</p>
                <ul className="grid list-none grid-cols-1 gap-4 sm:grid-cols-2">
                  {keepReading.map((next) => (
                    <li key={next.slug}>
                      <Link
                        to={`/blog/${next.slug}`}
                        className="group flex h-full flex-col gap-2 rounded-[14px] border border-brand-sand bg-white p-5 transition-colors hover:border-brand-amber"
                      >
                        <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-brand-slate">
                          {next.category} · {next.readTime}
                        </span>
                        <span className="flex-1 text-[17px] font-medium leading-snug text-brand-navy">{next.title}</span>
                        <span className="flex items-center gap-1.5 text-[15px] font-semibold text-brand-navy">
                          Read article
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.4} aria-hidden="true" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {/* Share & Back Section */}
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-10 pt-8 border-t border-border"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                <Link to="/blog" className="btn-outline-navy group w-fit">
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" strokeWidth={2.4} aria-hidden="true" />
                  Back to all articles
                </Link>
                
                {/* Share Buttons */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                    <Share2 className="w-4 h-4" />
                    Share:
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shareOnTwitter}
                    className="gap-2"
                    aria-label="Share on X (Twitter)"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    <span className="hidden sm:inline">Twitter</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={shareOnLinkedIn}
                    className="gap-2"
                    aria-label="Share on LinkedIn"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="hidden sm:inline">LinkedIn</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopyLink}
                    className="gap-2"
                    aria-label="Copy link"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    )}
                    <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Link"}</span>
                  </Button>
                </div>
              </div>
            </m.div>
          </div>
        </article>
        
        <Footer />
        
        {/* Scroll to Top Button */}
        <m.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: showScrollTop ? 1 : 0, 
            scale: showScrollTop ? 1 : 0.8,
            pointerEvents: showScrollTop ? 'auto' : 'none'
          }}
          transition={{ duration: 0.2 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-accent-warm text-white shadow-lg hover:bg-accent-warm/90 hover:shadow-xl transition-all duration-300 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </m.button>
      </div>
    </>
  );
};

export default BlogPostLayout;
