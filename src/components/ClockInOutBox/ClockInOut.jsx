import React from 'react';
import "./ClockInOut.css";

function ClockInOut () {
    const clockedInTime = new Date('2025-04-30T08:30:00')
    // calculate the clocked in duration based on clocked in time
    // const [clockedInDuration, setClockedInDuration] = useState();
    const clockedInDuration = {"hours":4, "mins": 35}
    return (
        <div className="clockinout_content-wrapper card-p osns">
            <div className="clockinout_duration">
                <p><span className="clockinout_big-num">{clockedInDuration['hours']}</span> hours <span className="clockinout_big-num">{clockedInDuration['mins']}</span> mins</p>
                <p className='clockinout_subtext color-grey'>clocked-in duration</p>
            </div>
            <div className="clockinout_buttons">
                <button className="clockinout_button clockinout_clockin-button">Clock IN</button>
                <button className="clockinout_button clockinout_clockout-button">Clock OUT</button>
            </div>
        </div>
    );
}

export default ClockInOut;