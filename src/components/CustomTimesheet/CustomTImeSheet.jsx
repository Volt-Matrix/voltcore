import React, { useEffect, useState } from 'react';
import './CustomTImeSheet.css';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CirclePlus } from 'lucide-react';
import { eachDayOfInterval } from 'date-fns';
import MoreActionsButton from '../MoreActionsButton/MoreActionsButton';
import AddTimeExpense from '../AddTimeExpense/AddTimeExpense';
import { ToastContainer,toast,Bounce } from 'react-toastify';
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
// const texp = {
//   id: 0,
//   hourSpent: 3,
//   description: 'Doing Research on generative ai',
// };
function CustomTImeSheet() {
  const [timeSheetData, setTimeSheetData] = useState({
    fromDate: '',
    toDate: '',
    dateRange: [],
    data: [],
  });
const warning = ()=>{
  toast('Make Sure to save details before exit', {
    position: 'top-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: 'light',
    transition: Bounce,
  });
}
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
  const addTimeExpense = (e, rowId, indexOfInput, cmd) => {
    console.log('inoput index', indexOfInput,rowId);
    if (cmd == 'remove') {
      setTimeSheetData((prev) => ({
        ...prev,
        data: prev.data.map((ele, index) => {
          if (rowId == index) {
            return {
              ...ele,
              timeExpense: ele.timeExpense.filter((timeExp, expInd) => {
                console.log(`expIndex ${expInd},input INdex ${indexOfInput}`,expInd !== indexOfInput);
                return expInd !== indexOfInput;
              }),
            };
          } else {
            return ele;
          }
        }),
      }));
      return;
    }
    const name = e.target.name;
    const value = e.target.value;
    const myExpenseDetails = {
      name,
      value,
      rowId,
      indexOfInput,
    };
    console.log('Add and delete time expense---->', myExpenseDetails);
    setTimeSheetData((prev) => ({
      ...prev,
      data: prev.data.map((ele, index) => {
        if (rowId == index) {
          return {
            ...ele,
            timeExpense: ele.timeExpense.map((timeExp, expInd) =>
              expInd == indexOfInput
                ? {
                    ...timeExp,
                    [name]: value,
                  }
                : timeExp
            ),
          };
        } else {
          return ele;
        }
      }),
    }));
  };

  const addExpenseItem = (addExpenseToDataIndex) => {
    console.log('Please Add a expense item', addExpenseToDataIndex);
    const myTimeSheetData = [...timeSheetData.data];
    myTimeSheetData[addExpenseToDataIndex].timeExpense.push({
      hourSpent: 0,
      description: '',
    });
    setTimeSheetData({ ...timeSheetData, data: [...myTimeSheetData] });
  };
  useEffect(() => {
    const fDate = timeSheetData.fromDate;
    const tDate = timeSheetData.toDate;
    if (fDate && tDate) {
      const myList = eachDayOfInterval({ start: fDate, end: tDate }).map((item, index) => {
        return {
          id: index,
          date: new Date(item).toLocaleDateString(),
          checkIn: '9:00',
          checkOut: '5:00',
          totalHours: 8,
          timeExpense: [],
        };
      });
      console.log('Date Range--->', myList);
      setTimeSheetData({ ...timeSheetData, data: [...myList] });
    }
  }, [timeSheetData.fromDate, timeSheetData.toDate]);
  return (
    <div className="att-container ">
      <div className="flex gap-2 justify-center rsh">
        <ArrowLeft
          onClick={() => {
            warning()
            setTimeout(()=>{navigate(-1)},5000)
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
        <table className="table-style1">
          <thead>
            <tr className="rpr">
              {timeSheetFields.map((field, index) => (
                <th key={index}>{field}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timeSheetData.data.map((date, index) => (
              <>
                <tr className="osns">
                  <td>{timeSheetData.data[index]?.date && timeSheetData.data[index].date}</td>

                  <td>{timeSheetData.data[index]?.checkIn && timeSheetData.data[index].checkIn}</td>
                  <td>
                    {timeSheetData.data[index]?.checkOut && timeSheetData.data[index].checkOut}
                  </td>
                  <td>
                    {timeSheetData.data[index]?.totalHours && timeSheetData.data[index].totalHours}
                  </td>
                  <td></td>
                  <td>
                    <MoreActionsButton
                      actionTypes={actionTypes}
                      onEdit={() => handleEditClick(index)}
                    />
                  </td>
                </tr>
                {
                  <tr className="expand-row">
                    <td colSpan={6}>
                      <div
                        colSpan={2}
                        className={`collapsible-container ${openRowIndex === index ? 'open' : ''}`}
                      >
                        <CirclePlus
                          onClick={() => {
                            addExpenseItem(index);
                          }}
                        />
                        {timeSheetData.data[index].timeExpense.map((ele, expindex) => (
                          <AddTimeExpense
                            handleExpenseInput={addTimeExpense}
                            rowId={index}
                            expIndex={expindex}
                            data={timeSheetData.data[index].timeExpense[expindex]}
                            key={expindex}
                          />
                        ))}
                      </div>
                    </td>
                  </tr>
                }
              </>
            ))}
          </tbody>
        </table>
        <button className="mrg-tp">Save</button>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
        transition={Bounce}
      />
    </div>
  );
}
export default CustomTImeSheet;
