import InputForm from '../../components/InputForm/InputForm';
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from './style';
import imageLogo from '../../assets/images/logo-login.png';
import { Image } from 'antd';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useLocation, useNavigate } from 'react-router-dom';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useState } from 'react';
import * as UserService from '../../services/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../../components/Loading/Loading';
import { useEffect } from 'react';
import { message } from 'antd';
import { jwtDecode } from 'jwt-decode';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slides/userSlide';

const SignInPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [email, setEmail] = useState('a@a.c');
  const [password, setPassword] = useState('123456');
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleNavigateSignUp = () => {
    navigate('/sign-up');
  };

  const mutation = useMutationHook((data) => UserService.loginUser(data));

  const { data, isPending, isSuccess, isError } = mutation;

  const handleLoginSuccess = async () => {
    message.success('Đăng nhập thành công!');
    localStorage.setItem('access_token', JSON.stringify(data?.access_token));
    if (data?.access_token) {
      const decoded = jwtDecode(data?.access_token);
      if (decoded?.id) {
        await handleGetUserDetails(decoded?.id, data?.access_token);
      }
    }
    if (location.state) {
      navigate(location.state);
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    if (isSuccess) {
      handleLoginSuccess();
    } else if (isError) {
      message.error('Có lỗi xảy ra!');
    }
  }, [isSuccess]);

  const handleGetUserDetails = async (id, token) => {
    const res = await UserService.getUserDetails(id, token);
    dispatch(
      updateUser({
        ...res?.data,
        access_token: token,
      })
    );
  };

  const handleSignIn = () => {
    mutation.mutate({
      email,
      password,
    });
  };

  useEffect(() => {
    if (user.id && !location.state) {
      navigate('/');
    }
  }, [user.id]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.53)',
        height: '100vh',
      }}
    >
      <div
        style={{
          width: '800px',
          height: '445px',
          borderRadius: '6px',
          background: '#fff',
          display: 'flex',
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p>Đăng nhập vào tạo tài khoản</p>
          <InputForm
            style={{ marginBottom: '10px' }}
            placeholder="abc@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div style={{ position: 'relative' }}>
            <span
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
              }}
            ></span>

            <InputForm
              placeholder="password"
              type={isShowPassword ? 'text' : 'password'}
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <span
              className="float-end relative bottom-7 right-3"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </div>
          {data?.status === 'ERROR' && (
            <span className="text-red-500">{data?.message}</span>
          )}
          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={!email || !password}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px',
              }}
              textbutton={'Log in'}
              styleTextButton={{
                color: '#fff',
                fontSize: '15px',
                fontWeight: '700',
              }}
            />
          </Loading>
          <p>
            <WrapperTextLight>Quên mật khẩu?</WrapperTextLight>
          </p>
          <p>
            Chưa có tài khoản?{' '}
            <WrapperTextLight onClick={handleNavigateSignUp}>
              Tạo tài khoản
            </WrapperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image
            src={imageLogo}
            preview={false}
            alt="iamge-logo"
            height="203px"
            width="203px"
          />
          <h4>Mua sắm tại MinhNguyenShop</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
