import React from 'react';
import { availableHolidayList } from '../lib/placeholder';
import HolidayList from '../components/HolidayList/HolidayList';
import { Details } from '@mui/icons-material';
import AttandanceMarker from '../components/Calender/AttandanceMarker';
import TimeSheet from '../components/TimeSheetComp/TimeSheet';
function Attendance() {
  return (
    <div className="att-container">
      <div className='action-section card-p'>
        <TimeSheet/>
      </div>
      <div className='att-s2'>
        <HolidayList holidayList={availableHolidayList} />
        <div className="card-p ">
          <AttandanceMarker />
        </div>
      </div>
    </div>
  );
}

export default Attendance;
