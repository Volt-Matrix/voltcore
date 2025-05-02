import React from 'react';
import "./UpcomingBirthdays.css";
import { upcomingBirthdaysList } from '../../lib/placeholder';

function UpcomingBirthdays () {
    return (
        <div className="UBday_content-wrapper card-p">
            <h2 className="rpr">Birthdays</h2>

            <div className="UBday_main-content osns">
                {upcomingBirthdaysList.map((birthday, index) => (
                    <div key={index}>
                        <div className="UBday_bday-row">
                            <div className="UBday_person-details">
                                <div className="UBday_person-name">
                                    <p>{birthday.name}</p>
                                </div>

                                <div className="UBday_person-role color-grey">
                                    <p>{birthday.role}</p>
                                </div>
                            </div>
                            
                            <div className="UBday_person-bdate">
                                <p>{birthday.bday}</p>
                            </div>
                        </div>

                        {index < upcomingBirthdaysList.length -1 && <hr className='color-grey' />}
                    </div>
                    
                ))}
            </div>
        </div>
    );
}

export default UpcomingBirthdays;