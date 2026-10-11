import { useState, useEffect } from "react";
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
import { m, AnimatePresence } from "framer-motion";

interface ContactFormModalProps {
  trigger?: React.ReactNode;
}

const ContactFormModal = ({ trigger }: ContactFormModalProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  // The confetti and database libraries are only needed once a message has
  // been sent, so they are loaded at that moment instead of with every page.
  const triggerConfetti = async () => {
    const { default: confetti } = await import("canvas-confetti");
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#FF9900', '#FFB13D', '#041B2B', '#EDE5D8'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#FF9900', '#FFB13D', '#041B2B', '#EDE5D8'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  useEffect(() => {
    if (isSubmitted) {
      triggerConfetti();
    }
  }, [isSubmitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    // Ensure reply-to matches the visitor's email (if present)
    const visitorEmail = formData.get("email");
    if (typeof visitorEmail === "string" && visitorEmail.trim()) {
      formData.set("_replyto", visitorEmail.trim());
    }

    try {
      const response = await fetch("https://formspree.io/f/xgoqlpdy", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      const data = await response
        .json()
        .catch(() => null as null | { error?: string; errors?: Array<{ message?: string }> });

      if (!response.ok) {
        const msg =
          data?.error ||
          data?.errors?.[0]?.message ||
          `Form submit failed (status ${response.status}).`;
        throw new Error(msg);
      }

      if (data && (data as any).error) {
        throw new Error((data as any).error);
      }

      // Save to database as backup (silent - don't affect UX if it fails)
      try {
        const { supabase } = await import("@/integrations/supabase/client");
        await supabase.from("contact_submissions").insert({
          name: formData.get("name") as string,
          company: formData.get("company") as string | null,
          email: formData.get("email") as string,
          telephone: formData.get("telephone") as string | null,
          message: formData.get("message") as string,
        });
      } catch {
        // Silent fail - Formspree succeeded, backup is just extra safety
      }

      setIsSubmitted(true);
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to send message.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setTimeout(() => setIsSubmitted(false), 300);
    }
  };

  // Shared input styling — white background, near-black text, gold focus
  const inputClass =
    "bg-[#F8FAFC] border-[#EDE5D8] text-[#041B2B] placeholder:text-[#89898E] focus:border-[#FF9900] focus:ring-[#FF9900]/20 h-10 rounded-lg transition-colors";

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="default">
            Get in Touch
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md bg-white text-[#041B2B] border border-[#041B2B]/10 shadow-[0_24px_64px_rgba(4,27,43,0.16)] rounded-2xl p-0 overflow-hidden [&>button]:text-[#4A6080] [&>button]:hover:text-[#041B2B]">
        <AnimatePresence mode="wait">
          {isSubmitted ? (
            <m.div
              key="success"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="py-12 px-6 text-center"
            >
              <m.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                className="w-20 h-20 bg-[#FF9900]/10 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-[#FF9900]" />
              </m.div>
              <h3 className="text-2xl font-heading font-semibold mb-3 text-[#0F172A]">
                Thank You!
              </h3>
              <p className="text-[#4A6080] mb-8 max-w-xs mx-auto">
                Your message has been sent successfully. We'll get back to you within 24 hours.
              </p>
              <button
                onClick={() => handleOpenChange(false)}
                className="text-sm text-[#4A6080] hover:text-[#041B2B] transition-colors underline underline-offset-2"
              >
                Close
              </button>
            </m.div>
          ) : (
            <m.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="p-6"
            >
              <DialogHeader className="pb-4 border-b border-[#041B2B]/10">
                <DialogTitle className="text-xl font-heading font-bold text-[#0F172A]">
                  Get in Touch
                </DialogTitle>
                <p className="text-[#4A6080] text-sm">
                  Tell us what you're exploring and we'll respond shortly.
                </p>
              </DialogHeader>

              <form
                onSubmit={handleSubmit}
                action="https://formspree.io/f/xgoqlpdy"
                method="POST"
                className="space-y-4 pt-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  {/* Full Name — not required */}
                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-[#041B2B] text-sm font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="John Smith"
                      className={inputClass}
                    />
                  </div>

                  {/* Company — required */}
                  <div className="space-y-1.5">
                    <Label htmlFor="company" className="text-[#041B2B] text-sm font-medium">
                      Company <span className="text-[#FF9900]">*</span>
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      placeholder="Acme Inc."
                      required
                      minLength={2}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Email — required */}
                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-[#041B2B] text-sm font-medium">
                      Email <span className="text-[#FF9900]">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      required
                      className={inputClass}
                    />
                  </div>

                  {/* Phone — not required */}
                  <div className="space-y-1.5">
                    <Label htmlFor="telephone" className="text-[#041B2B] text-sm font-medium">
                      Phone
                    </Label>
                    <Input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      placeholder="+44 20 1234 5678"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* How can we help — not required */}
                <div className="space-y-1.5">
                  <Label htmlFor="message" className="text-[#041B2B] text-sm font-medium">
                    How can we help?
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us about your project or question..."
                    rows={3}
                    className={`${inputClass} h-auto resize-none`}
                  />
                </div>

                {/* Hidden fields */}
                <input type="hidden" name="_subject" value="New Contact Form Submission - IntegroAI" />
                <input type="text" name="_gotcha" style={{ display: "none" }} />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#FF9900] hover:bg-[#FFAA2B] disabled:opacity-70 text-[#041B2B] font-bold rounded-full h-11 text-sm transition-colors duration-200 mt-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>

                <p className="text-xs text-[#4A6080] text-center pt-1">
                  We typically respond within 24 hours
                </p>
              </form>
            </m.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
