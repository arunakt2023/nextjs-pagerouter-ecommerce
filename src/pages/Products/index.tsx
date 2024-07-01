import React, { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import { ProductServices } from '@/Services/Product-Services';
import ProductCard from '@/Components/ProductCard/ProductCard';
import CategoryFilter from '@/Components/CategoryFilter/CategoryFilter';

interface Product {
  id: string;
  name: string;
  image: { url: string };
  price: { formatted: string };
  categories: { slug: string }[];
}

interface ProductsProps {
  initialProducts: Product[];
}

const Products: React.FC<ProductsProps> = ({ initialProducts }) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await ProductServices.getProducts();
        setProducts(data);
        setFilteredProducts(data); 
      } catch (error) {
        console.error('Error fetching products:', error);
        
      }
    }
    fetchData();
  }, []);

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    if (category) {
      const filtered = products.filter(product => product.categories.some(cat => cat.slug === category));
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-3'>
          <CategoryFilter onFilterChange={handleFilterChange} />
        </div>
        <div className='col-md-9'>
          <ProductCard products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<ProductsProps> = async () => {
  try {
    const initialProducts = await ProductServices.getProducts();
    return {
      props: {
        initialProducts,
      },
      revalidate: 60, 
    };
  } catch (error) {
    console.error('Error fetching initial products:', error);
    return {
      props: {
        initialProducts: [],
      },
      revalidate: 60, 
    };
  }
};

export default Products;
