import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collections from "@/components/Collections";
import About from "@/components/About";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Maan Silk Center | Premium Women's Fashion & Silk Sarees</title>
        <meta
          name="description"
          content="Discover exquisite silk sarees and premium women's fashion at Maan Silk Center. Bridal collections, festive wear, and everyday luxury crafted with generations of expertise."
        />
        <meta
          name="keywords"
          content="silk sarees, women fashion, bridal sarees, festive wear, luxury fashion, Maan Silk Center"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <Collections />
        <About />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default Index;
