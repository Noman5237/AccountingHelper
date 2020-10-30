import React from "react"

const GeneralJournal = ({ journal: transactions }) => {
  let id = 0
  const Records = () => {
    return transactions.map(transaction => {
      let titles = []
      let refs = []
      let debs = []
      let creds = []
      const {
        debit: debits,
        credit: credits,
      } = transaction.getTransactionEvents()

      debits.map(debit => {
        titles.push(debit.accountName)
        refs.push(debit.accountNo)
        debs.push(debit.amount)
        creds.push(0)
      })
      credits.map(credit => {
        titles.push(credit.accountName)
        refs.push(credit.accountNo)
        creds.push(credit.amount)
        debs.push(0)
      })

      return (
        <tr key={++id}>
          <td>{transaction.getDate()}</td>
          <td>
            <table>
              <tbody>
                <AccTitles titles={titles} idPrefix={100} />
              </tbody>
            </table>
          </td>
          <td>
            <table>
              <tbody>
                <AccRefs refs={refs} idPrefix={200} />
              </tbody>
            </table>
          </td>
          <td>
            <table>
              <tbody>
                <AccDebs debs={debs} idPrefix={300} />
              </tbody>
            </table>
          </td>
          <td>
            <table>
              <tbody>
                <AccCreds creds={creds} idPrefix={400} />
              </tbody>
            </table>
          </td>
        </tr>
      )
    })
  }

  return (
    <table className="mainTable">
      <thead>
        <tr>
          <th colSpan={5}>General Ledger - Page J1</th>
        </tr>
        <tr>
          <th>Date</th>
          <th>Account Titles and Explanation</th>
          <th>Ref.</th>
          <th>Debit</th>
          <th>Credit</th>
        </tr>
      </thead>
      <tbody>
        <Records />
      </tbody>
    </table>
  )
}

const AccTitles = ({ titles, idPrefix }) => {
  let id = 0
  return titles.map(name => {
    return (
      <tr key={++id + idPrefix}>
        <td>{name}</td>
      </tr>
    )
  })
}

const AccRefs = ({ refs, idPrefix }) => {
  let id = 0
  return refs.map(ref => {
    return (
      <tr key={++id + idPrefix}>
        <td>{ref}</td>
      </tr>
    )
  })
}

const AccDebs = ({ debs, idPrefix }) => {
  let id = 0
  return debs.map(deb => {
    return (
      <tr key={++id + idPrefix}>
        <td>{deb}</td>
      </tr>
    )
  })
}

const AccCreds = ({ creds, idPrefix }) => {
  let id = 0
  return creds.map(cred => {
    return (
      <tr key={++id + idPrefix}>
        <td>{cred}</td>
      </tr>
    )
  })
}

export default GeneralJournal
