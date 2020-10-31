import React from "react"

const TrialBalance = ({ companyName, date, accountsList }) => {
  const trialBalance = getTrialBalance(accountsList)
  return (
    <table>
      <thead>
        <tr>
          <th className="border-side border-top border-bottom" colSpan={3}>
            {companyName}
          </th>
        </tr>
        <tr>
          <th className="border-side border-top border-bottom" colSpan={3}>
            Trial Balance
          </th>
        </tr>
        <tr>
          <th className="border-side border-top border-bottom" colSpan={3}>
            {date}
          </th>
        </tr>
        <tr>
          <th className="border-side border-top border-bottom"></th>
          <th className="border-side border-top border-bottom">Debit</th>
          <th className="border-side border-top border-bottom">Credit</th>
        </tr>
      </thead>
      <tbody>
        <Balances accountsList={accountsList} />
        <tr>
          <td className="border-top border-bottom border-side"></td>
          <td className="border-top border-bottom border-side">
            <span style={{ borderBottom: "3px double" }}>
              ${trialBalance.debit}
            </span>
          </td>
          <td className="border-side border-top border-bottom">
            <span style={{ borderBottom: "3px double" }}>
              ${trialBalance.credit}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

const Balances = ({ accountsList }) => {
  let id = 0
  return accountsList.map(account => {
    return (
      <tr className="border-side border-top border-bottom" key={++id}>
        <td className="border-side border-top border-bottom">
          {account.getName()}
        </td>
        {account.getDbCr() === "-" ? (
          <td className="border-side border-top border-bottom">
            {account.getBalance()}
          </td>
        ) : (
          <td className="border-side border-top border-bottom"></td>
        )}
        {account.getDbCr() === "+" ? (
          <td className="border-side border-top border-bottom">
            {account.getBalance()}
          </td>
        ) : (
          <td className="border-side border-top border-bottom"></td>
        )}
      </tr>
    )
  })
}

const getTrialBalance = accountsList => {
  const trialBalance = {
    debit: 0,
    credit: 0,
  }
  accountsList.map(account => {
    const balance = account.getBalance()
    if (account.getDbCr() === "-") {
      trialBalance.debit += balance
    } else {
      trialBalance.credit += balance
    }
  })

  return trialBalance
}

export default TrialBalance
