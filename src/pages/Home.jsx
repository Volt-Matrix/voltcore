import React, { useEffect, useState } from 'react';
import './Home.css';
import { loggedInUserDetails } from '../lib/placeholder';

// import components
import ClockInOut from '../components/ClockInOutBox/ClockInOut';

function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval)
  }, []);


  return (
    <div className="att-container home_content-wrapper">

        <div className="home_greet-time">
          <div className="home_greet rpr">
            <p>Welcome back, {loggedInUserDetails.name}</p>
          </div>
          <div className="home_time osns">
            <p>{time.toLocaleTimeString()}, {time.toDateString()}</p>
          </div>
        </div>

        <div className="home_main-content">

          <div className="home_first-row">
            <div className="home_clock-in-out">
              <ClockInOut />
            </div>
            <div className="home_announcements">

            </div>
            <div className="home_available-leaves">

            </div>
          </div>

          <div className="home_second-row">
            <div className="home_calendar">

            </div>
            <div className="home_events-quick-links">
              <div className="home_events">
                <div className="home_holidays">

                </div>
                <div className="home_birthdays">

                </div>

              </div>
              <div className="home_quick-links">

              </div>

            </div>
          </div>
        </div>


    </div>
  );
}

export default Home;