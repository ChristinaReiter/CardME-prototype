import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignLeft from "@mui/icons-material/FormatAlignLeft";

const styles = {
  stepbar: {
    position: "relative",
    width: "100%",
    height: "60px",
    background: "#A7CDA7",
    boxShadow:
      "0px 6px 4px rgba(51, 97, 50, 0.25), inset 0px 6px 4px rgba(51, 97, 50, 0.25)",
    top: "10px",
    fontSize: "30px",
    zIndex: "1",
  },
  kreis: {
    fontFamily: '"Annie Use Your Telescope"',
    position: "relative",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "#0A5108",
    color: "white",
    fontSize: "30px",
    textAlign: "center",
    lineHeight: "40px",
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
  textadjust: {
    position: "relative",
    fontFamily: "Antic",
    fontWeight: "400",
    fontSize: "32px",
    top: "20px",
  },
  textWindow: {
    position: "relative",
    borderColor: "#FFFFFF",
    borderStyle: "solid",
    borderWidth: "20px",
    width: "350px",
    height: "444px",
    background: "#F3F3F3",
    marginRight: "20px",
    boxShadow:
      "2px 2px 30px rgba(0, 0, 0, 0.1), -2px -2px 30px rgba(0, 0, 0, 0.1)",
  },
  text1: {
    position: "relative",
    fontFamily: "Antic",
    fontWeight: "400",
    fontSize: "20px",
    display: "center",
  },
  text2: {
    position: "relative",
    fontFamily: "Antic",
    fontWeight: "400",
    fontSize: "16px",
    lineHeight: "20px",
    display: "center",
    top: "80px",
    color: "rgba(0, 0, 0, 0.5)",
  },
};

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const CreateText = ({
  text,
  setText,
  setfontstyle,
  setfontcolor,
  setfontsize,
  setfontalign,
  textFilters,
  fontsize,
}) => {
  //historystate for undo and redo
  const [history, setHistory] = React.useState([""]);
  const [historyPointer, setHistoryPointer] = React.useState(0);

  useEffect(() => {
    setHistoryPointer(history.length - 1);
  }, [history]);

  //Menubuttonstate for fontstyle
  const [styleEl, setStyleEl] = React.useState(null);
  const openStyle = Boolean(styleEl);
  const handleStyleClick = (event) => {
    setStyleEl(event.currentTarget);
  };
  const handleStyleClose = () => {
    setStyleEl(null);
  };
  //Menubuttonstate for fontcolor
  const [colorEl, setColorEl] = React.useState(null);
  const openColor = Boolean(colorEl);
  const handleColorClick = (event) => {
    setColorEl(event.currentTarget);
  };
  const handleColorClose = () => {
    setColorEl(null);
  };
  //Menubuttonstate for fontsize
  const [sizeEl, setSizeEl] = React.useState(null);
  const openSize = Boolean(sizeEl);
  const handleSizeClick = (event) => {
    setSizeEl(event.currentTarget);
  };
  const handleSizeClose = () => {
    setSizeEl(null);
  };
  //Menubuttonstate for alignment
  const [alignmentEl, setAlignmentEl] = React.useState(null);
  const openAlignment = Boolean(alignmentEl);
  const handleAlignmentClick = (event) => {
    setAlignmentEl(event.currentTarget);
  };
  const handleAlignmentClose = () => {
    setAlignmentEl(null);
  };
  //Menubuttonstate for icons
  const [iconsEl, setIconsEl] = React.useState(null);
  const openIcons = Boolean(iconsEl);
  const handleIconsClick = (event) => {
    setIconsEl(event.currentTarget);
  };
  const handleIconsClose = () => {
    setIconsEl(null);
  };

  //Calculation of maximal Rows of Text (Text limit)
  const [maxRows, setMaxRows] = React.useState(16);
  const [maxLength, setMaxLength] = React.useState(100);
  useEffect(() => {
    if (fontsize == 16) {
      setMaxRows(18);
    } else if (fontsize == 20) {
      setMaxRows(17);
    } else if (fontsize == 25) {
      setMaxRows(15);
    } else if (fontsize == 32) {
      setMaxRows(12);
    } else {
      setMaxRows(16);
    }
  }, [fontsize]);

  return (
    <Box sx={{ flexGrow: 1, flexShrink: 1 }}>
      <Typography fontStyle="Annie Use Your Telescope">
        <AppBar style={styles.stepbar}>
          <Toolbar>
            <IconButton sx={{ mr: 2 }} style={styles.kreis}>
              2.
            </IconButton>
            <Typography fontSize={"30px"}>Create card text</Typography>
          </Toolbar>
        </AppBar>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          direction="column"
          spacing={3}
          marginTop="10px"
        >
          <Grid item xs={12}>
            <Box sx={styles.adjusttext}>
              <Typography sx={styles.textadjust}>Adjust your Text</Typography>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                mt="30px"
                alignContent="center"
              >
                <Grid item style={styles.text1} xs={2}>
                  <div>Style</div>
                </Grid>
                <Grid item style={styles.text1} xs={2}>
                  <div>Color</div>
                </Grid>
                <Grid item style={styles.text1} xs={2}>
                  <div>Size</div>
                </Grid>
                <Grid item style={styles.text1} xs={2}>
                  <div>Alignment</div>
                </Grid>
                <Grid item style={styles.text1} xs={2}>
                  <div>Icons</div>
                </Grid>
                <Grid item style={styles.text1} xs={1}>
                  <div>Undo</div>
                </Grid>
                <Grid item style={styles.text1} xs={1}>
                  <div>Redo</div>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    id="style-button"
                    aria-controls={openStyle ? "style-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openStyle ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={(event) => {
                      setStyleEl(event.currentTarget);
                    }}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Choose
                  </Button>
                  <StyledMenu
                    id="style-menu"
                    MenuListProps={{
                      "aria-labelledby": "style-button",
                    }}
                    anchorEl={styleEl}
                    open={openStyle}
                    onClose={() => {
                      setStyleEl(null);
                    }}
                  >
                    <MenuItem
                      onClick={() => {
                        setfontstyle("Times New Roman");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      Times New Roman
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setfontstyle("Annie Use Your Telescope");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      Romantic
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setfontstyle("Arial");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      Arial
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setfontstyle("Monaco");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      Monaco
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setfontstyle("Courier New");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      Courier New
                    </MenuItem>
                  </StyledMenu>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    id="color-button"
                    aria-controls={openColor ? "color-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openColor ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleColorClick}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Choose
                  </Button>
                  <StyledMenu
                    id="color-menu"
                    MenuListProps={{
                      "aria-labelledby": "color-button",
                    }}
                    anchorEl={colorEl}
                    open={openColor}
                    onClose={handleColorClose}
                  >
                    <MenuItem
                      onClick={() => {
                        setfontcolor("black");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      Black
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setfontcolor("blue");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      Blue
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setfontcolor("red");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      Red
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setfontcolor("coral");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      Coral
                    </MenuItem>
                  </StyledMenu>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    id="size-button"
                    aria-controls={openSize ? "size-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openSize ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleSizeClick}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Choose
                  </Button>
                  <StyledMenu
                    id="size-menu"
                    MenuListProps={{
                      "aria-labelledby": "size-button",
                    }}
                    anchorEl={sizeEl}
                    open={openSize}
                    onClose={handleSizeClose}
                  >
                    <MenuItem
                      onClick={() => {
                        setfontsize("16");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      Extra Small
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setfontsize("20");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      Small
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setfontsize("25");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      Medium
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setfontsize("32");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      Large
                    </MenuItem>
                  </StyledMenu>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    id="alignment-button"
                    aria-controls={openAlignment ? "alignment-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openAlignment ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleAlignmentClick}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Choose
                  </Button>
                  <StyledMenu
                    id="alignment-menu"
                    MenuListProps={{
                      "aria-labelledby": "alignment-button",
                    }}
                    anchorEl={alignmentEl}
                    open={openAlignment}
                    onClose={handleAlignmentClose}
                  >
                    <MenuItem
                      onClick={() => {
                        setfontalign("left");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      <FormatAlignLeftIcon />
                      Left
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setfontalign("center");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      <FormatAlignJustifyIcon />
                      Middle
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setfontalign("right");
                        setStyleEl(null);
                      }}
                      disableRipple
                    >
                      <FormatAlignRightIcon />
                      Right
                    </MenuItem>
                  </StyledMenu>
                </Grid>
                <Grid item xs={2}>
                  <Button
                    id="icons-button"
                    aria-controls={openIcons ? "icons-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openIcons ? "true" : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleIconsClick}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    Choose
                  </Button>
                  <StyledMenu
                    id="icons-menu"
                    MenuListProps={{
                      "aria-labelledby": "icons-button",
                    }}
                    anchorEl={iconsEl}
                    open={openIcons}
                    onClose={handleIconsClose}
                  >
                    <MenuItem
                      onClick={() => {
                        setText(text + "💖");
                        setStyleEl(null);
                        let newHistoryStates = [...history];
                        if (newHistoryStates.length - 1 > historyPointer) {
                          newHistoryStates = newHistoryStates.slice(
                            0,
                            historyPointer + 1
                          );
                        }
                        newHistoryStates.push(text + "💖");
                        setHistory(newHistoryStates);
                      }}
                      disableRipple
                    >
                      💖 Heart
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setText(text + "😊");
                        setStyleEl(null);
                        let newHistoryStates = [...history];
                        if (newHistoryStates.length - 1 > historyPointer) {
                          newHistoryStates = newHistoryStates.slice(
                            0,
                            historyPointer + 1
                          );
                        }
                        newHistoryStates.push(text + "😊");
                        setHistory(newHistoryStates);
                      }}
                      disableRipple
                    >
                      😊 Happy
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setText(text + "😥");
                        setStyleEl(null);
                        let newHistoryStates = [...history];
                        if (newHistoryStates.length - 1 > historyPointer) {
                          newHistoryStates = newHistoryStates.slice(
                            0,
                            historyPointer + 1
                          );
                        }
                        newHistoryStates.push(text + "😥");
                        setHistory(newHistoryStates);
                      }}
                      disableRipple
                    >
                      😥 Sad
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setText(text + "🌞");
                        setStyleEl(null);
                        let newHistoryStates = [...history];
                        if (newHistoryStates.length - 1 > historyPointer) {
                          newHistoryStates = newHistoryStates.slice(
                            0,
                            historyPointer + 1
                          );
                        }
                        newHistoryStates.push(text + "🌞");
                        setHistory(newHistoryStates);
                      }}
                      disableRipple
                    >
                      🌞 Sun
                    </MenuItem>
                  </StyledMenu>
                </Grid>
                <Grid item xs={1}>
                  <RotateLeftIcon
                    onClick={() => {
                      let newValue = historyPointer - 1;
                      //if (history[newValue] instanceof String)
                      if (newValue >= 0) {
                        setText(history[newValue]);
                        setHistoryPointer(newValue);
                      }
                      //else { }
                    }}
                  />
                </Grid>
                <Grid item xs={1}>
                  <RotateRightIcon
                    onClick={() => {
                      let newValue = historyPointer + 1;
                      if (newValue < history.length) {
                        setText(history[newValue]);
                        setHistoryPointer(newValue);
                      }
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Type your text here"
              variant="outlined"
              multiline={true}
              style={styles.textWindow}
              onChange={(event) => {
                setText(event.target.value);
              }}
              onKeyUp={(event) => {
                if (event.key === " " || event.key === "Enter") {
                  let newHistoryStates = [...history];
                  if (newHistoryStates.length - 1 > historyPointer) {
                    newHistoryStates = newHistoryStates.slice(
                      0,
                      historyPointer + 1
                    );
                  }
                  newHistoryStates.push(event.target.value);
                  setHistory(newHistoryStates);
                }
              }}
              value={text || ""}
              rows={18}
              type="text"
              inputProps={{
                style: textFilters,
                lineHeight: "1",
                maxLength: maxLength,
                overflow: "auto",
                maxRows: maxRows,
              }}
            ></TextField>
          </Grid>
        </Grid>
      </Typography>
    </Box>
  );
};

export default CreateText;
