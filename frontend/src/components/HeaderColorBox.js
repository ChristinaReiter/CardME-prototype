import React, { useEffect, useState } from "react";
import {
  Box,
  FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

const HeaderColorBox = ({index, colorFilter, setColorFilter, filterIsHovering}) => {
        

        const updateColorArray = (colorKey, event) => {
          setColorFilter({ ...colorFilter, [colorKey]: event.target.checked });
        };

        var positionIndex = "0px";
        if (index === 1) {
          positionIndex = "14%";
        }
        if (index === 2) {
          positionIndex = "28%";
        }
        if (index === 3) {
          positionIndex = "42%";
        }
        if (index === 4) {
          positionIndex = "56%";
        }
        if (index === 5) {
          positionIndex = "70%";
        }
        if (index === 6) {
          positionIndex = "85%";
        }
        
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
                left: "0px",
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
                          checked={colorFilter.red}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateColorArray("red", e);
                      }}
                      label="Red"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={colorFilter.yellow}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateColorArray("yellow", e);
                      }}
                      label="Yellow"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={colorFilter.orange}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateColorArray("orange", e);
                      }}
                      label="Orange"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={colorFilter.pink}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateColorArray("pink", e);
                      }}
                      label="Pink"
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
                          checked={colorFilter.blue}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateColorArray("blue", e);
                      }}
                      label="Blue"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={colorFilter.green}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateColorArray("green", e);
                      }}
                      label="Green"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={colorFilter.white}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateColorArray("white", e);
                      }}
                      label="White"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={colorFilter.violet}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateColorArray("violet", e);
                      }}
                      label="Violet"
                    ></FormControlLabel>
                  </FormGroup>
                </div>
              </div>
            </Box>
          );
        }
      }

export default HeaderColorBox;