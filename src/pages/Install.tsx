import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Smartphone, Share, Plus, MoreVertical, Download, Check, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Install = () => {
  return (
    <>
      <Helmet>
        <title>Install IntegroAI App | Add to Home Screen</title>
        <meta name="description" content="Install the IntegroAI Consulting app on your phone for quick access. Works offline and loads instantly." />
        <meta name="robots" content="noindex" />
      </Helmet>

      <Header />

      <main className="min-h-screen bg-background pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            {/* Back link */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            {/* Header */}
            <div className="text-center mb-10 sm:mb-14">
              <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary/10 mb-6">
                <Smartphone className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                Install <span className="text-gradient-gold">IntegroAI</span>
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
                Add IntegroAI to your home screen for instant access. Works offline and loads in seconds.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-4 mb-10 sm:mb-14">
              {[
                { icon: Download, label: "Works Offline" },
                { icon: Smartphone, label: "App-like Experience" },
                { icon: Check, label: "Instant Loading" },
              ].map((benefit) => (
                <div key={benefit.label} className="text-center p-4 rounded-xl bg-muted/50">
                  <benefit.icon className="w-6 h-6 mx-auto mb-2 text-accent-warm" />
                  <span className="text-xs sm:text-sm font-medium text-muted-foreground">{benefit.label}</span>
                </div>
              ))}
            </div>

            {/* iOS Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card rounded-xl border border-border/50 p-6 sm:p-8 mb-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">iPhone & iPad</h2>
                  <p className="text-muted-foreground text-sm">Safari browser required</p>
                </div>
              </div>

              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">1</span>
                  <div className="pt-1">
                    <p className="font-medium mb-1">Tap the Share button</p>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      Look for the <Share className="w-4 h-4" /> icon at the bottom of Safari
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">2</span>
                  <div className="pt-1">
                    <p className="font-medium mb-1">Scroll and tap "Add to Home Screen"</p>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      Look for the <Plus className="w-4 h-4" /> icon in the menu
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">3</span>
                  <div className="pt-1">
                    <p className="font-medium mb-1">Tap "Add" to confirm</p>
                    <p className="text-muted-foreground text-sm">The app will appear on your home screen</p>
                  </div>
                </li>
              </ol>
            </motion.div>

            {/* Android Instructions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-card rounded-xl border border-border/50 p-6 sm:p-8 mb-10"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.523 2.047a.5.5 0 0 0-.86.014l-1.652 2.877a9.96 9.96 0 0 0-6.022 0L7.337 2.06a.5.5 0 0 0-.86-.014.5.5 0 0 0-.054.476l1.528 2.66A9.965 9.965 0 0 0 2 14h20a9.965 9.965 0 0 0-5.951-8.818l1.528-2.66a.5.5 0 0 0-.054-.475zM7 11.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm10 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM2 16v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4H2z"/>
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-bold">Android</h2>
                  <p className="text-muted-foreground text-sm">Chrome browser recommended</p>
                </div>
              </div>

              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">1</span>
                  <div className="pt-1">
                    <p className="font-medium mb-1">Tap the menu button</p>
                    <p className="text-muted-foreground text-sm flex items-center gap-2">
                      Look for the <MoreVertical className="w-4 h-4" /> icon in Chrome's top-right corner
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">2</span>
                  <div className="pt-1">
                    <p className="font-medium mb-1">Tap "Install app" or "Add to Home screen"</p>
                    <p className="text-muted-foreground text-sm">The option name may vary by device</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm flex items-center justify-center">3</span>
                  <div className="pt-1">
                    <p className="font-medium mb-1">Tap "Install" to confirm</p>
                    <p className="text-muted-foreground text-sm">The app will be added to your home screen and app drawer</p>
                  </div>
                </li>
              </ol>
            </motion.div>

            {/* CTA */}
            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-4">
                Already installed? You're all set!
              </p>
              <Button variant="hero" size="lg" asChild>
                <Link to="/">
                  Go to Home
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Install;
