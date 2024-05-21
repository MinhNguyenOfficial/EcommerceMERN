import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import Default from './components/Default/Default';
import { Fragment, useEffect } from 'react';
import { isJsonString } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from './redux/slides/userSlide';
import { jwtDecode } from 'jwt-decode';
import * as UserService from './services/UserService';

export default function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const apiEndpoint = import.meta.env.VITE_BACKEND_API_URL;

  useEffect(() => {
    const { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetUserDetails(decoded?.id, storageData);
    }
  }, []);

  const handleGetUserDetails = async (id, token) => {
    try {
      const res = await UserService.getUserDetails(id, token);
      dispatch(
        updateUser({
          ...res?.data,
          access_token: token,
        })
      );
    } catch (error) {
      console.error('Error getting user details:', error);
    }
  };

  const handleDecoded = () => {
    let storageData = localStorage.getItem('access_token');
    let decoded = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decoded = jwtDecode(storageData);
    }
    return { decoded, storageData };
  };

  const refreshToken = async () => {
    try {
      const storageData = localStorage.getItem('access_token');
      if (!storageData || !isJsonString(storageData)) {
        throw new Error('No token found');
      }
      const tokenData = JSON.parse(storageData);
      const response = await UserService.refreshToken(tokenData);
      const { access_token } = response.data;
      localStorage.setItem('access_token', JSON.stringify(access_token));

      if (access_token) {
        const decoded = jwtDecode(access_token);
        if (decoded?.id) {
          handleGetUserDetails(decoded?.id, access_token);
        }
        return access_token;
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    refreshToken();
    const intervalId = setInterval(refreshToken, 1000 * 60 * 50);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <Router>
      <Routes>
        {routes.map((route, index) => {
          const Page = route.page;
          const canAccessRoute = !route.isPrivate || user.isAdmin;
          const Layout = route.isShowHeader ? Default : Fragment;
          return (
            <Route
              key={index}
              path={canAccessRoute ? route.path : undefined}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
      </Routes>
    </Router>
  );
}
