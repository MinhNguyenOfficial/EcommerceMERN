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

export default function Header() {
  const apiEndpoint = import.meta.env.VITE_BACKEND_API_URL;
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
      <WrapperHeader>
        <Col span={6} className="flex items-center justify-center">
          {/* <WrapperTextHeader>MinhShop</WrapperTextHeader> */}
          <a href="/">MinhShop</a>
        </Col>
        <Col span={12} className="flex items-center justify-center">
          <ButtonInputSearch
            placeholder={'Search...'}
            size={'large'}
            textButton={'Search'}
          />
        </Col>
        <Col span={6} className="flex">
          <WrapperHeaderAccout>
            {user ? (
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
                  <WrapperTextHeaderSmall className="cursor-pointer">
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
            <div className="ml-2" style={{ cursor: 'pointer' }}>
              <Badge size="small" className="flex items-center gap-2">
                <ShoppingCartOutlined
                  style={{ fontSize: '30px', color: '#fff' }}
                />
                <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
              </Badge>
            </div>
          </WrapperHeaderAccout>
        </Col>
      </WrapperHeader>
    </header>
  );
}
