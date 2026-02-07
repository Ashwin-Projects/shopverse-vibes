import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-headphones.jpg';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          background: 'linear-gradient(135deg, hsl(var(--hero-gradient-start)), hsl(var(--hero-gradient-end)))'
        }}
      />
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Discover Quality Products at Your Fingertips
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              Shop smarter with curated collections, seamless experience, and the best deals.
            </p>
            <Link to="/products">
              <Button size="lg" className="text-lg px-8">
                Shop Now
              </Button>
            </Link>
          </div>
          <div className="flex justify-center animate-scale-in">
            <img
              src={heroImage}
              alt="Premium wireless headphones"
              className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
