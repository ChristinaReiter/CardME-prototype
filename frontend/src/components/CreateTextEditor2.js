import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { RichUtils, EditorState } from "draft-js";
import Editor from "@draft-js-plugins/editor";
import createToolbarPlugin from "@draft-js-plugins/static-toolbar";
import "@draft-js-plugins/static-toolbar/lib/plugin.css";
import { Button, Box, Grid } from "@mui/material";
import "draft-js/dist/Draft.css";
import {
  BoldButton,
  ItalicButton,
  UnorderedListButton,
  OrderedListButton,
  BlockquoteButton,
  CodeBlockButton,
} from "@draft-js-plugins/buttons";

const staticToolbarPlugin = createToolbarPlugin();
const { Toolbar } = staticToolbarPlugin;
const plugins = [staticToolbarPlugin];

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
  adjusttext: {
    position: "relative",
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    justifyContent: "center",
    width: "1146px",
    height: "180px",
    background: "#F3F3F3",
    borderRadius: "30px",
  },
};

const CreateTextEditor2 = () => {
  const editor = useRef(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <div>
      <Toolbar>
        {(externalProps) => (
          <div className="icons-toolbar">
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
            <CodeBlockButton {...externalProps} />
          </div>
        )}
      </Toolbar>
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item xs={12}>
          <Box className="editor" style={styles.textWindow}>
            <Editor
              editorState={editorState}
              onChange={onChange}
              plugins={plugins}
              ref={editor}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateTextEditor2;
