import React, { Component } from "react"
import AceEditor from "react-ace"
import "ace-builds/src-noconflict/mode-json"
import "ace-builds/src-noconflict/theme-terminal"
import "ace-builds/src-noconflict/keybinding-vim"

import sampleSyntax from "../../data/sample"

class AceEditorCom extends Component {
  componentDidMount() {}

  onChange = async jsonSrc => {
    await this.props.onChange(jsonSrc)
  }

  render() {
    return (
      <AceEditor
        placeholder="Write your account book here"
        mode="json"
        onChange={this.onChange}
        theme="terminal"
        fontSize={16}
        showGutter={true}
        highlightActiveLine={true}
        className="aceEditorCom"
        style={{ width: "95%" }}
        value={sampleSyntax}
        name="aceEditor"
        editorProps={{ $blockScrolling: true }}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    )
  }
}

export { AceEditorCom }
