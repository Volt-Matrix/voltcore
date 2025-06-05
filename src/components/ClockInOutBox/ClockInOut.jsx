import { React, useState, useEffect } from 'react';
import './ClockInOut.css';
import { employeeClockIn, employeeClockInCheck, employeeClockOut } from '../../api/services';
import { subtractTimeString } from '../../lib/utils/timetohours';
function ClockInOut() {
  const [isClockIn, setIsClockIn] = useState(false);
  const [clockedOutTime, setClockedOutTime] = useState(null);
  const [showClockInMessage, setShowClockInMessage] = useState(false);
  const [showClockOutMessage, setShowClockOutMessage] = useState(false);
  const [showClockOutButton, setShowClockOutButton] = useState(false);
  const [showClockInButton, setShowClockInButton] = useState(true);
  const [clockedInDuration, setClockedInDuration] = useState({ hours: 0, mins: 0 });
  const empCheckClockIn = async () => {
    const checkClockIn = await employeeClockInCheck();
    const { isClockedIn, inTime,totalHours } = checkClockIn;
    console.log('Is Employee CLocked In', isClockedIn, inTime);
    if (isClockedIn) {
      console.log(inTime);
      updateDuration(totalHours?subtractTimeString(totalHours):inTime);
      let intervalId = setInterval(() => {
        updateDuration(totalHours?subtractTimeString(totalHours):inTime);
      }, 60000);
      setShowClockInButton(false);
      setShowClockOutButton(true);
    } else {
      setShowClockInButton(true);
      setShowClockOutButton(false);
    }
  };

  useEffect(() => {
    empCheckClockIn();
  }, []);
  const updateDuration = (inTime) => {
    const now = new Date();
    const diffMs = now - new Date(inTime); // in milliseconds
    console.log('diffMs-In Time', inTime);
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    setClockedInDuration({ hours: diffHrs, mins: diffMins });
    console.log({ hours: diffHrs, mins: diffMins });
  };

  const handleClockIn = async () => {
    const data = await employeeClockIn();
    setIsClockIn(true);
    setShowClockInButton(false);
    setShowClockInMessage(true);
    updateDuration(subtractTimeString(data.totalHours));

    let intervalId = setInterval(() => {
      updateDuration(subtractTimeString(data.totalHours));
    }, 60000);
    // hide message after 2 seconds
    setTimeout(() => {
      setShowClockInMessage(false);
      setShowClockOutButton(true);
    });
  };

  const handleClockOut = () => {
    employeeClockOut();
    const now = new Date();
    setIsClockIn(false);
    setClockedOutTime(now);
    setShowClockOutButton(false);
    setShowClockOutMessage(true);

    setTimeout(() => {
      setShowClockOutMessage(false);
      setShowClockInButton(true);
    }, 0);
  };

  return (
    <div className="clockinout_content-wrapper card-p osns">
      <div className="clockinout_duration">
        <p>
          <span className="clockinout_big-num">{clockedInDuration['hours']}</span> hours{' '}
          <span className="clockinout_big-num">{clockedInDuration['mins']}</span> mins
        </p>
        <p className="clockinout_subtext color-grey">clocked-in duration</p>
      </div>

      {showClockInMessage && (
        <div className="color-grey">
          {/* Successfully clocked in in at {clockedInTime.toLocaleTimeString()} */}
        </div>
      )}
      {showClockOutMessage && (
        <div className="color-grey">
          Successfully clocked out at {clockedOutTime.toLocaleTimeString()}
        </div>
      )}

      <div className="clockinout_buttons">
        {showClockInButton && (
          <button
            onClick={handleClockIn}
            className="clockinout_button clockinout_clockin-button"
            // disabled={checkInDisable}
          >
            Clock IN
          </button>
        )}

        {showClockOutButton && (
          <button onClick={handleClockOut} className="clockinout_button clockinout_clockout-button">
            Clock OUT
          </button>
        )}
      </div>
    </div>
  );
}

export default ClockInOut;
