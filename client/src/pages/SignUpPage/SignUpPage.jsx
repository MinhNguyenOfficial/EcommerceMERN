import InputForm from '../../components/InputForm/InputForm';
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from './style';
import imageLogo from '../../assets/images/logo-login.png';
import { Image, message } from 'antd';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import * as UserService from '../../services/UserService';
// import * as message from '../../components/Message/Message';
import { useMutationHook } from '../../hooks/useMutationHook';
import Loading from '../../components/Loading/Loading';
import { useSelector } from 'react-redux';

const SignUpPage = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  if (user.id) {
    navigate('/');
  }
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const handleNavigateSignIn = () => {
    navigate('/sign-in');
  };

  const mutation = useMutationHook((data) => UserService.signUpUser(data));
  const { data, isPending, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess) {
      message.success('Đăng ký thành công!');
      handleNavigateSignIn();
    } else if (isError) {
      message.error('Có lỗi xảy ra!');
    }
  }, [isSuccess, isError]);

  const handleSignUp = () => {
    mutation.mutate({
      email,
      password,
      confirmPassword,
    });
  };
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="float-end relative bottom-7 right-3"
              onClick={() => setIsShowPassword(!isShowPassword)}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="confirm password"
              type={isShowConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="float-end relative bottom-7 right-3"
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
          </div>

          {data?.status === 'ERROR' && (
            <span className="text-red-500">{data?.message}</span>
          )}

          <Loading isLoading={isPending}>
            <ButtonComponent
              disabled={!email || !password || !confirmPassword}
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px',
              }}
              textbutton={'Sign up'}
              styleTextButton={{
                color: '#fff',
                fontSize: '15px',
                fontWeight: '700',
              }}
            />
          </Loading>
          <p>
            Bạn đã có tài khoản?{' '}
            <WrapperTextLight onClick={handleNavigateSignIn}>
              Đăng nhập
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
          <h4>Mua sắm tại LTTD</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage;
