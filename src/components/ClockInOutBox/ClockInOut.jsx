import { React, useState, useEffect } from 'react';
import "./ClockInOut.css";

function ClockInOut () {
    const [isClockIn, setIsClockIn] = useState(false);
    const [clockedInTime, setClockedInTime] = useState(null);
    const [clockedOutTime, setClockedOutTime] = useState(null);
    const [showClockInMessage, setShowClockInMessage] = useState(false);
    const [showClockOutMessage, setShowClockOutMessage] = useState(false);
    const [showClockOutButton, setShowClockOutButton] = useState(false);
    const [showClockInButton, setShowClockInButton] = useState(true);
    const [clockedInDuration, setClockedInDuration] = useState({hours: 0, mins: 0}) 

    useEffect(() => {
        let intervalId;

        if (isClockIn && clockedInTime) {
            updateDuration();

            intervalId = setInterval(updateDuration, 60000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [isClockIn, clockedInTime])

    const updateDuration = () => {
        if (!isClockIn) return;

        const now = new Date();
        const diffMs = now - clockedInTime // in milliseconds
        const diffHrs = Math.floor(diffMs / (1000*60*60))
        const diffMins = Math.floor((diffMs % (1000*60*60)) / (1000*60))

        setClockedInDuration({hours: diffHrs, mins: diffMins});
    };

    const handleClockIn = () => {
        const now = new Date();
        setIsClockIn(true);
        setClockedInTime(now);
        setShowClockInButton(false);
        setShowClockInMessage(true);

        // hide message after 2 seconds
        setTimeout(() => {
            setShowClockInMessage(false);
            setShowClockOutButton(true);
        }, 2000)
    }

    const handleClockOut = () => {
        const now = new Date();
        setIsClockIn(false);
        setClockedOutTime(now);
        setShowClockOutButton(false);
        setShowClockOutMessage(true);

        setTimeout(() => {
            setShowClockOutMessage(false);
            setShowClockInButton(true);
        }, 2000)

    }

    return (
        <div className="clockinout_content-wrapper card-p osns">
            <div className="clockinout_duration">
                <p><span className="clockinout_big-num">{clockedInDuration['hours']}</span> hours <span className="clockinout_big-num">{clockedInDuration['mins']}</span> mins</p>
                <p className='clockinout_subtext color-grey'>clocked-in duration</p>
            </div>

           { showClockInMessage && (
                <div className='color-grey'>
                    Successfully clocked in in at {clockedInTime.toLocaleTimeString()}
                </div>
           )}
           { showClockOutMessage && (
                <div className='color-grey'>
                    Successfully clocked out at {clockedOutTime.toLocaleTimeString()}
                </div>
           )}           


            <div className="clockinout_buttons">
                {showClockInButton && (
                    <button onClick={handleClockIn} className="clockinout_button clockinout_clockin-button">Clock IN</button>
                )}
                
                {showClockOutButton && (
                    <button onClick={handleClockOut} className="clockinout_button clockinout_clockout-button">Clock OUT</button>
                )} 
            </div>
        </div>
    );
}

export default ClockInOut;