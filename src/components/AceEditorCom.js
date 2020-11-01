import React, { Component } from "react"
import AceEditor from "react-ace"
require("ace-builds/src-noconflict/mode-json")
require("ace-builds/src-noconflict/theme-terminal")

class AceEditorCom extends Component {
  constructor(props) {
    super(props)
    this.refName = React.createRef()
    this.state = {
      intervalId: null,
      value: props.value,
    }
  }

  componentDidMount() {
    if (typeof AceEditor === "undefined") {
      console.log(AceEditor)
      AceEditor = require("react-ace")
    }

    const intervalId = setInterval(this.onChange, 3000)
    this.setState({ intervalId: intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId)
  }

  onChange = async () => {
    const value = this.refName.current.editor.getValue()
    this.setState({
      value: value,
    })
    await this.props.onChange(value)
  }

  render() {
    return (
      <AceEditor
        ref={this.refName}
        placeholder="Write your account book here"
        mode="json"
        theme="terminal"
        value={this.state.value}
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

export default AceEditorCom
