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
    const resp = await api.post('announcements/', postData, {
      headers: {
        'X-CSRFToken': csrfToken,
      },
      withCredentials: true,
    });
    console.log('post successfull: ', resp);
    return resp;
  } catch (error) {
    console.error('Post failed', error);
    throw error;
  }
};

export const getAnnouncements = () => {
  return api
    .get('announcements/', { withCredentials: true })
    .then((resp) => {
      console.log('fetched announcements: ', resp.data);
      return resp.data;
    })
    .catch((error) => {
      console.error('announcement get failed: ', error);
      throw error;
    });
};

export const getHolidays = () => {
  return api
    .get('holidays/', { withCredentials: true })
    .then((resp) => {
      console.log('fetched holidays: ', resp.data);
      return resp.data;
    })
    .catch((error) => {
      console.error('holidays get failed: ', error);
      throw error;
    });
};

export const employeeClockIn = async () => {
  const csrf = await getCsrfToken();
  await api
    .get('employee/clock-in/', {
      headers: {
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((resp) => {
      console.log('Employee Clock In time: ', resp.data);
      const { clock_in } = resp.data.session[0];
      console.log(new Date(clock_in).toLocaleTimeString());
      return resp.data;
    })
    .catch((error) => {
      console.error('Error Clock In: ', error);
      throw error;
    });
};
export const employeeClockInCheck = async () => {
  const csrf = await getCsrfToken();
  let isClockedIn = false;
  await api
    .get('employee/checkIn-check/', {
      headers: {
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((resp) => {
      console.log('Employee Clock In time: ', resp.data);
      const { clock_in } = resp.data;
      isClockedIn = clock_in;
      return resp.data;
    })
    .catch((error) => {
      console.error('Error Clock In: ', error);
      throw error;
    });
  return isClockedIn;
};
export const employeeClockOut = async () => {
  const csrf = await getCsrfToken();
  await api
    .get('employee/clock_out/', {
      headers: {
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((resp) => {
      console.log('Employee Clock In time: ', resp.data);
      const { clock_in } = resp.data;
      console.log(new Date(clock_in).toLocaleTimeString());
      return resp.data;
    })
    .catch((error) => {
      console.error('Error Clock In: ', error);
      throw error;
    });
};

export const getBirthdays = () => {
  return api
    .get('birthdays/', { withCredentials: true })
    .then((resp) => {
      console.log('fetched birthdays: ', resp.data);
      return resp.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
};
