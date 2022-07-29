import React, { useEffect, useState } from "react";
import {
    Box,
    FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

const GiftsHeaderPriceBox = ({index, giftPriceFilter, setGiftPriceFilter, filterIsHovering}) => {

        //function to update the checked filter options
        const updatePriceArray = (priceKey, event) => {
          setGiftPriceFilter({ ...giftPriceFilter, [priceKey]: event.target.checked });
        };
        
        //only show the box when the user hovers over it
        if (filterIsHovering != index) {
          return <Box disabled></Box>;
        } 
        else {
          return (
            <Box
              style={{
                position: "absolute",
                width: "25%",
                height: 100,
                top: "70px",
                left: "25%",
                background: "rgba(167, 205,	167, 0.8)",
                zIndex: 1,
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "row", paddingLeft: "10%", paddingTop: "1%"}}
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
                          checked={giftPriceFilter.lessthantwo}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updatePriceArray("lessthantwo", e);
                      }}
                      label="< 2€"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={giftPriceFilter.twotofive}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updatePriceArray("twotofive", e);
                      }}
                      label="2-5€"
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
                          checked={giftPriceFilter.fivetotene}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updatePriceArray("fivetotene", e);
                      }}
                      label="5-10€"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={giftPriceFilter.biggerthanten}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updatePriceArray("biggerthanten", e);
                      }}
                      label="> 10€"
                    ></FormControlLabel>
                  </FormGroup>
                </div>
              </div>
            </Box>
          );
        }
      }

export default GiftsHeaderPriceBox;