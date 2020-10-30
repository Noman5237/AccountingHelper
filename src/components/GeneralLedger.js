import React from "react"

const GeneralLedger = ({ accountsList }) => {
  let id = 0
  return accountsList.map(account => {
    let transactions = account.ledger.getTransactions()
    return (
      <div key={++id}>
        <table className="border-bottom border-side">
          <thead>
            <tr
              className="border-bottom border-side"
              style={{ borderTop: "1px solid black" }}
            >
              <th colSpan={6}>
                {account.getName()} - No.{account.getAccountNo()}
              </th>
            </tr>
            <tr className="border-bottom border-side">
              <th className="border-side">Date</th>
              <th className="border-side">Explanation</th>
              <th className="border-side">Ref.</th>
              <th className="border-side">Debit</th>
              <th className="border-side">Credit</th>
              <th className="border-side">Credit</th>
            </tr>
          </thead>
          <tbody>
            <Transactions transactions={transactions} />
          </tbody>
        </table>
        <br></br>
      </div>
    )
  })
}

const Transactions = ({ transactions }) => {
  let id = 101
  return transactions.map(transaction => {
    return (
      <tr key={++id} className="border-side">
        <td className="border-side">{transaction.date}</td>
        <td className="border-side"></td>
        <td className="border-side">J1</td>
        {transaction.debit !== "undefined" ? (
          <td className="border-side">{transaction.debit}</td>
        ) : (
          <td className="border-side"></td>
        )}
        {transaction.credit !== "undefined" ? (
          <td className="border-side">{transaction.credit}</td>
        ) : (
          <td className="border-side"></td>
        )}
        <td className="border-side">{transaction.balance}</td>
      </tr>
    )
  })
}

export default GeneralLedger
