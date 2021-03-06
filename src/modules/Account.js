import { Ledger } from "./Ledger.js"

class Account {
  #accNo
  #name
  #alias
  #dbCr
  ledger
  accounts
  #balance

  constructor(name, alias, accountType, dbCr = "+") {
    this.#accNo = getAccountNo(accountType)
    this.#name = name
    this.#alias = alias
    this.ledger = new Ledger()
    this.accounts = []
    this.#dbCr = dbCr
    this.#balance = 0
  }

  getName = () => {
    return this.#name
  }

  getAlias = () => {
    return this.#alias
  }

  getAccountNo = () => {
    return this.#accNo
  }

  getBalance = () => {
    return this.#balance
  }

  getDbCr = () => {
    return this.#dbCr
  }

  requestTransaction = (amount, effect = "+", date) => {
    let dbCr = getDbCrString(this.#dbCr, effect)
    this.#balance += (effect === "+" ? 1 : -1) * amount
    this.ledger.addTransaction({
      [dbCr]: amount,
      balance: this.#balance,
      date: date,
    })
    return {
      [dbCr]: {
        accountNo: this.#accNo,
        accountName: this.#name,
        amount: amount,
      },
    }
  }
}

const getDbCrString = (accountDbCr, activityEffect) => {
  if (accountDbCr === "+" && activityEffect === "+") {
    return "credit"
  } else if (accountDbCr === "+" && activityEffect === "-") {
    return "debit"
  } else if (accountDbCr === "-" && activityEffect === "+") {
    return "debit"
  } else if (accountDbCr === "-" && activityEffect === "-") {
    return "credit"
  }
}

global.accountNoPrefix = {
  asset: 100,
  liability: 200,
  oe: 300,
  rev: 400,
  exp: 800,
  other: 500,
}

const getAccountNo = accountType => {
  return ++global.accountNoPrefix[accountType]
}

global.accountsBook = {}
global.accountsList = []

const processAccounts = (jsonAccounts, accountType, parentDbCr = "+") => {
  if (jsonAccounts === undefined) {
    return []
  }
  let accounts = []
  for (let account of jsonAccounts) {
    // Setting the account type
    let _accountType = setAccountType(account.alias)
    accountType = _accountType === undefined ? accountType : _accountType

    // setting the debit credit style
    account.dbCr = account.dbCr === undefined ? parentDbCr : account.dbCr

    // creating a new account
    let currAcc = new Account(
      account.name,
      account.alias,
      accountType,
      account.dbCr
    )
    accounts.push(currAcc)

    // adding account to the dictionary
    global.accountsBook[currAcc.getName()] = currAcc
    if (currAcc.getAlias() !== undefined) {
      global.accountsBook[currAcc.getAlias()] = currAcc
    }

    // processing child accounts
    if (account.account !== undefined) {
      currAcc.accounts = processAccounts(
        account.account,
        accountType,
        account.dbCr
      )
    } else {
      // adding account to the list
      global.accountsList.push(currAcc)
    }
  }
  return accounts
}

const setAccountType = accountAlias => {
  switch (accountAlias) {
    case "asset":
    case "liability":
    case "oe":
    case "rev":
    case "exp":
      return accountAlias
    default:
      return undefined
  }
}

const resetAccountsGlobals = () => {
  global.accountsBook = {}
  global.accountsList = []
  global.accountNoPrefix = {
    asset: 100,
    liability: 200,
    oe: 300,
    rev: 400,
    exp: 800,
    other: 500,
  }
  global.trialBalance = {
    debit: 0,
    credit: 0,
  }
}

export { Account, processAccounts, resetAccountsGlobals }
