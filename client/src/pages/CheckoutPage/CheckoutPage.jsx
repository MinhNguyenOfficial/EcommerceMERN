import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import OrderItem from '../../components/OrderItem/OrderItem';
import CheckoutItem from '../../components/CheckoutItem/CheckoutItem';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

export default function CheckoutPage() {
  const { orderItems } = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const checkedItems = location.state;

  if (!checkedItems) {
    return <NotFoundPage />;
  }

  const items = checkedItems.map((itemId) =>
    orderItems.find((order) => order.id === itemId)
  );
  return (
    <div className=" bg-gray-100 pt-5 w-screen h-screen">
      <div className="mx-auto rounded-md bg-white w-[1200px] p-16">
        <h1 className="h-20 ml-5 flex items-center text-2xl mb-5">Checkout</h1>
        <div className="ml-5 mb-10">
          <p className="text-xl">Delivery Address</p>
          <p>Name: {user.name}</p>
          <p>Phone: {user.phone}</p>
          <p>Address: {user.address}</p>
          <p className="text-blue-500">Change</p>
        </div>
        <table>
          <tr>
            <th className="w-[456px]">Product Ordered</th>
            <th className="w-[115px]">Unit price</th>
            <th className="w-[115px]">Amount</th>
            <th className="w-[226px]">Item Subtotal</th>
          </tr>
          {items.map((item) => (
            <CheckoutItem
              key={item.id}
              productId={item.id}
              productName={item.name}
              productAmount={item.amount}
              productPrice={item.price}
            />
          ))}
        </table>
      </div>
      <div className="flex float-end mt-10 mr-32">
        <ButtonComponent
          size={40}
          styleButton={{
            background: 'rgb(255, 57, 69)',
            height: '48px',
            width: '220px',
            border: 'none',
            borderRadius: '4px',
          }}
          textbutton={'Place Order'}
          styleTextButton={{
            color: '#fff',
            fontSize: '15px',
            fontWeight: '700',
          }}
        />
      </div>
    </div>
  );
}
