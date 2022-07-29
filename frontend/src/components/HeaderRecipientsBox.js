import React, { useEffect, useState } from "react";
import {
  Box,
  FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

const HeaderRecipientsBox = ({index, recipientsFilter, setRecipientsFilter, filterIsHovering}) => {


        //function to update the checked filter options
        const updateRecipientsArray = (recipientsKey, event) => {
          setRecipientsFilter({ ...recipientsFilter, [recipientsKey]: event.target.checked });
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
                left: "42%",
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
                          checked={recipientsFilter.mother}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateRecipientsArray("mother", e);
                      }}
                      label="Mother"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={recipientsFilter.father}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateRecipientsArray("father", e);
                      }}
                      label="Father"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={recipientsFilter.son}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateRecipientsArray("son", e);
                      }}
                      label="Son"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={recipientsFilter.daughter}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateRecipientsArray("daughter", e);
                      }}
                      label="Dautgher"
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
                          checked={recipientsFilter.forher}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateRecipientsArray("forher", e);
                      }}
                      label="For her"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={recipientsFilter.forhim}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateRecipientsArray("forhim", e);
                      }}
                      label="For him"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={recipientsFilter.husband}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateRecipientsArray("husband", e);
                      }}
                      label="Husband"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={recipientsFilter.wife}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateRecipientsArray("wife", e);
                      }}
                      label="Wife"
                    ></FormControlLabel>
                  </FormGroup>
                </div>
              </div>
            </Box>
          );
        }
      }

export default HeaderRecipientsBox;