import { Ledger } from "./Ledger"

class Account {
  #accNo
  #name
  #alias
  #dbCr
  ledger
  accounts

  constructor(name, alias, accountType, dbCr = "+") {
    this.#accNo = getAccountNo(accountType)
    this.#name = name
    this.#alias = alias
    this.ledger = new Ledger()
    this.accounts = []
    this.#dbCr = dbCr
  }

  getName = () => {
    return this.#name
  }

  getAlias = () => {
    return this.#alias
  }

  formatTransaction = (amount, effect = "+") => {
    let dbCr = getDbCrString(this.#dbCr, effect)
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

Account.accountNo = {
  asset: 100,
  liability: 200,
  oe: 300,
  rev: 400,
  exp: 800,
  other: 500,
}

const getAccountNo = accountType => {
  return ++Account.accountNo[accountType]
}

const accountsBook = {}

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
    accountsBook[currAcc.getName()] = currAcc
    if (currAcc.getAlias() !== undefined) {
      accountsBook[currAcc.getAlias()] = currAcc
    }

    // processing child accounts
    if (account.account !== undefined) {
      currAcc.accounts = processAccounts(
        account.account,
        accountType,
        account.dbCr
      )
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

export { Account, processAccounts, accountsBook }
