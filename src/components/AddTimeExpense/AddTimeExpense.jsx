import React from 'react';
import './AddTimeExpense.css';
import { Check } from 'lucide-react';
const AddTimeExpense = ({ handleExpenseInput, rowId, data }) => {
  return (
    <div className="atexp-con">
      <input
        type="number"
        name="hourSpent"
        onChange={(e) => {
          handleExpenseInput(e, rowId);
        }}
        placeholder="Please Add Hours Spent"
      />
      <textarea
        name="taskDetails"
        onChange={(e) => {
          handleExpenseInput(e, rowId);
        }}
        placeholder="Please give task details"
      />
      <Check />
    </div>
  );
};

export default AddTimeExpense;
