import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import { RichUtils, EditorState, Modifier } from "draft-js";
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
  AlignTextCenterButton,
  AlignTextRightButton,
  AlignTextLeftButton,
} from "@draft-js-plugins/buttons";
import "./../styles/CreateTextEditor.css";

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

  const blockStyleFn = (block) => {
    let alignment = "left";
    block.findStyleRanges((e) => {
      if (e.hasStyle("center")) {
        alignment = "center";
      }
      if (e.hasStyle("right")) {
        alignment = "right";
      }
    });
    return `editor-alignment-${alignment}`;
  };

  const alignmentStyles = ["left", "right", "center"];
  const applyAlignment = (newStyle) => {
    let styleForRemove = alignmentStyles.filter((style) => style !== newStyle);
    let currentContent = editorState.getCurrentContent();
    let selection = editorState.getSelection();
    let focusBlock = currentContent.getBlockForKey(selection.getFocusKey());
    let anchorBlock = currentContent.getBlockForKey(selection.getAnchorKey());
    let isBackward = selection.getIsBackward();

    let selectionMerge = {
      anchorOffset: 0,
      focusOffset: focusBlock.getLength(),
    };

    if (isBackward) {
      selectionMerge.anchorOffset = anchorBlock.getLength();
    }
    let finalSelection = selection.merge(selectionMerge);
    let finalContent = styleForRemove.reduce(
      (content, style) =>
        Modifier.removeInlineStyle(content, finalSelection, style),
      currentContent
    );
    let modifiedContent = Modifier.applyInlineStyle(
      finalContent,
      finalSelection,
      newStyle
    );
    const nextEditorState = EditorState.push(
      editorState,
      modifiedContent,
      "change-inline-style"
    );
    setEditorState(nextEditorState);
  };

  return (
    <Box sx={{ margin: "30 px" }}>
      <Toolbar>
        {(externalProps) => (
          <div className="icons-toolbar">
            <BoldButton {...externalProps} />
            <ItalicButton {...externalProps} />
            <UnorderedListButton {...externalProps} />
            <OrderedListButton {...externalProps} />
            <BlockquoteButton {...externalProps} />
            <CodeBlockButton {...externalProps} />
            <AlignTextCenterButton {...externalProps} />
            <AlignTextRightButton {...externalProps} />
            <AlignTextLeftButton {...externalProps} />
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
              blockStyleFn={blockStyleFn}
              ref={editor}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CreateTextEditor2;
