import {
  WrapperHeader,
  WrapperHeaderAccout,
  WrapperTextHeader,
  WrapperTextHeaderSmall,
  WrapperContentPopup,
} from './style';
import { Col, Popover, Badge } from 'antd';
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slides/userSlide';
import { updateSearchInput } from '../../redux/slides/productSlide';

export default function Header() {
  const orderItems = useSelector((state) => state.order.orderItems);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const naviagte = useNavigate();
  const hanleNavigateLogin = () => {
    naviagte('/sign-in');
  };

  const handleLogout = async () => {
    await UserService.logoutUser();
    localStorage.removeItem('access_token');
    dispatch(resetUser());
  };

  const navigateProfilePage = () => {
    naviagte('/profile');
  };

  const navigateAdminPage = () => {
    naviagte('/system/admin');
  };

  const handleSearchInputChange = (e) => {
    dispatch(updateSearchInput(e.target.value));
  };

  const content = (
    <div>
      <WrapperContentPopup onClick={handleLogout}>
        Đăng xuất
      </WrapperContentPopup>
      <WrapperContentPopup onClick={navigateProfilePage}>
        Thông tin người dùng
      </WrapperContentPopup>
      {user.isAdmin && (
        <WrapperContentPopup onClick={navigateAdminPage}>
          Quản lý
        </WrapperContentPopup>
      )}
    </div>
  );
  return (
    <header>
      <div className="py-3 flex items-center gap-4 bg-blue-500">
        <Col span={6} className="flex items-center justify-center">
          {/* <WrapperTextHeader>MinhShop</WrapperTextHeader> */}
          {/* <a href="/">MinhShop</a> */}
          <p onClick={() => naviagte('/')}>Minh Shop</p>
        </Col>
        <Col span={12} className="flex items-center justify-center">
          <ButtonInputSearch
            onChange={handleSearchInputChange}
            placeholder={'Search...'}
            size={'large'}
            textButton={'Search'}
          />
        </Col>
        <Col span={6} className="flex">
          <div className="flex text-white gap-2">
            {user?.avatar ? (
              <img
                className="h-10 w-10 rounded-full"
                src={user?.avatar}
                alt=""
              />
            ) : (
              <UserOutlined style={{ fontSize: '30px' }} />
            )}

            <>
              <Popover trigger="click">
                <div
                  style={{
                    cursor: 'pointer',
                    maxWidth: 100,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                ></div>
              </Popover>
            </>

            {user?.access_token ? (
              <>
                <Popover content={content} trigger="click">
                  <WrapperTextHeaderSmall className="cursor-pointer items-center flex">
                    {user.name || user.email || 'User'}
                  </WrapperTextHeaderSmall>
                </Popover>
              </>
            ) : (
              <div style={{ cursor: 'pointer' }}>
                <WrapperTextHeaderSmall onClick={hanleNavigateLogin}>
                  Đăng nhập/Đăng ký
                </WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            )}
            <div
              onClick={() => naviagte('/order')}
              className="flex items-center justify-center gap-3"
              style={{ cursor: 'pointer' }}
            >
              <Badge
                count={orderItems.length}
                size="small"
                className="flex items-center gap-2"
              >
                <ShoppingCartOutlined
                  className="ml-10"
                  style={{ fontSize: '30px', color: '#fff' }}
                />
              </Badge>
              <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
          </div>
        </Col>
      </div>
    </header>
  );
}
