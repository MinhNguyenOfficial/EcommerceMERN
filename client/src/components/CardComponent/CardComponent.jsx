import { useNavigate } from 'react-router-dom';
import {
  StyleNameProduct,
  WrapperCardStyle,
  WrapperDiscountText,
  WrapperPriceText,
  WrapperReportText,
  WrapperStyleTextSell,
} from './style';
import { StarFilled } from '@ant-design/icons';

export default function CardComponent({
  countInStock,
  price,
  description,
  image,
  rating,
  type,
  name,
  selled,
  discount,
  productId,
}) {
  const navigate = useNavigate();
  return (
    <WrapperCardStyle
      onClick={() => navigate(`product-detail/${productId}`)}
      hoverable
      // headStyle={{ width: '200px', height: '200px' }}
      style={{ width: 200 }}
      // bodyStyle={{ padding: '10px' }}
      cover={
        <img
          alt="example"
          src={
            image ||
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQg15omZwr1TxPQoEw9BOCSOJAs3b0thWlmNw&usqp=CAU'
          }
        />
      }
    >
      {/* <img
        style={{
          width: '68px',
          height: '14px',
          position: 'absolute',
          top: -1,
          left: -1,
          borderTopLeftRadius: '3px',
        }}
      /> */}
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: '4px' }}>
          {rating}
          <StarFilled
            style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }}
          />
        </span>
        <WrapperStyleTextSell> | Da ban {selled || 1000}+</WrapperStyleTextSell>
      </WrapperReportText>
      <WrapperPriceText>
        <span style={{ marginRight: '8px' }}>{price}</span>
        <WrapperDiscountText>- {discount || 5} %</WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyle>
  );
}
