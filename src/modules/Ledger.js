class Ledger {
  #transactions

  constructor() {
    this.#transactions = []
  }

  addTransaction = transaction => {
    this.#transactions.push(transaction)
  }

  getTransactions = () => {
    return this.#transactions
  }
}

module.exports = { Ledger }
