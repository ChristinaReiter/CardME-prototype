import React, { useEffect, useState } from "react";
import {
  Box,
  FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

const HeaderStyleBox = ({index, styleFilter, setStyleFilter, filterIsHovering}) => {


        //function to update the checked filter options
        const updateStyleArray = (styleKey, event) => {
          setStyleFilter({ ...styleFilter, [styleKey]: event.target.checked });
        };
        

        //only show box when user hovers over filter
        if (filterIsHovering != index) {
          return <Box disabled></Box>;
        } else {
          return (
            <Box
              style={{
                position: "absolute",
                width: 300,
                height: 200,
                top: "70px",
                left: "28%",
                background: "rgba(167, 205,	167, 0.8)",
                zIndex: 1,
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", paddingLeft: "5%" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingRight: "15%",
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={styleFilter.simple}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateStyleArray("simple", e);
                      }}
                      label="Simple"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={styleFilter.cartoon}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateStyleArray("cartoon", e);
                      }}
                      label="Cartoon"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={styleFilter.handdrawn}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateStyleArray("handdrawn", e);
                      }}
                      label="Handdrawn"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={styleFilter.stylized}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateStyleArray("stylized", e);
                      }}
                      label="Stylized"
                    ></FormControlLabel>
                  </FormGroup>
                </div>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={styleFilter.text}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateStyleArray("text", e);
                      }}
                      label="Text"
                    ></FormControlLabel>
                  </FormGroup>
                </div>
              </div>
            </Box>
          );
        }
      }

export default HeaderStyleBox;