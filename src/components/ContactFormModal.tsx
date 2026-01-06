import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Send, CheckCircle2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactFormModalProps {
  trigger?: React.ReactNode;
}

const ContactFormModal = ({ trigger }: ContactFormModalProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    try {
      const response = await fetch("https://formspree.io/f/mnnezggg", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Message sent!",
          description: "We'll get back to you within 24 hours.",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      // Reset form state when closing
      setTimeout(() => setIsSubmitted(false), 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="default">
            Get in Touch
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-gradient-to-b from-primary to-primary/95 text-primary-foreground border-0 shadow-2xl rounded-2xl p-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="py-12 px-6 text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-accent" />
              </motion.div>
              <h3 className="text-2xl font-heading font-semibold mb-3">Thank You! 🎉</h3>
              <p className="text-primary-foreground/70 mb-8 max-w-xs mx-auto">
                Your message has been sent successfully. We'll get back to you within 24 hours.
              </p>
              <Button 
                variant="heroOutline" 
                onClick={() => handleOpenChange(false)}
                className="px-8"
              >
                Close
              </Button>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-6"
            >
              <DialogHeader className="pb-4 border-b border-primary-foreground/10">
                <DialogTitle className="text-xl font-heading text-primary-foreground">
                  Get in Touch
                </DialogTitle>
                <p className="text-primary-foreground/60 text-sm">
                  Tell us about your needs and we'll respond shortly.
                </p>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-primary-foreground/80 text-sm font-medium">
                      Full Name <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Smith"
                      required
                      minLength={2}
                      className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent/50 focus:ring-accent/20 h-10 rounded-lg transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-primary-foreground/80 text-sm font-medium">
                      Company <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Acme Inc."
                      required
                      minLength={2}
                      className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent/50 focus:ring-accent/20 h-10 rounded-lg transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-primary-foreground/80 text-sm font-medium">
                      Email <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent/50 focus:ring-accent/20 h-10 rounded-lg transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="telephone" className="text-primary-foreground/80 text-sm font-medium">
                      Phone <span className="text-accent">*</span>
                    </Label>
                    <Input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      placeholder="+44 20 1234 5678"
                      required
                      minLength={10}
                      className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent/50 focus:ring-accent/20 h-10 rounded-lg transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-primary-foreground/80 text-sm font-medium">
                    How can we help? <span className="text-accent">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project or question..."
                    required
                    rows={3}
                    className="bg-primary-foreground/5 border-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-accent/50 focus:ring-accent/20 rounded-lg resize-none transition-colors"
                  />
                </div>

                {/* Hidden fields for Formspree */}
                <input type="hidden" name="_subject" value="New Contact Form Submission - IntegroAI" />
                <input type="hidden" name="_replyto" value="info@integroai.tech" />
                {/* Honeypot for spam protection */}
                <input type="text" name="_gotcha" style={{ display: "none" }} />

                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full mt-2 h-11 rounded-lg font-medium"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>

                <p className="text-xs text-primary-foreground/40 text-center pt-1">
                  We typically respond within 24 hours
                </p>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
