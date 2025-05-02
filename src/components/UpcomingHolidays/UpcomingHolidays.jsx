import React from 'react';
import "./UpcomingHolidays.css";
import { upcomingHolidaysList } from '../../lib/placeholder';

function UpcomingHolidays () {
    return (
        <div className="UHD_content-wrapper card-p">
            <h2 className="rpr">Upcoming Holidays</h2>
            <div className="UHD_main-content osns">
                <table>
                {upcomingHolidaysList.map((holiday, index) => (
                    <tr key={index}>
                        <td>{holiday.name}</td>
                        <td className="UHD_date-col color-grey">{holiday.date}</td>
                        <td className="UHD_day-col color-grey">{holiday.day}</td>
                    </tr>
                ))}
                </table>

            </div>
        </div>
    );
}

export default UpcomingHolidays;