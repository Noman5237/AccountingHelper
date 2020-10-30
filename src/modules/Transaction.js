class Transaction {
  #date
  #explanation
  #transactionEvents
  constructor(date, explanation = "") {
    this.#date = new Date(date)
    this.#explanation = explanation
    this.#transactionEvents = {
      debit: [],
      credit: [],
    }
  }

  addTransactionEvent = transactionEvent => {
    if (transactionEvent.debit !== undefined) {
      this.#transactionEvents.debit.push(transactionEvent.debit)
    }
    if (transactionEvent.credit !== undefined) {
      this.#transactionEvents.credit.push(transactionEvent.credit)
    }
  }

  getDate = () => {
    return this.#date.toLocaleString()
  }

  getExplanation = () => {
    return this.#explanation
  }

  getTransactionEvents = () => {
    return this.#transactionEvents
  }
}

const processTransactions = (transactions, accountsBook) => {
  let processedTransactions = []
  for (let transaction of transactions) {
    let transactionObj = new Transaction(
      transaction.date,
      transaction.explanation
    )

    let accounts = []
    for (let elem of transaction.entry) {
      if (typeof elem === "number") {
        for (let entry of accounts) {
          let processedTransaction = entry.account.formatTransaction(
            elem,
            entry.effect
          )
          transactionObj.addTransactionEvent(processedTransaction)
        }
        accounts = []
      } else {
        let effect = "+"
        if (elem[0] === "+" || elem[0] === "-") {
          effect = elem[0]
          elem = elem.substring(1)
        }
        accounts.push({
          account: accountsBook[elem],
          effect: effect,
        })
      }
    }

    processedTransactions.push(transactionObj)
  }
  return processedTransactions
}

export { processTransactions }
