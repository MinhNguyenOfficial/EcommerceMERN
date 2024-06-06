import { Col, Image, Row } from 'antd';
import imageProductSmall from '../../assets/images/imagesmall.webp';
import testProduct from '../../assets/images/test.webp';
import {
  WrapperStyleImageSmall,
  WrapperStyleColImage,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperAddressProduct,
  WrapperQualityProduct,
  WrapperInputNumber,
} from './style';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import { useEffect, useState } from 'react';
import * as ProductServive from '../../services/ProductService';
import { StarFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/slides/orderSlide';

export default function ProductDetailComponent({ productId }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: '',
    image: '',
    type: '',
    countInStock: '',
    rating: '',
  });

  const getProductDetails = async () => {
    const productDetails = await ProductServive.getProductDetails(
      productId
    ).then((res) => res.data);

    setProduct({
      id: productDetails._id,
      name: productDetails.name,
      price: productDetails.price,
      description: productDetails.description,
      image: productDetails.image,
      type: productDetails.type,
      countInStock: productDetails.countInStock,
      rating: productDetails.rating,
    });
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const handleAddProductToCart = () => {
    // if (!user.id) {
    //   navigate('/sign-in', { state: location.pathname });
    // } else {
    dispatch(
      addToCart({
        orderItem: {
          id: product.id,
          name: product.name,
          amount: quantity,
          price: product.price,
        },
      })
    );
    // }
  };

  return (
    <div className="flex justify-center">
      <Row
        className="w-[1270px]"
        style={{
          padding: '16px',
          background: '#fff',
          borderRadius: '4px',
          height: '100%',
        }}
      >
        <Col
          span={10}
          style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}
        >
          <Image
            width={475}
            height={475}
            src={
              product.image ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg15omZwr1TxPQoEw9BOCSOJAs3b0thWlmNw&usqp=CAU'
            }
            alt="image prodcut"
            preview={false}
          />
          <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
            <WrapperStyleColImage span={4} sty>
              <WrapperStyleImageSmall
                src={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMVnSiSSLd_MpXLD2KRmOAyW9S14FPhnGBBg&usqp=CAU'
                }
                alt="image small"
                preview={false}
              />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxnjnJ1Yaz9bnz-I9CLQryCcCh88lGSvZe6Q&usqp=CAU'
                }
                alt="image small"
                preview={false}
              />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi5ZdVhk8aCi5OmUF3YoUzE0ILeYXFtFDcog&usqp=CAU'
                }
                alt="image small"
                preview={false}
              />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM_k8QnV_iRrY1SSy07AcBlDum090eF48L3g&usqp=CAU'
                }
                alt="image small"
                preview={false}
              />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTcgoEp0KZhC3__1ibtyn-f06uTSTamDXVmQ&usqp=CAU'
                }
                alt="image small"
                preview={false}
              />
            </WrapperStyleColImage>
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: '10px' }}>
          <WrapperStyleNameProduct>{product.name}</WrapperStyleNameProduct>
          <div>
            {product.rating && (
              <>
                {product.rating}
                <StarFilled /> |
              </>
            )}

            <WrapperStyleTextSell> Da ban 1000+</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>
              Price: {product.price}
            </WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao đến </span>
            <span className="address">{user.address}</span> -
            <span className="change-address"> Đổi địa chỉ</span>
          </WrapperAddressProduct>

          <div
            style={{
              margin: '10px 0 20px',
              padding: '10px 0',
              borderTop: '1px solid #e5e5e5',
              borderBottom: '1px solid #e5e5e5',
            }}
          >
            <div style={{ marginBottom: '10px' }}>Số lượng</div>
            <div className="ring-1 w-24 justify-between items-center flex p-1 rounded-sm">
              <button
                onClick={() =>
                  quantity === 1 ? 1 : setQuantity((prev) => prev - 1)
                }
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
              </button>
              <WrapperInputNumber
                defaultValue={1}
                max={product?.countInStock}
                min={1}
                value={quantity}
                size="small"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button
                onClick={() =>
                  quantity >= product.countInStock
                    ? quantity
                    : setQuantity((prev) => prev + 1)
                }
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
              </button>
            </div>
          </div>
          <div className="flex gap-7">
            <ButtonComponent
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '220px',
                border: 'none',
                borderRadius: '4px',
              }}
              disabled={product.countInStock === 0}
              textbutton={product.countInStock === 0 ? 'Out of stock!' : 'Buy'}
              styleTextButton={{
                color: '#fff',
                fontSize: '15px',
                fontWeight: '700',
              }}
            ></ButtonComponent>
            <ButtonComponent
              onClick={handleAddProductToCart}
              size={40}
              styleButton={{
                background: 'orange',
                height: '48px',
                width: '220px',
                border: 'none',
                borderRadius: '4px',
              }}
              disabled={product.countInStock === 0}
              textbutton={'Add to cart'}
              styleTextButton={{
                color: '#fff',
                fontSize: '15px',
                fontWeight: '700',
              }}
            ></ButtonComponent>
          </div>
          <div className="my-5">
            <h1 className="font-semibold text-xl">Description: </h1>
            <p>{product.description}</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
