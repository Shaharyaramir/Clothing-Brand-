const About = () => {
  return (
    <section id="about" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gold/5 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=1000&fit=crop"
                alt="Silk weaving craftsmanship"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative frame */}
            <div className="absolute -inset-4 border border-gold/20 rounded-lg -z-10" />
            <div className="absolute -bottom-8 -right-8 w-32 h-32 border border-gold/30 rounded-lg" />
          </div>

          {/* Content side */}
          <div className="lg:pl-8">
            <p className="font-display text-gold text-sm tracking-widest uppercase mb-4">
              Our Heritage
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-foreground mb-6 leading-tight">
              A Legacy of <br />
              <span className="gradient-text">Timeless Elegance</span>
            </h2>
            <div className="w-16 h-px bg-gold mb-8" />
            
            <div className="space-y-6 font-body text-lg text-muted-foreground">
              <p>
                For generations, Maan Silk Center has been synonymous with exceptional 
                craftsmanship and unparalleled quality in women's fashion. Our journey 
                began with a simple vision: to bring the finest silk creations to 
                discerning women who appreciate true artistry.
              </p>
              <p>
                Each piece in our collection tells a story of tradition meeting 
                contemporary elegance. Our master artisans pour their hearts into 
                every stitch, every weave, creating garments that transcend time 
                and trends.
              </p>
              <p>
                From bridal collections that make dreams come true to everyday luxury 
                that makes you feel special, we invite you to experience the magic 
                of authentic silk fashion.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-border/30">
              <div>
                <p className="font-display text-3xl md:text-4xl gradient-text">25+</p>
                <p className="font-body text-sm text-muted-foreground mt-1">Years of Excellence</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl gradient-text">500+</p>
                <p className="font-body text-sm text-muted-foreground mt-1">Unique Designs</p>
              </div>
              <div>
                <p className="font-display text-3xl md:text-4xl gradient-text">10K+</p>
                <p className="font-body text-sm text-muted-foreground mt-1">Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
