import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const ProductCard = ({ id, title, price, image, rating }: ProductCardProps) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id, title, price, image });
    toast.success('Added to cart!');
  };

  return (
    <Link to={`/product/${id}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
        <CardContent className="p-6">
          <div className="aspect-square relative mb-4 overflow-hidden rounded-lg bg-secondary">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/shopverse-vibes/placeholder.svg";
              }}
            />
          </div>
          <h3 className="font-semibold text-base line-clamp-2 mb-2 min-h-[3rem]">
            {title}
          </h3>
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(rating.rate)
                    ? 'fill-accent text-accent'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-2">
              ({rating.count})
            </span>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between p-6 pt-0">
          <span className="text-2xl font-bold text-primary">
            ₹{price.toFixed(2)}
          </span>
          <Button
            size="icon"
            onClick={handleAddToCart}
            className="rounded-full"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
