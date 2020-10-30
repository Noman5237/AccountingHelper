import React, { Component } from "react"
import { AceEditorCom } from "../components/AceEditorCom"
import GeneralJournal from "../components/GeneralJournal"
import GeneralLedger from "../components/GeneralLedger"
import TrialBalance from "../components/TrialBalance"

import { processAccounts, resetAccountsGlobals } from "../modules/Account"
import { processTransactions } from "../modules/Transaction"
import "../style/index.css"

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      journal: [],
      account: undefined,
    }
  }

  componentDidMount() {}

  onChange = jsonSrc => {
    resetAccountsGlobals()
    let json, account, journal
    try {
      json = JSON.parse(jsonSrc)
    } catch (error) {
      console.log(error)
      return
    }
    try {
      account = processAccounts([json.account], "other")
      journal = processTransactions(json.transactions, global.accountsBook)
    } catch (error) {
      console.log(error)
      return
    }
    this.setState({
      journal: journal,
      account: account,
    })
  }

  render() {
    console.log(this.state.journal, this.state.account)
    return (
      <div>
        <h1>Recording Helper</h1>
        <AceEditorCom onChange={this.onChange} />
        <div className="pagebreak"> </div>
        <GeneralJournal journal={this.state.journal} />
        <div className="pagebreak"> </div>
        <GeneralLedger accountsList={global.accountsList} />
        <div className="pagebreak"> </div>
        {this.state.account !== undefined ? (
          <TrialBalance
            companyName={this.state.account[0].getName()}
            date={this.state.journal[this.state.journal.length - 1].getDate()}
            accountsList={global.accountsList}
          />
        ) : (
          <div></div>
        )}
      </div>
    )
  }
}
