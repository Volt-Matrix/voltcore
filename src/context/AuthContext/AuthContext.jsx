import { interpolate } from 'd3';
import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { set } from 'date-fns';
import { useNavigate } from 'react-router-dom';
const initialState = { firstName: '', email: '', isLoggedIn: false, id: '' };
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [loginData, setLoginData] = useState(initialState);
  const navigate = useNavigate();
  const getCsrfToken = async () => {
    try {
      const res = await axios.get('http://localhost:8000/csrf/', {
        withCredentials: true,
      });
      const data = res.data;
      console.log(data.csrftoken);
      return data.csrftoken;
    } catch (error) {
      console.log(error);
    }
  };
  const login = async (loginData) => {
    console.log(loginData);
    const csrf = await getCsrfToken();
    const response = await axios.post('http://localhost:8000/login/', loginData, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf, // Include the token in the header
      },
      withCredentials: true, // Important for session cookie
    });
    console.log(response.data.user);
    const {firstName,isLoggedIn} = response.data.user;
    localStorage.setItem('userName',firstName);
    // localStorage.setItem('isLoggedIn)
    setLoginData({ ...response.data.user });
    if (response.data.user.isLoggedIn) {
      navigate('/', { replace: true });
    }
  };
  const logout = async () => {
    try {
      const csrf = await getCsrfToken();
      await axios
        .post(
          'http://localhost:8000/logout/',
          {},
          {
            headers: {
              'X-CSRFToken': csrf,
            },
            withCredentials: true,
          }
        )
        .then(async (res) => {
          console.log(res.data.user);
          const { isLogged } = res.data;
          if (!isLogged) {
            navigate('/login');
          }
        });
        localStorage.removeItem('userName')
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // if(loginData.isLoggedIn){
    //   return
    // }
  }, []);
  return (
    <AuthContext.Provider value={{ ...loginData, login, logout }}>{children}</AuthContext.Provider>
  );
};
