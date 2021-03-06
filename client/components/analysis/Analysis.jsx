import React, { useState, useEffect } from 'react';
import IncomePie from './IncomePie';
import ExpensePie from './ExpensePie';

const Analysis = ({
  incomes, expenses, incomeSum, expenseSum,
}) => {
  const [incomeBreakdown, setIncomeBreakdown] = useState();
  const [incomeBreakdownSum, setIncomeBreakdownSum] = useState({});
  const [expenseBreakdown, setExpenseBreakdown] = useState();
  const [expenseBreakdownSum, setExpenseBreakdownSum] = useState({});
  const [selectIncome, setSelectIncome] = useState(false);

  const breakdown = (records) => {
    const breakdownTemp = {};
    const breakdownSumTemp = {};
    for (let i = 0; i < records.length; i += 1) {
      const { category, amount } = records[i];
      if (breakdownTemp[category]) {
        breakdownTemp[category].push(records[i]);
        breakdownSumTemp[category].y += Math.abs(amount);
      } else {
        breakdownTemp[category] = [records[i]];
        breakdownSumTemp[category] = {
          label: category,
          y: Math.abs(amount),
        };
      }
    }
    return [breakdownTemp, breakdownSumTemp];
  };

  useEffect(() => {
    const [inBreakdown, inBreakdownSum] = breakdown(incomes);
    setIncomeBreakdown(inBreakdown);
    setIncomeBreakdownSum(inBreakdownSum);
    const [exBreakdown, exBreakdownSum] = breakdown(expenses);
    setExpenseBreakdown(exBreakdown);
    setExpenseBreakdownSum(exBreakdownSum);
  }, [incomes]);

  return (
    <div>
      <button
        className={selectIncome ? 'toggleInEx gbutton' : 'toggleInEx rbutton'}
        onClick={() => setSelectIncome(!selectIncome)}
      >
        {selectIncome ? 'Income' : 'Expense'}
      </button>
      { selectIncome
        ? (
          <IncomePie
            incomeBreakdownSum={incomeBreakdownSum}
            incomeBreakdown={incomeBreakdown}
          />
        ) : (
          <ExpensePie
            expenseBreakdown={expenseBreakdown}
            expenseBreakdownSum={expenseBreakdownSum}
          />
        )}
      <div className="analysisSum">
        <span className="analysisSumComp">Total:</span>
        <span className="analysisSumComp">
          { selectIncome ? `$${incomeSum}` : `-$${expenseSum}`}
        </span>
      </div>
      <div className="cover1" />
      <div className="cover2" />
    </div>
  );
};

export default Analysis;
