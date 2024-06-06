import { useDispatch, useSelector } from 'react-redux';
import OrderItem from '../../components/OrderItem/OrderItem';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Button } from 'antd';
import { deleteProductFromCart } from '../../redux/slides/orderSlide';
import ConfirmModal from '../../components/ConfirmModal/ConfirmModal';

export default function OrderPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [checkedItems, setCheckedItems] = useState([]);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // useEffect(() => {
  //   const token = localStorage.getItem('access_token');
  //   if (!token) {
  //     navigate('/sign-in', { state: location.pathname });
  //   }
  // }, [user.id]);

  const cart = useSelector((state) => state.order.orderItems);

  const handleCheckBoxChange = (e) => {
    const checkingItem = e.target.value;
    if (checkedItems.includes(checkingItem)) {
      const removedUncheckedItemList = checkedItems.filter(
        (item) => item !== checkingItem
      );
      setCheckedItems(removedUncheckedItemList);
    } else {
      setCheckedItems([...checkedItems, checkingItem]);
    }
  };

  const handleCheckedAll = (e) => {
    const allProductIds = [];
    if (e.target.checked) {
      cart.map((item) => allProductIds.push(item.id));
    }
    setCheckedItems(allProductIds);
  };

  const handleDeleteProductsFromCart = (productId) => {
    dispatch(deleteProductFromCart(checkedItems));
    setCheckedItems([]);
    setIsConfirmModalOpen(false);
  };

  const handleDeleteSingleProductFromCart = (productId) => {
    dispatch(deleteProductFromCart([productId]));
    setCheckedItems(checkedItems.filter((item) => item !== productId));
    setIsConfirmModalOpen(false);
  };

  const subTotal = cart.reduce((accumulator, current) => {
    return checkedItems.includes(current.id)
      ? accumulator + current.amount * current.price
      : accumulator;
  }, 0);

  const handleCheckoutOrder = () => {
    navigate('/order/checkout', { state: checkedItems });
  };

  return (
    <div className="flex justify-between w-full h-screen px-24 bg-gray-100 pt-5">
      <div className="bg-white flex flex-col gap-7 p-10 rounded-xl w-[880px]">
        {cart.length > 0 ? (
          <>
            <table>
              <tr className="h-20">
                <th>
                  <input
                    type="checkbox"
                    checked={checkedItems.length === cart.length}
                    onChange={handleCheckedAll}
                  />
                </th>
                <th>
                  <p>Product Name</p>
                </th>
                <th>
                  <p>Product Amount</p>
                </th>
                <th>
                  <p>Unit Price</p>
                </th>
                <th>
                  <p>Price</p>
                </th>
                <th>
                  <Button
                    onClick={() => setIsConfirmModalOpen(true)}
                    disabled={checkedItems.length === 0}
                    type="primary"
                  >
                    Delete
                  </Button>
                </th>
              </tr>
              {cart.map((item) => (
                <OrderItem
                  key={item.id}
                  isChecked={checkedItems.includes(item.id)}
                  productId={item.id}
                  productName={item.name}
                  productAmount={item.amount}
                  productUnitPrice={item.price}
                  handleCheckBoxChange={handleCheckBoxChange}
                  handleDeleteProductFromCart={
                    handleDeleteSingleProductFromCart
                  }
                />
              ))}
            </table>
          </>
        ) : (
          <h1>You dont have any product in cart!</h1>
        )}
      </div>
      <div>
        <div className="p-5 w-[350px] h-[350px] rounded-xl bg-white">
          <p>Merchandise subtotal: {subTotal}</p>
          <p>Discount: 0</p>
          <p>Delivery cost: 0</p>
          <hr />
          <p>Total payment: {subTotal}</p>
        </div>
        <div className="w-[350px] flex justify-center mt-10">
          <ButtonComponent
            onClick={handleCheckoutOrder}
            disabled={checkedItems.length === 0}
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '220px',
              border: 'none',
              borderRadius: '4px',
            }}
            textbutton={'Order'}
            styleTextButton={{
              color: '#fff',
              fontSize: '15px',
              fontWeight: '700',
            }}
          ></ButtonComponent>
        </div>
      </div>
      <ConfirmModal
        isOpen={isConfirmModalOpen}
        title={'Confirm'}
        content={`Are you want to delete these products from cart?`}
        onOk={handleDeleteProductsFromCart}
        onCancel={() => setIsConfirmModalOpen(false)}
      />
    </div>
  );
}
