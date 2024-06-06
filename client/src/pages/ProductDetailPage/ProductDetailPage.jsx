import { useParams } from 'react-router-dom';
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent';

export default function ProductDetailPage() {
  const params = useParams()
  return (
    <div className='px-32 bg-gray-100'>
      <h1>Chi tiết sản phẩm</h1>
      <ProductDetailComponent productId={params?.id} />
    </div>
  );
}
