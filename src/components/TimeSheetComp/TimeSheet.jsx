import React, { useState } from 'react';
import './TimeSheet.css'; // Create this CSS file
import { Link ,useNavigate } from 'react-router-dom';
const TimeSheet = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
const navigate = useNavigate()
  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    <div className="suti-container">
        <button className="button-57 rpr" role="button" onClick={toggleForm}><span className="text rpr">Time Sheet</span>{!isFormVisible?<span>open</span>:<span>close</span>}</button>

      <div className={`sub-frm ${isFormVisible ? 'visible' : ''}`}>
        <div className="date-inputs">
          <input type="date" name="fromDate" />
          <input type="date" name="toDate" />
        </div>
        <div className='btn-container'>
          <button
            className="button-17 rpr"
            type="submit"
            onClick={() => {
              setIsFormVisible(false);
            }}
          >
            Submit
          </button>
          <button
            className="button-17 rpr"
            type="submit"
            onClick={() => {
              setIsFormVisible(false);
              navigate('/attendance/myTimeSheet')
            }}
          >
            
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeSheet;
