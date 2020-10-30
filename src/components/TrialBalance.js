import React from "react"

let balance = { debit: 0, credit: 0 }

const TrialBalance = ({ companyName, date, accountsList }) => {
  return (
    <table>
      <thead>
        <tr>
          <th colSpan={3}>{companyName}</th>
        </tr>
        <tr>
          <th colSpan={3}>Trial Balance</th>
        </tr>
        <tr>
          <th colSpan={3}>{date}</th>
        </tr>
        <tr>
          <th></th>
          <th>Debit</th>
          <th>Credit</th>
        </tr>
      </thead>
      <tbody>
        <Balances accountsList={accountsList} />
        <tr>
          <td></td>
          <td style={{ textDecoration: "underline" }}>${balance.debit}</td>
          <td style={{ textDecoration: "underline" }}>${balance.credit}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Balances = ({ accountsList }) => {
  let id = 0
  return accountsList.map(account => {
    return (
      <tr key={++id}>
        <td>{account.getName()}</td>
        {account.getDbCr() === "-" ? (
          <td>{account.getBalance()}</td>
        ) : (
          <td></td>
        )}
        {account.getDbCr() === "+" ? (
          <td>{account.getBalance()}</td>
        ) : (
          <td></td>
        )}
      </tr>
    )
  })
}

export default TrialBalance
