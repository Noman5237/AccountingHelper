import React, { Component } from "react"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/theme-terminal"

import sampleSyntax from "../../data/sample"

class AceEditorCom extends Component {
  constructor(props) {
    super(props)
    this.refName = React.createRef()
  }

  componentDidMount() {
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
    return (
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
    )
  }
}

export { AceEditorCom }
