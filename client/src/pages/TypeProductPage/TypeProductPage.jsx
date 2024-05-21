import CardComponent from '../../components/CardComponent/CardComponent';
import Navbar from '../../components/Navbar/Navbar';
import { Col, Row, Pagination } from 'antd';
import { WrapperNavbar, WrapperProducts } from './style';
export default function TypeProductPage() {
  const onChange = () => {};
  return (
    <>
      <div className="w-full flex justify-center">
        <Row
          className="w-[1270px]"
          style={{
            flexWrap: 'nowrap',
            paddingTop: '10px',
            height: 'calc(100% - 20px)',
          }}
        >
          <WrapperNavbar span={4}>
            <Navbar />
          </WrapperNavbar>
          <Col
            span={20}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <WrapperProducts>
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
              <CardComponent />
            </WrapperProducts>
          </Col>
        </Row>
      </div>
      <Pagination
        defaultCurrent={1}
        total={100}
        onChange={onChange}
        style={{ textAlign: 'center', marginTop: '10px' }}
      />
    </>
  );
}
