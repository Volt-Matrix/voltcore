import React, { useEffect, useState } from 'react';
import './CustomTImeSheet.css';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { eachDayOfInterval } from 'date-fns';
import MoreActionsButton from '../MoreActionsButton/MoreActionsButton';
export const timeSheetFields = [
  'Date',
  'Check In',
  'Check Out',
  'Total Hours',
  'Comments',
  'actions',
];
const actionTypes = [
  { name: 'Edit', action: '' },
  { name: 'Report', action: '' },
  { name: 'submit', action: '' },
];
function CustomTImeSheet() {
  const [timeSheetData, setTimeSheetData] = useState({
    fromDate: '',
    toDate: '',
    dateRange: [],
    data: [
      {
        checkIn: '9:00',
        checkOut: '5:00',
        totalHours: 8,
      },
      {
        checkIn: '9:00',
        checkOut: '5:00',
        totalHours: 8,
      },
      {
        checkIn: '9:00',
        checkOut: '5:00',
        totalHours: 8,
      },
      {
        checkIn: '9:00',
        checkOut: '5:00',
        totalHours: 8,
      },
      {
        checkIn: '9:00',
        checkOut: '5:00',
        totalHours: 8,
      },
    ],
  });

  const handleDatePick = (e) => {
    console.log('Date Selector-->', e.target.value);
    setTimeSheetData({
      ...timeSheetData,
      [e.target.name]: e.target.value,
    });
  };
  const navigate = useNavigate();

  const [openRowIndex, setOpenRowIndex] = useState(null);

  const handleEditClick = (index) => {
    setOpenRowIndex((prev) => (prev === index ? null : index));
  };
  useEffect(() => {
    const fDate = timeSheetData.fromDate;
    const tDate = timeSheetData.toDate;
    if (fDate && tDate) {
      const myList = eachDayOfInterval({ start: fDate, end: tDate }).map((item) =>
        new Date(item).toLocaleDateString()
      );
      console.log('Date Range--->', myList);
      setTimeSheetData({ ...timeSheetData, dateRange: [...myList] });
    }
  }, [timeSheetData.fromDate, timeSheetData.toDate]);
  return (
    <div className="att-container ">
      <div className="flex gap-2 justify-center rsh">
        <ArrowLeft
          onClick={() => {
            navigate(-1);
          }}
        />
        Time Sheet
      </div>
      <div className="atten-sheet card-p">
        <div className="d-pick">
          <div className="rpr block">Pick Range</div>
          <input type="date" name="fromDate" onChange={handleDatePick} />
          <input type="date" name="toDate" onChange={handleDatePick} />
        </div>
        <table className="flex-1 scrollable-table">
          <thead>
            <tr className="rpr">
              {timeSheetFields.map((field, index) => (
                <th key={index}>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSheetData.dateRange.map((date, index) => (
              <tr className="osns">
                <td>{date}</td>
                {
                  <>
                    <td>
                      {timeSheetData.data[index]?.checkIn && timeSheetData.data[index].checkIn}
                    </td>
                    <td>
                      {timeSheetData.data[index]?.checkOut && timeSheetData.data[index].checkOut}
                    </td>
                    <td>
                      {timeSheetData.data[index]?.totalHours &&
                        timeSheetData.data[index].totalHours}
                    </td>
                    <td></td>
                    <td>
                      <MoreActionsButton
                        actionTypes={actionTypes}
                        onEdit={() => handleEditClick(index)}
                      />
                    </td>
                  </>
                }
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CustomTImeSheet;
