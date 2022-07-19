import React from "react";
import ReactDOM from "react-dom";
import { EditorState, RichUtils } from "draft-js";
import { Button, Box, Grid } from "@mui/material";
import Editor from "@draft-js-plugins/editor";
import createHighlightPlugin from "./CreateEditorPlugin";

const highlightPlugin = createHighlightPlugin();

const styles = {
  textWindow: {
    position: "relative",
    borderColor: "#FFFFFF",
    borderStyle: "solid",
    borderWidth: "20px",
    width: "350px",
    height: "444px",
    background: "#F3F3F3",
    marginRight: "20px",
    fontSize: "20px",
    boxShadow:
      "2px 2px 30px rgba(0, 0, 0, 0.1), -2px -2px 30px rgba(0, 0, 0, 0.1)",
  },
};

class CreateTextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    };
    this.plugins = [highlightPlugin];
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(
      this.state.editorState,
      command
    );
    if (newState) {
      this.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  onUnderlineClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE")
    );
  };

  onBoldClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
  };

  onItalicClick = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC")
    );
  };

  onHighlight = () => {
    this.onChange(
      RichUtils.toggleInlineStyle(this.state.editorState, "HIGHLIGHT")
    );
  };

  render() {
    return (
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item xs={12}>
          <div className="editorContainer">
            <Button onClick={this.onUnderlineClick}>U</Button>
            <Button onClick={this.onBoldClick}>
              <b>B</b>
            </Button>
            <Button onClick={this.onItalicClick}>
              <em>I</em>
            </Button>
            <Button className="highlight" onClick={this.onHighlight}>
              <span style={{ background: "yellow" }}>H</span>
            </Button>
            <Box className="editors" style={styles.textWindow}>
              <Editor
                editorState={this.state.editorState}
                handleKeyCommand={this.handleKeyCommand}
                onChange={this.onChange}
              />
            </Box>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default CreateTextEditor;
