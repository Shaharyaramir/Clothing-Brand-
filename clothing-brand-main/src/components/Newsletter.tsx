import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('newsletter_subscribers')
        .insert({ email: email.toLowerCase().trim() });

      if (error) {
        if (error.code === '23505') {
          toast.info("You're already subscribed! Thank you for your interest.");
        } else {
          throw error;
        }
      } else {
        toast.success("Thank you for subscribing! Welcome to our exclusive list.");
      }
      setEmail("");
    } catch (error) {
      console.error("Subscription error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-24 bg-charcoal relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/10 rounded-full blur-3xl" />
      </div>

      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-display text-gold text-sm tracking-widest uppercase mb-4">
            Stay Connected
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground mb-4">
            Join Our <span className="gradient-text">Exclusive</span> List
          </h2>
          <p className="font-body text-lg text-muted-foreground mb-8">
            Be the first to know about new collections, exclusive offers, 
            and the latest in silk fashion. Subscribe to our newsletter.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 h-14 bg-background/50 border-border/50 text-foreground placeholder:text-muted-foreground font-body text-lg focus:border-gold transition-colors"
            />
            <Button
              type="submit"
              variant="shimmer"
              size="xl"
              disabled={isLoading}
              className="min-w-[150px]"
            >
              {isLoading ? "Joining..." : "Subscribe"}
            </Button>
          </form>

          <p className="font-body text-sm text-muted-foreground/60 mt-6">
            By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
