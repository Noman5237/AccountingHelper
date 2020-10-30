import React, { Fragment } from "react"

const GeneralJournal = ({ journal: transactions }) => {
  let id = 0
  const Records = () => {
    return transactions.map(transaction => {
      const {
        debit: debits,
        credit: credits,
      } = transaction.getTransactionEvents()

      return (
        <Fragment key={++id}>
          <tr className="border-bottom">
            <td rowSpan={debits.length + credits.length + 2}>
              {transaction.getDate()}
            </td>
          </tr>
          <Debits debits={debits} />
          <Credits credits={credits} />
          <tr className="border-bottom">
            <td className="explanation border-side">
              {"(" + transaction.getExplanation() + ")"}
            </td>
            <td className="border-side"></td>
            <td className="border-side"></td>
            <td className="border-side"></td>
          </tr>
        </Fragment>
      )
    })
  }

  return (
    <table className="border-bottom border-side">
      <thead>
        <tr
          className="border-bottom border-side"
          style={{ borderTop: "1px solid black" }}
        >
          <th colSpan={5}>General Journal - Page J1</th>
        </tr>
        <tr className="border-bottom border-side">
          <th className="border-side">Date</th>
          <th className="border-side">Account Titles and Explanation</th>
          <th className="border-side">Ref.</th>
          <th className="border-side">Debit</th>
          <th className="border-side">Credit</th>
        </tr>
      </thead>
      <tbody>
        <Records />
      </tbody>
    </table>
  )
}

const Debits = ({ debits }) => {
  let id = 0
  return debits.map(debit => (
    <tr key={++id + 100}>
      <td className="border-side">{debit.accountName}</td>
      <td className="border-side">{debit.accountNo}</td>
      <td className="border-side">{debit.amount}</td>
      <td className="border-side"></td>
    </tr>
  ))
}

const Credits = ({ credits }) => {
  let id = 0
  return credits.map(credit => (
    <tr key={++id + 200}>
      <td className="credit border-side">{credit.accountName}</td>
      <td className="border-side">{credit.accountNo}</td>
      <td className="border-side"></td>
      <td className="border-side">{credit.amount}</td>
    </tr>
  ))
}

export default GeneralJournal
