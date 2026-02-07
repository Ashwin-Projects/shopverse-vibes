import { Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { useFetchProducts } from '@/hooks/useFetchProducts';

const Home = () => {
  const { products, loading } = useFetchProducts();
  const featuredProducts = products.slice(0, 4);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link to="/products">
            <Button variant="outline">View All</Button>
          </Link>
        </div>
        
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
