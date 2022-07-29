import React, { useEffect, useState } from "react";
import {
    Box,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

const GiftsHeaderSizeBox = ({index, giftSizeFilter, setGiftSizeFilter, filterIsHovering}) => {

        //function to update the checked filter options
        const updateSizeArray = (sizeKey, event) => {
          setGiftSizeFilter({ ...giftSizeFilter, [sizeKey]: event.target.checked });
        };
        
        //only show the options when the user hovers over the header
        if (filterIsHovering != index) {
          return <Box disabled></Box>;
        } else {
          return (
            <Box
              style={{
                position: "absolute",
                width: "25%",
                height: 100,
                top: "70px",
                left: "0%",
                background: "rgba(167, 205,	167, 0.8)",
                zIndex: 1,
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", paddingLeft: "10%", paddingTop: "1%" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    paddingRight: "35%",
                  }}
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={giftSizeFilter.smallerfive}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSizeArray("smallerfive", e);
                      }}
                      label="< 5cm"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={giftSizeFilter.fivetoten}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSizeArray("fivetoten", e);
                      }}
                      label="5-10cm"
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
                          checked={giftSizeFilter.tentotwentyfive}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSizeArray("tentotwentyfive", e);
                      }}
                      label="10-25cm"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={giftSizeFilter.biggertwentyfive}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSizeArray("biggertwentyfive", e);
                      }}
                      label="> 25cm"
                    ></FormControlLabel>
                  </FormGroup>
                </div>
              </div>
            </Box>
          );
        }
      }

export default GiftsHeaderSizeBox;