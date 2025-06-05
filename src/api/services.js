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
  let isClockedIn = false;
  let inTime = null;
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
      isClockedIn = resp.data.clock_in;
      inTime = clock_in;
      console.log(resp.data);
      return resp.data;
    })
    .catch((error) => {
      console.error('Error Clock In: ', error);
      throw error;
    });
  return { isClockedIn, inTime };
};
export const employeeClockInCheck = async () => {
  const csrf = await getCsrfToken();
  let isClockedIn = false;
  let inTime = null;
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

      inTime = clock_in ? resp.data.session[0].clock_in : false;

      return resp.data;
    })
    .catch((error) => {
      console.error('Error Clock In: ', error);
      throw error;
    });
  return { isClockedIn, inTime };
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

export const getMySessions = async () => {
  let data = [];
  await api
    .get('my_sessions/', { withCredentials: true })
    .then((res) => {
      console.log('My Session: ', res.data);
      data = res.data.sessions;
      return res.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return data;
};

export const addTimeSheetDetails = async (postData) => {
  const csrf = await getCsrfToken();
  let data = [];
  await api
    .post('time-sheet-details/', postData, {
      headers: { 'X-CSRFToken': csrf },
      withCredentials: true,
    })
    .then((res) => {
      console.log('My Session: ', res.data);
      data = res.data.sessions;
      return res.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return data;
};

export const getDailyLog = async (postData) => {
  const csrf = await getCsrfToken();
  let data = [];
  await api
    .post('daily-log/', postData, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log('My Session: ', res.data);
      data = res.data.dailyLog;
      return res.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return data;
};
export const getDailyLogForTimeSheet = async () => {
  const csrf = await getCsrfToken();
  let data = [];
  await api
    .get('daily-log/', {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log('My Session: ', res.data);
      data = res.data.dailyLog;
      return res.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return data;
};
export const deleteMyTimeExpense = async (sessionId,expenseId) => {
  const csrf = await getCsrfToken();
  let status = false;
  await api
    .delete(
      `daily-log-delete-expense/${sessionId}/${expenseId}/`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf,
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log('My Session: ', res.data);
      console.log(`Delete Status Code-->`,res.status)
      if(res.status==200){
        status = true
      }
      return res.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return status;
};
export const addTimeExpenseData = async (postData) => {
  // add-time-expense
  const csrf = await getCsrfToken();
  let data ;
  await api
    .post('attendance-add-time-expense/', postData, {
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
      },
      withCredentials: true,
    })
    .then((res) => {
      console.log('My Session: ', res.data);
      data = res.data
      return res.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return data;
};
export const upDateMyTimeExpense = async (sessionId,expenseId) => {
  console.log(`upDateMyTimeExpense--`,expenseId)
  const{id}  = expenseId
  const csrf = await getCsrfToken();
  let status = false;
  await api
    .put(
      `daily-log-delete-expense/${sessionId}/${id}/`,expenseId,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrf,
        },
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log('My Session: ', res.data);
      console.log(`Delete Status Code-->`,res.status)
      status=true
      if(res.status==200){
        status = true
      }
      return res.data;
    })
    .catch((error) => {
      console.error('birthdays get failed: ', error);
      throw error;
    });
  return status;
};