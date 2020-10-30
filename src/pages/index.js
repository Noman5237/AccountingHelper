import React, { Component } from "react"
import { AceEditorCom } from "../components/AceEditorCom"
import GeneralJournal from "../components/GeneralJournal"

import { processAccounts, accountsBook } from "../modules/Account"
import { processTransactions } from "../modules/Transaction"
import "../style/index.css"

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      journal: [],
    }
  }

  componentDidMount() {}

  onChange = jsonSrc => {
    let json
    try {
      json = JSON.parse(jsonSrc)
    } catch (error) {
      console.log(error)
      return
    }
    console.log(json)
    let account = processAccounts([json.account], "other")
    console.log(account)
    console.log(accountsBook)
    let journal = processTransactions(json.transactions, accountsBook)
    this.setState({
      journal: journal,
    })
    console.log(journal)
  }

  render() {
    try {
      return (
        <div>
          <h1>Recording Helper</h1>
          <AceEditorCom onChange={this.onChange} />
          <br></br>
          <GeneralJournal journal={this.state.journal} />
        </div>
      )
    } catch (error) {
      console.log(error)
    }
  }
}
