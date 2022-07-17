import React, { useEffect, useState } from "react";
import {
  Box,
  FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

const HeaderVibeBox = ({index, vibeFilter, setVibeFilter, filterIsHovering}) => {

        const updateVibeArray = (vibeKey, event) => {
          setVibeFilter({ ...vibeFilter, [vibeKey]: event.target.checked });
        };
        
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
                left: "14%",
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
                          checked={vibeFilter.playful}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateVibeArray("playful", e);
                      }}
                      label="Playful"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={vibeFilter.elegant}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateVibeArray("elegant", e);
                      }}
                      label="Elegant"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={vibeFilter.funny}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateVibeArray("funny", e);
                      }}
                      label="Funny"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={vibeFilter.warm}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateVibeArray("warm", e);
                      }}
                      label="Warm"
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
                          checked={vibeFilter.cold}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateVibeArray("cold", e);
                      }}
                      label="Cold"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={vibeFilter.sincere}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateVibeArray("sincere", e);
                      }}
                      label="Sincere"
                    ></FormControlLabel>
                  </FormGroup>
                </div>
              </div>
            </Box>
          );
        }
      }

export default HeaderVibeBox;