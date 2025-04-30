import React from 'react';
import "./ClockInOut.css";

function ClockInOut () {
    const clockedInTime = new Date('2025-04-30T08:30:00')
    // calculate the clocked in duration based on clocked in time
    // const [clockedInDuration, setClockedInDuration] = useState();
    const clockedInDuration = {"hours":4, "mins": 35}
    return (
        <div className="clockinout_content-wrapper">
            <div className="clockinout_duration">
                <p>{clockedInDuration['hours']} hours {clockedInDuration['mins']} mins</p>
                <p>clocked-in duration</p>
            </div>
            <div className="clockinout_buttons">

            </div>
        </div>
    );
}

export default ClockInOut;