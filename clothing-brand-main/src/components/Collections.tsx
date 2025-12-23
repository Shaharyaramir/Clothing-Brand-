import { Button } from "@/components/ui/button";

const collections = [
  {
    id: 1,
    title: "Bridal Silk",
    description: "Exquisite silk sarees for your special day",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&h=800&fit=crop",
  },
  {
    id: 2,
    title: "Festive Wear",
    description: "Celebrate in timeless elegance",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop",
  },
  {
    id: 3,
    title: "Everyday Luxury",
    description: "Sophisticated styles for daily grace",
    image: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?w=600&h=800&fit=crop",
  },
];

const Collections = () => {
  return (
    <section id="collections" className="py-24 bg-charcoal relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
            Our <span className="gradient-text">Collections</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of premium silk garments, each piece crafted with generations of expertise
          </p>
          <div className="mt-6 mx-auto w-16 h-px bg-gold" />
        </div>

        {/* Collections Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className="group relative overflow-hidden rounded-lg cursor-pointer"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Image */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-display text-2xl text-foreground mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {collection.title}
                </h3>
                <p className="font-body text-muted-foreground mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  {collection.description}
                </p>
                <Button
                  variant="goldOutline"
                  size="sm"
                  className="w-fit opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150 translate-y-4 group-hover:translate-y-0"
                >
                  View Collection
                </Button>
              </div>

              {/* Gold border on hover */}
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/50 rounded-lg transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Button variant="elegant" size="lg">
            View All Collections
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Collections;
