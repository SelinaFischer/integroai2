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
import { Send, CheckCircle2 } from "lucide-react";

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
      <DialogContent className="sm:max-w-lg bg-primary text-primary-foreground border-primary">
        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-2xl font-heading font-semibold mb-2">Thank You! 🎉</h3>
            <p className="text-primary-foreground/70 mb-6">
              Your message has been sent successfully. We'll get back to you within 24 hours.
            </p>
            <Button 
              variant="heroOutline" 
              onClick={() => handleOpenChange(false)}
            >
              Close
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-heading text-primary-foreground">
                Send Us Your Enquiry
              </DialogTitle>
              <p className="text-primary-foreground/70 text-sm mt-2">
                Tell us about your needs and we'll get back to you shortly.
              </p>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <p className="text-xs text-primary-foreground/60">
                <span className="text-destructive">*</span> Required fields
              </p>
              
              <div className="space-y-2">
                <Label htmlFor="name" className="text-primary-foreground">
                  Full Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Your name"
                  required
                  minLength={2}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-primary-foreground">
                  Email Address <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone" className="text-primary-foreground">
                  Telephone Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  placeholder="+44 20 1234 5678"
                  required
                  minLength={10}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="text-primary-foreground">
                  Company Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="company"
                  name="company"
                  placeholder="Company"
                  required
                  minLength={2}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-primary-foreground">
                  What Are You Looking For? <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Describe your needs or ask a question..."
                  required
                  rows={4}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 resize-none"
                />
              </div>

              {/* Hidden fields for Formspree */}
              <input type="hidden" name="_subject" value="New Contact Form Submission - IntegroAI" />
              <input type="hidden" name="_replyto" value="integroai.consulting@gmail.com" />
              {/* Honeypot for spam protection */}
              <input type="text" name="_gotcha" style={{ display: "none" }} />

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full mt-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Submit Inquiry
                  </>
                )}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactFormModal;
