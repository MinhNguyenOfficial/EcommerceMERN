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

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const productTypes = ['tv', 'fridge', 'air conditional'];
  const fetchAllProduct = async () => {
    const res = await ProductService.getAllProduct();
    setProducts(res.data);
  };
  useEffect(() => {
    fetchAllProduct();
  }, []);
  console.log(products)
  return (
    <div className="px-28">
      <WrapperTypeProduct>
        {productTypes.map((productType, index) => (
          <ProductType key={index} name={productType} />
        ))}
      </WrapperTypeProduct>
      <SliderComponents images={[slider1, slider2, slider3]} />
      <div className="flex flex-wrap gap-6 justify-center">
        {products.map((product) => (
          <CardComponent
            key={product._id}
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

      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          marginTop: '10px',
        }}
      >
        <WrapperButtonMore
          textbutton={'Load more'}
          type="outline"
          styleButton={{
            border: `1px solid ${'#f5f5f5'}`,
            color: `${'#f5f5f5'}`,
            width: '240px',
            height: '38px',
            borderRadius: '4px',
          }}
          disabled={false}
          styleTextButton={{ fontWeight: 500 }}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
