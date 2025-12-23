import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-charcoal" />
      
      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-6 text-center">
        {/* Logo with animation */}
        <div className="animate-fadeIn opacity-0" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
          <img
            src={logo}
            alt="Maan Silk Center"
            className="mx-auto w-64 md:w-80 lg:w-96 animate-float"
          />
        </div>

        {/* Tagline */}
        <div className="mt-8 animate-fadeUp opacity-0" style={{ animationDelay: "0.6s", animationFillMode: "forwards" }}>
          <p className="font-body text-xl md:text-2xl lg:text-3xl text-muted-foreground tracking-wide">
            Elegance Woven in Every Thread
          </p>
        </div>

        {/* Decorative line */}
        <div className="mt-8 animate-fadeUp opacity-0" style={{ animationDelay: "0.8s", animationFillMode: "forwards" }}>
          <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
        </div>

        {/* CTA Buttons */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fadeUp opacity-0" style={{ animationDelay: "1s", animationFillMode: "forwards" }}>
          <Button variant="shimmer" size="xl">
            Explore Collection
          </Button>
          <Button variant="goldOutline" size="xl">
            Our Story
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fadeUp opacity-0" style={{ animationDelay: "1.4s", animationFillMode: "forwards" }}>
          <a
            href="#collections"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-gold transition-colors"
          >
            <span className="font-display text-xs tracking-widest uppercase">Discover</span>
            <ArrowDown className="w-5 h-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
