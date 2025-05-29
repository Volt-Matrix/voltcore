import { useResolvedPath } from 'react-router-dom';
import api from './axiosConfig';
import { loginUser } from './urls';
import { getCsrfToken } from '../context/AuthContext/AuthContext';

export const registerUser = (postData) => {
  api.post('register/', postData).then((res) => {
    console.log(res.data);
  });
};
export const loginUserService = (postData) => {
  api.post('login/', postData).then((res) => {
    console.log(res.data);
  });
};

export const postAnnouncement = async (postData) => {
  try {
    const csrfToken = await getCsrfToken();
    const resp = await api.post('announcements/', postData,
      {
        headers: {
          'X-CSRFToken': csrfToken,
        },
        withCredentials: true,
      }
    )
    console.log('post successfull: ', resp)
    return resp;
  }

  catch (error) {
    console.error("Post failed", error)
    throw error;
  }
};

export const getAnnouncements = () => {
  return api.get('announcements/', {withCredentials: true}).then((resp) => {
    console.log('fetched announcements: ', resp.data)
    return resp.data;
  })
  .catch((error) => {
    console.error('announcement get failed: ', error)
    throw error;
  });
};

export const getHolidays = () => {
  return api.get('holidays/', {withCredentials: true}).then((resp) => {
    console.log('fetched holidays: ', resp.data)
    return resp.data;
  })
  .catch((error) => {
    console.error('holidays get failed: ', error)
    throw error;
  })
}
