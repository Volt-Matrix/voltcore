import React from 'react';
import { availableHolidayList } from '../lib/placeholder';
import HolidayList from '../components/HolidayList/HolidayList';
import { Details } from '@mui/icons-material';
import AttandanceMarker from '../components/Calender/AttandanceMarker';
function Attendance() {
  return (
    <div className="home-container">
      <HolidayList holidayList={availableHolidayList} />
      <div className="card-p ">
        <AttandanceMarker />
      </div>
    </div>
  );
}

export default Attendance;
