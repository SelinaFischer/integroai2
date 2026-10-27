import { useLocation, Link, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

/**
 * GitHub Pages also answers file-style addresses such as /index, /index.html
 * or /about.html. Those are the same pages as /, /about ..., so send visitors
 * (and Google) to the clean address instead of showing "not found".
 * Returns null when the address is already clean.
 */
const cleanAddress = (pathname: string): string | null => {
  const cleaned =
    pathname
      .replace(/\/index(\.html?)?$/i, "/")
      .replace(/\.html?$/i, "")
      .replace(/\/+$/, "") || "/";
  return cleaned !== pathname ? cleaned : null;
};

const NotFound = () => {
  const location = useLocation();
  const redirectTo = cleanAddress(location.pathname);

  useEffect(() => {
    if (!redirectTo) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname, redirectTo]);

  if (redirectTo) {
    return <Navigate to={{ pathname: redirectTo, search: location.search, hash: location.hash }} replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      {/* A genuine "not found" page must never be indexed. */}
      <Helmet>
        <title>Page not found | IntegroAI Consulting</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="font-serif text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button variant="hero" asChild>
          <Link to="/">
            <ArrowLeft className="w-4 h-4" />
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
