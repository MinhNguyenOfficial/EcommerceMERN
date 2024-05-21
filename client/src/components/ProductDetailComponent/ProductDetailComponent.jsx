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

export default function ProductDetailComponent() {
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
          <Image src={testProduct} alt="image prodcut" preview={false} />
          <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
            <WrapperStyleColImage span={4} sty>
              <WrapperStyleImageSmall
                src={imageProductSmall}
                alt="image small"
                preview={false}
              />
            </WrapperStyleColImage>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={imageProductSmall}
                alt="image small"
                preview={false}
              />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={imageProductSmall}
                alt="image small"
                preview={false}
              />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={imageProductSmall}
                alt="image small"
                preview={false}
              />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall
                src={imageProductSmall}
                alt="image small"
                preview={false}
              />
            </WrapperStyleColImage>
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: '10px' }}>
          <WrapperStyleNameProduct>{'product'}</WrapperStyleNameProduct>
          <div>
            {/* <Rate
                allowHalf
                defaultValue={productDetails?.rating}
                value={productDetails?.rating}
              /> */}
            <WrapperStyleTextSell> | Da ban 1000+</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>100.000</WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao đến </span>
            <span className="address">Address</span> -
            <span className="change-address">Đổi địa chỉ</span>
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
            <WrapperQualityProduct>
              <button
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
              </button>
              <WrapperInputNumber
              //   defaultValue={1}
              //   max={productDetails?.countInStock}
              //   min={1}
              //   value={numProduct}
              //   size="small"
              />
              <button
                style={{
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                }}
              >
                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
              </button>
            </WrapperQualityProduct>
          </div>
          <div style={{ display: 'flex', aliggItems: 'center', gap: '12px' }}>
            <div>
              <ButtonComponent
                size={40}
                styleButton={{
                  background: 'rgb(255, 57, 69)',
                  height: '48px',
                  width: '220px',
                  border: 'none',
                  borderRadius: '4px',
                }}
                textbutton={'Chọn mua'}
                styleTextButton={{
                  color: '#fff',
                  fontSize: '15px',
                  fontWeight: '700',
                }}
              ></ButtonComponent>
              <div style={{ color: 'red' }}>San pham het hang</div>
            </div>
            <ButtonComponent
              size={40}
              styleButton={{
                background: '#fff',
                height: '48px',
                width: '220px',
                border: '1px solid rgb(13, 92, 182)',
                borderRadius: '4px',
              }}
              textbutton={'Mua trả sau'}
              styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
            ></ButtonComponent>
          </div>
        </Col>
      </Row>
    </div>
  );
}
