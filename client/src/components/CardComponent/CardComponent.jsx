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
}) {
  return (
    <WrapperCardStyle
      hoverable
      headStyle={{ width: '200px', height: '200px' }}
      style={{ width: 200 }}
      bodyStyle={{ padding: '10px' }}
      cover={<img alt="example" src={image} />}
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
