import React, { useState } from "react";

// Components
import { convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Grid } from "@mui/material";

const styles = {
  toolbar: {
    bordercolor: "rgb(255, 0, 0)",
  },
};

function myBlockStyleFn(contentBlock) {
  const type = contentBlock.getType();
  if (type === "toolbar") {
    return "toolbar";
  }
}

const CreateTextEditor3 = (props) => {
  const [editorState, setEditorState] = useState(props.value);
  const onEditorStateChange = (newValue) => {
    setEditorState(newValue);
    return props.onChange(
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <div className="editor">
      <Grid
        container
        spacing={4}
        justifyContent="center"
        alignItems="center"
        direction="column"
      >
        <Grid item xs={1}>
          {" "}
        </Grid>
        <Grid item xs={10}>
          <Editor
            editorState={editorState}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarStyle={{
              position: "relative",
              alignItems: "center",
              alignContent: "center",
              textAlign: "center",
              justifyContent: "center",
              width: "1146px",
              height: "180px",
              background: "#F3F3F3",
              borderRadius: "30px",
              marginTop: "20px",
            }}
            editorStyle={{
              position: "relative",
              borderColor: "#FFFFFF",
              borderStyle: "solid",
              borderWidth: "20px",
              width: "350px",
              height: "444px",
              background: "#F3F3F3",
              fontSize: "20px",
              boxShadow:
                "2px 2px 30px rgba(0, 0, 0, 0.1), -2px -2px 30px rgba(0, 0, 0, 0.1)",

              marginBottom: "20px",
              alignItems: "center",
              alignContent: "center",
              textAlign: "center",
              justifyContent: "center",
            }}
            wrapperStyle={{}}
            onEditorStateChange={onEditorStateChange}
            toolbar={{
              options: [
                "inline",
                "fontSize",
                "fontFamily",
                "textAlign",
                "colorPicker",
                "emoji",
                "history",
              ],
              inline: {
                inDropdown: false,
                options: ["italic", "bold"],
                bold: { className: "demo-option-custom" },
                italic: { className: "demo-option-custom" },
                underline: { className: "demo-option-custom" },
              },
              fontSize: {
                options: [
                  8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96,
                ],
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
              },
              fontFamily: {
                options: [
                  "Arial",
                  "Georgia",
                  "Impact",
                  "Tahoma",
                  "Times New Roman",
                  "Verdana",
                ],
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
              },
              textAlign: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
                options: ["left", "center", "right", "justify"],
                left: { className: undefined },
                center: { className: undefined },
                right: { className: undefined },
                justify: { className: undefined },
              },
              colorPicker: {
                className: undefined,
                component: undefined,
                popupClassName: undefined,
                colors: [
                  "rgb(97,189,109)",
                  "rgb(26,188,156)",
                  "rgb(84,172,210)",
                  "rgb(44,130,201)",
                  "rgb(147,101,184)",
                  "rgb(71,85,119)",
                  "rgb(204,204,204)",
                  "rgb(65,168,95)",
                  "rgb(0,168,133)",
                  "rgb(61,142,185)",
                  "rgb(41,105,176)",
                  "rgb(85,57,130)",
                  "rgb(40,50,78)",
                  "rgb(0,0,0)",
                  "rgb(247,218,100)",
                  "rgb(251,160,38)",
                  "rgb(235,107,86)",
                  "rgb(226,80,65)",
                  "rgb(163,143,132)",
                  "rgb(239,239,239)",
                  "rgb(255,255,255)",
                  "rgb(250,197,28)",
                  "rgb(243,121,52)",
                  "rgb(209,72,65)",
                  "rgb(184,49,47)",
                  "rgb(124,112,107)",
                  "rgb(209,213,216)",
                ],
              },
              emoji: {
                className: undefined,
                component: undefined,
                popupClassName: undefined,
                emojis: [
                  "😀",
                  "😁",
                  "😂",
                  "😃",
                  "😉",
                  "😋",
                  "😎",
                  "😍",
                  "😗",
                  "🤗",
                  "🤔",
                  "😣",
                  "😫",
                  "😴",
                  "😌",
                  "🤓",
                  "😛",
                  "😜",
                  "😠",
                  "😇",
                  "😷",
                  "😈",
                  "👻",
                  "😺",
                  "😸",
                  "😹",
                  "😻",
                  "😼",
                  "😽",
                  "🙀",
                  "🙈",
                  "🙉",
                  "🙊",
                  "👼",
                  "👮",
                  "🕵",
                  "💂",
                  "👳",
                  "🎅",
                  "👸",
                  "👰",
                  "👲",
                  "🙍",
                  "🙇",
                  "🚶",
                  "🏃",
                  "💃",
                  "⛷",
                  "🏂",
                  "🏌",
                  "🏄",
                  "🚣",
                  "🏊",
                  "⛹",
                  "🏋",
                  "🚴",
                  "👫",
                  "💪",
                  "👈",
                  "👉",
                  "👉",
                  "👆",
                  "🖕",
                  "👇",
                  "🖖",
                  "🤘",
                  "🖐",
                  "👌",
                  "👍",
                  "👎",
                  "✊",
                  "👊",
                  "👏",
                  "🙌",
                  "🙏",
                  "🐵",
                  "🐶",
                  "🐇",
                  "🐥",
                  "🐸",
                  "🐌",
                  "🐛",
                  "🐜",
                  "🐝",
                  "🍉",
                  "🍄",
                  "🍔",
                  "🍤",
                  "🍨",
                  "🍪",
                  "🎂",
                  "🍰",
                  "🍾",
                  "🍷",
                  "🍸",
                  "🍺",
                  "🌍",
                  "🚑",
                  "⏰",
                  "🌙",
                  "🌝",
                  "🌞",
                  "⭐",
                  "🌟",
                  "🌠",
                  "🌨",
                  "🌩",
                  "⛄",
                  "🔥",
                  "🎄",
                  "🎈",
                  "🎉",
                  "🎊",
                  "🎁",
                  "🎗",
                  "🏀",
                  "🏈",
                  "🎲",
                  "🔇",
                  "🔈",
                  "📣",
                  "🔔",
                  "🎵",
                  "🎷",
                  "💰",
                  "🖊",
                  "📅",
                  "✅",
                  "❎",
                  "💯",
                ],
              },
              history: {
                inDropdown: false,
                className: undefined,
                component: undefined,
                dropdownClassName: undefined,
                options: ["undo", "redo"],
                undo: { className: undefined },
                redo: { className: undefined },
              },
            }}
          />
        </Grid>
        <Grid item xs={1}>
          {" "}
        </Grid>
      </Grid>
    </div>
  );
};

export default CreateTextEditor3;
