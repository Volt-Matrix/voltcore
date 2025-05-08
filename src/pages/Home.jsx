import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { loggedInUserDetails } from '../lib/placeholder';

// import components
import ClockInOut from '../components/ClockInOutBox/ClockInOut';
import AnnouncementsPreview from '../components/AnnouncementsBox/AnnouncementsPreview';
import AvailableLeaves from '../components/AvailableLeavesBox/AvailableLeaves';
import AttendanceCalendar from '../components/Calender/AttandanceMarker';
import UpcomingHolidays from '../components/UpcomingHolidays/UpcomingHolidays';
import UpcomingBirthdays from '../components/UpcomingBirthdays/UpcomingBirthdays';

// import icons
import { FaLink } from "react-icons/fa";

// quick links urls
const quickLinksUrls = [
  {name: "Leave Request", url: "leaves/apply", cname: "leave-req",bgcolor: "#3bceac"},
  {name: "Payslips", url: "payroll", cname: "payslips", bgcolor: "#f6bd60"},
  {name: "Fill Timesheet", url: "attendance", cname: "timesheet", bgcolor: "#8ecae6"},
  {name: "Suggestions Box", url: "suggestions-box", cname: "suggestions", bgcolor: "#f28482"},
]

function Home() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval)
  }, []);


  return (
    <div className="page-layout-container home_content-wrapper">

        <div className="home_greet-time">
          <div className="home_greet rpr">
            <p>Welcome back, {loggedInUserDetails.name}!</p>
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
              <AnnouncementsPreview />
            </div>

            <div className="home_available-leaves">
              <AvailableLeaves />
            </div>
          </div>

          <div className="home_second-row">

            <div className="home_calendar">
              <div className="card-p">
              <AttendanceCalendar />
              </div>
            </div>

            <div className="home_events-quick-links">
              
              <div className="home_events">
                <div className="home_holidays">
                  <UpcomingHolidays />
                </div>
                <div className="home_birthdays">
                  <UpcomingBirthdays />
                </div>
              </div>

              <div className="home_quick-links card-p">
                <h2 className="rpr"><FaLink className='home_link-icon'/> Quick Links</h2>
                <div className="home_quick-links-content">
                  {quickLinksUrls.map((qlink, index) => (
                    <Link key={index} className={`home_${qlink.cname}`} to={qlink.url}>{qlink.name}</Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>


    </div>
  );
}

export default Home;