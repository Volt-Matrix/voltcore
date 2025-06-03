import React from 'react';
import './AddTimeExpense.css';
import { Check } from 'lucide-react';
import { X } from 'lucide-react';
const AddTimeExpense = ({ handleExpenseInput, rowId, expIndex, data,saveTimeExpense }) => {
  
  return (
    <div className="atexp-con">
      <div>{expIndex + 1}</div>
      <input
        type="number"
        name="hourSpent"
        onChange={(e) => {
          handleExpenseInput(e, rowId, expIndex);
        }}
        value={data?.hourSpent}
        placeholder="Please Add Hours Spent"
      />
      <textarea
        name="description"
        onChange={(e) => {
          handleExpenseInput(e, rowId, expIndex);
        }}
        placeholder="Please give task details"
        value={data.description}
      />
       <Check
        onClick={() => {
          // handleExpenseInput('', rowId, expIndex, 'remove');
          saveTimeExpense(rowId, expIndex)
          console.log('Save Input')
        }}
      />
      <X
        onClick={() => {
          handleExpenseInput('', rowId, expIndex, 'remove');
        }}
      />
    </div>
  );
};

export default AddTimeExpense;
