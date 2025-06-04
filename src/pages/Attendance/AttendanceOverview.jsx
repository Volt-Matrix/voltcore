import React from 'react';
import './AttendanceOverview.css'

import {FaCheckCircle, FaUserSlash, FaClock} from 'react-icons/fa';
import { BsFileSpreadsheetFill } from "react-icons/bs";

function AttendanceOverview () {

    const AttendanceStatCard = (props) => {
        return (
            <div className='att-ov-stat-card card-p osns'>
                <div className='att-ov-stat-header'>
                    {props.icon}
                    <p>{props.title}</p>
                </div>

                <div className='att-ov-stat-value'>
                    <p>{props.value}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="att-ov-content-wrapper page-layout-container">
            <header>
                <h2 className='rsh'>Attendance Overview</h2>
                <hr className='color-grey' />
            </header>

            <section className='att-ov-stats-container osns'>
                <AttendanceStatCard title='Total Employees Present' icon={<FaCheckCircle /> }  value={120} />
                <AttendanceStatCard title='Employees Absent' icon={<FaUserSlash /> }  value={14} />
                <AttendanceStatCard title='Average Check-In Time' icon={<FaClock /> }  value={'08:25 AM'} />
            </section>

            <section className='att-ov-clockinout-table-container osns'>
                <header>
                    <BsFileSpreadsheetFill />
                    <p>Attendance History</p>
                </header>

                <div className='att-ov-filters'>
                    <div className='att-ov-dept-date'>
                        <p>Select Department</p>
                        <p>Select Date</p>
                    </div>

                    <div className='att-ov-search-query'>
                        <p>Search Employee</p>
                        <p>Submit query</p>
                    </div>
                </div>

                <table className='table-style1'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Department</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>CVM001</td>
                            <td>Sanivada Sai Chaitanya</td>
                            <td>Development</td>
                            <td>Present</td>
                        </tr>
                        <tr>
                            <td>CVM002</td>
                            <td>Rohit Sharma</td>
                            <td>Development</td>
                            <td>Absent</td>
                        </tr>

                    </tbody>

                </table>
            </section>
        </div>
    )
}

export default AttendanceOverview;