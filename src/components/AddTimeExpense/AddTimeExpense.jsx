import React from 'react';
import './AddTimeExpense.css';
import { Check } from 'lucide-react';
const AddTimeExpense = ({ handleExpenseInput, rowId, expIndex,data }) => {
  return (
    <div className="atexp-con">
      <input
        type="number"
        name="hourSpent"
        onChange={(e) => {
          handleExpenseInput(e, rowId,expIndex);
        }}
        placeholder="Please Add Hours Spent"
      />
      <textarea
        name="description"
        onChange={(e) => {
          handleExpenseInput(e, rowId,expIndex);
        }}
        placeholder="Please give task details"
      />
      <Check />
    </div>
  );
};

export default AddTimeExpense;
