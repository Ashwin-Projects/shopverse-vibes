import { useState, useEffect } from 'react';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const INR_RATE = 83;

const EXTRA_PRODUCTS: Product[] = [
  { id: 1001, title: "U.S. Polo Assn. Classic Polo Shirt", price: 1999, description: "Premium cotton polo.", category: "men's clothing", image: "/shopverse-vibes/placeholder.svg", rating: { rate: 4.4, count: 120 } },
  { id: 1002, title: "Ralph Lauren Oxford Shirt", price: 4599, description: "Tailored oxford shirt.", category: "men's clothing", image: "/shopverse-vibes/placeholder.svg", rating: { rate: 4.6, count: 90 } },
  { id: 1003, title: "Van Heusen Formal Shirt", price: 2299, description: "Formal cotton shirt.", category: "men's clothing", image: "/shopverse-vibes/placeholder.svg", rating: { rate: 4.3, count: 75 } },
  { id: 1004, title: "Ralph Lauren Crew Neck T-Shirt", price: 2499, description: "Soft crew neck tee.", category: "men's clothing", image: "/shopverse-vibes/placeholder.svg", rating: { rate: 4.5, count: 110 } },
  { id: 1005, title: "U.S. Polo Assn. Slim Jeans", price: 3499, description: "Slim fit denim.", category: "men's clothing", image: "/shopverse-vibes/placeholder.svg", rating: { rate: 4.2, count: 60 } },
  { id: 1006, title: "Van Heusen Blazer", price: 7999, description: "Single-breasted blazer.", category: "men's clothing", image: "/shopverse-vibes/placeholder.svg", rating: { rate: 4.4, count: 40 } },
];

export const useFetchProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        const converted = (data as Product[]).map(p => ({ ...p, price: Math.round(p.price * INR_RATE) }));
        setProducts([...converted, ...EXTRA_PRODUCTS]);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
};

export const useFetchProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const idNum = Number(id);
        const local = EXTRA_PRODUCTS.find(p => p.id === idNum);
        if (local) {
          setProduct(local);
          return;
        }
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct({ ...data, price: Math.round(data.price * INR_RATE) });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};

export const useFetchCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading };
};
