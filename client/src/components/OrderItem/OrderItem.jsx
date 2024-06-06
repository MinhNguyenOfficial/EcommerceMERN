import { Button, message } from 'antd';
import {
  WrapperInputNumber,
  WrapperQualityProduct,
} from '../ProductDetailComponent/style';
import { useEffect, useState } from 'react';
import { PlusOutlined, MinusOutlined } from '@ant-design/icons';
import * as ProductServive from '../../services/ProductService';
import { useDispatch } from 'react-redux';
import { changeProductQuantity } from '../../redux/slides/orderSlide';
import ConfirmModal from '../ConfirmModal/ConfirmModal';

export default function OrderItem({
  productId,
  productName,
  productAmount,
  productUnitPrice,
  isChecked,
  handleCheckBoxChange,
  handleDeleteProductFromCart,
}) {
  const dispatch = useDispatch();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(productAmount);
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: '',
    countInStock: '',
  });

  const getProductDetails = async () => {
    const productDetails = await ProductServive.getProductDetails(
      productId
    ).then((res) => res.data);

    setProduct({
      id: productDetails._id,
      name: productDetails.name,
      price: productDetails.price,
      countInStock: productDetails.countInStock,
    });
  };

  useEffect(() => {
    getProductDetails();
  }, []);

  const handleProductQuantityChange = (e) => {
    dispatch(
      changeProductQuantity({
        orderItem: {
          id: productId,
          amount: quantity,
        },
      })
    );
  };

  useEffect(() => {
    handleProductQuantityChange();
  }, [quantity]);

  const handleInputMaxQuantity = () => {
    setQuantity(product.countInStock);
    message.error('Exceed product quantity in stock!');
  };

  const handleQuantityInputChange = (e) => {
    let value = e.target.value;
    if (value > product.countInStock) {
      handleInputMaxQuantity();
    } else setQuantity(Number(value));
  };

  const handleInput = (e) => {
    const value = e.target.value;
    if (!/^\d*$/.test(value)) {
      e.target.value = value.replace(/\D/g, '');
    }
  };

  return (
    <>
      <tr className='h-20'>
        <td className='text-center'>
          <input
            checked={isChecked}
            type="checkbox"
            value={productId}
            onChange={handleCheckBoxChange}
          />
        </td>
        <td className="text-center">
          <p>{productName}</p>
        </td>
        <td className="text-center">
          <div className="ring-1 p-1 rounded-sm">
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
            <input
              type="text"
              className="w-14 text-center"
              max={product?.countInStock}
              min={1}
              value={quantity}
              size="small"
              onInput={handleInput}
              onChange={handleQuantityInputChange}
            />
            <button
              onClick={() =>
                quantity >= product.countInStock
                  ? handleInputMaxQuantity()
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
        </td>
        <td className="text-center">
          <p>{productUnitPrice}</p>
        </td>
        <td className="w-1/6 text-center">
          <p>
            {productUnitPrice * productAmount ?? 0}
          </p>
        </td>
        <td className="w-1/6 text-center">
          <Button onClick={() => setIsConfirmModalOpen(true)} type="primary">
            Delete
          </Button>
        </td>
      </tr>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title={'Confirm'}
        content={`Are you want to delete product ${productName} from cart?`}
        onOk={() => handleDeleteProductFromCart(productId)}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </>
  );
}
