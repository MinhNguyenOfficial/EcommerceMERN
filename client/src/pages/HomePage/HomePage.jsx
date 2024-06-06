import ProductType from '../../components/ProductType/ProductType';
import SliderComponents from '../../components/SliderComponent/SliderComponent';
import { WrapperTypeProduct, WrapperButtonMore } from './style';
import slider1 from '../../assets/images/slider1.jpg';
import slider2 from '../../assets/images/slider2.jpg';
import slider3 from '../../assets/images/slider3.jpg';
import CardComponent from '../../components/CardComponent/CardComponent';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useDebounce from '../../hooks/useDebounce';
import { Button } from 'antd';
import Loading from '../../components/Loading/Loading';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [productLimit, setProductLimit] = useState(12);
  const searchInput = useSelector((state) => state.product.searchInput);
  const debouncedSearchText = useDebounce(searchInput);
  const [isLoading, setIsLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState();

  const getAllProduct = async () => {
    const res = await ProductService.getAllProduct(productLimit);
    setTotalProducts(res.total);
    setProducts(res.data);
  };

  const getSearchProducts = async (search) => {
    const res = await ProductService.getAllSearchProduct(search, productLimit);
    setProducts(res.data);
  };
  const getProducts = async () => {
    setIsLoading(true);
    try {
      if (debouncedSearchText.length > 0) {
        await getSearchProducts(debouncedSearchText);
      } else {
        await getAllProduct();
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [debouncedSearchText, productLimit]);

  return (
    <div className="px-24 bg-gray-100 pt-5">
      <SliderComponents images={[slider1, slider2, slider3]} />
      <Loading isLoading={isLoading}>
        <div className="flex w-full justify-center">
          <div className="flex flex-wrap gap-[10px] pt-5 max-w-[1250px]">
            {products.map((product) => (
              <CardComponent
                key={product._id}
                productId={product._id}
                countInStock={product.countInStock}
                price={product.price}
                description={product.description}
                image={product.image}
                rating={product.rating}
                name={product.name}
                type={product.type}
                selled={product.selled}
                discount={product.discount}
              />
            ))}
          </div>
        </div>
      </Loading>

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        <Button
          className="my-10"
          type="primary"
          size="large"
          onClick={() => setProductLimit((prev) => prev + 6)}
          disabled={totalProducts <= productLimit}
        >
          {totalProducts <= productLimit
            ? 'There is no more products'
            : 'Load More'}
        </Button>
      </div>
    </div>
  );
}
