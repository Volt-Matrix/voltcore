'use client';

import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import './AttandanceMarker.css'

const attendanceData = [
  { date: '4/29/2025', status: 1, checkIn: '9:00AM', checkOut: '5:00PM', totalHours: 8 },
  { date: '4/27/2025', status: 1, checkIn: '9:00AM', checkOut: '5:00PM', totalHours: 8 },
  { date: '4/2/2025', status: 1, checkIn: '9:00AM', checkOut: '5:00PM', totalHours: 8 },
  { date: '4/23/2025', status: 0, checkIn: '', checkOut: '', totalHours: 0 },
  { date: '4/25/2025', status: 1, checkIn: '9:00AM', checkOut: '5:00PM', totalHours: 8 },
];

const AttendanceCalendar = () => {
  const [value, setValue] = useState(new Date());

  const getTileData = (date) => {
    const dateString = format(date, 'M/d/yyyy');
    return attendanceData.find((item) => item.date === dateString);
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const data = getTileData(date);
      if (data) {
        return (
          <div className="relative group flex justify-center items-center">
            {/* Show the date */}
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center bg-[#4CAF50] text-white text-xs p-2 rounded shadow-md whitespace-nowrap z-50 w-[150px] h-[100px] flex justify-center">
              {data.status === 1 ? (
                <>
                  <div>CheckIn: {data.checkIn}</div>
                  <div>CheckOut: {data.checkOut}</div>
                  <div>Hours: {data.totalHours}</div>
                </>
              ) : (
                <div>Absent</div>
              )}
            </div>
          </div>
        );
      }
    }
    return null;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const data = getTileData(date);
      if (data) {
        return data.status === 1 ? 'bg-green-500 text-white rounded-lg group present-day' : 'bg-red-500 text-white rounded-lg group absent-day';
      }
    }
    return '';
  };

  return (
    <div className="p-8 overflow-visible">
      <h1 className="text-2xl font-bold mb-4">Attendance Calendar</h1>
      <div className="overflow-visible relative">
        <Calendar
          onChange={setValue}
          value={value}
          tileClassName={tileClassName}
          tileContent={tileContent}
        />
      </div>
    </div>
  );
};

export default AttendanceCalendar;
