import { useResolvedPath } from 'react-router-dom';
import api from './axiosConfig';
import { loginUser } from './urls';
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

export const postAnnouncement = (postData) => {
  return api.post('announcements/', postData).then((resp) => {
    console.log('post successfull: ', resp)
    return resp;
  })
  .catch((error) => {
    console.error("Post failed", error);
    throw error;
  });
};

export const getAnnouncements = () => {
  return api.get('announcements/').then((resp) => {
    console.log('fetched announcements: ', resp.data)
    return resp.data;
  })
  .catch((error) => {
    console.error('announcement get failed: ', error)
    throw error;
  });
};
