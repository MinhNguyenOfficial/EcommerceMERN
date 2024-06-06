export default function CheckoutItem({
  productId,
  productName,
  productAmount,
  productPrice,
}) {
  return (
    <>
      <tr className="text-center">
        <td className="py-2">{productName}</td>
        <td>{productAmount}</td>
        <td>{productPrice}</td>
        <td>{productAmount * productPrice}</td>
      </tr>
    </>
  );
}
