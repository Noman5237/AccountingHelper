import React, { Component } from "react"
var AceEditor

const sampleSyntax = `{"account":{"name":"Campus Laundromat","alias":"cl","account":[{"name":"Assets","alias":"asset","dbCr":"-","account":[{"name":"Cash","alias":"cash"},{"name":"Prepaid Insurance","alias":"pIns"},{"name":"Laundry Equipment","alias":"lEquip"}]},{"name":"Liabilities","alias":"liability","account":[{"name":"Notes Payable","alias":"np"},{"name":"Accounts Payable","alias":"ap"}]},{"name":"Owner's Equity","alias":"oe","account":[{"name":"Bob Sample, Capital","alias":"bsc"},{"name":"Bob Sample, Drawing","alias":"bsd","dbCr":"-"},{"name":"Revenue","alias":"rev","account":[{"name":"Service Revenue","alias":"serRev"}]},{"name":"Expense","dbCr":"-","alias":"exp","account":[{"name":"Advertising Expense","alias":"advExp"},{"name":"Rent Expense","alias":"rentExp"}]}]}]},"transactions":[{"date":"9/1/2010","entry":["cash","bsc",20000],"explanation":"Owner’s investment of cash in business"},{"date":"9/2/2010","entry":["-cash","rentExp",1000],"explanation":"Paid September rent"},{"date":"9/3/2010","entry":["lEquip",25000,"-cash",10000,"+np",15000],"explanation":"Purchased laundry equipment for cash and 6-month, 12% note payable"},{"date":"9/4/2010","entry":["pIns","-cash",1200],"explanation":"Paid one-year insurance policy"},{"date":"9/4/2010","entry":["advExp","ap",200],"explanation":"Received bill from Daily News for advertising"},{"date":"9/20/2010","entry":["-cash","bsd",700],"explanation":"Withdrew cash for personal use"},{"date":"9/30/2010","entry":["cash","serRev",6200],"explanation":"Received cash for services provided"}]}`
class AceEditorCom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      AceEditor: null,
    }
    this.refName = React.createRef()
  }

  componentDidMount() {
    var { AceEditor } = require("react-ace")
    this.setState({
      AceEditor: (
        <AceEditor
          ref={this.refName}
          placeholder="Write your account book here"
          mode="json"
          theme="terminal"
          value={sampleSyntax}
          fontSize={16}
          showGutter={true}
          highlightActiveLine={true}
          className="aceEditorCom"
          style={{ width: "95%" }}
          // value={sampleSyntax}
          name="aceEditor"
          setOptions={{
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
      ),
    })
    require("ace-builds/src-noconflict/mode-json")
    require("ace-builds/src-noconflict/theme-terminal")
    var intervalId = setInterval(this.onChange, 5000)
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalId: intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  onChange = async () => {
    await this.props.onChange(this.refName.current.editor.getValue())
  }

  render() {
    return this.state.AceEditor
  }
}

export default AceEditorCom
