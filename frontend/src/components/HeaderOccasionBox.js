import React, { useEffect, useState } from "react";
import {
  Box,
  FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

const HeaderOccasionBox = ({index, gifts, occasionFilter, setOccasionFilter, filterIsHovering}) => {

  const styles = {
    giftBox: {
      position: "absolute",
      width: "25%",
      height: 200,
      top: "70px",
      left: "50%",
      background: "rgba(167, 205,	167, 0.8)",
      zIndex: 1,
    },
    cardBox: {
      position: "absolute",
      width: 300,
      height: 200,
      top: "70px",
      left: "56%",
      background: "rgba(167, 205,	167, 0.8)",
      zIndex: 1,
    },
  }

        const updateOccasionArray = (occasionKey, event) => {
          setOccasionFilter({ ...occasionFilter, [occasionKey]: event.target.checked });
        };

        if (filterIsHovering != index) {
          return <Box disabled></Box>;
        } else {
          return (
            <Box
              style={gifts? styles.giftBox : styles.cardBox}
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
                          checked={occasionFilter.birthday}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateOccasionArray("birthday", e);
                      }}
                      label="Birthday"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={occasionFilter.mothersday}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateOccasionArray("mothersday", e);
                      }}
                      label="Mother's Day"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={occasionFilter.celebration}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateOccasionArray("celebration", e);
                      }}
                      label="Celebration"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={occasionFilter.baby}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateOccasionArray("baby", e);
                      }}
                      label="Baby"
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
                          checked={occasionFilter.graduation}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateOccasionArray("graduation", e);
                      }}
                      label="Graduation"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={occasionFilter.grieving}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateOccasionArray("grieving", e);
                      }}
                      label="Grieving"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={occasionFilter.wedding}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateOccasionArray("wedding", e);
                      }}
                      label="Wedding"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={occasionFilter.promotion}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateOccasionArray("promotion", e);
                      }}
                      label="Promotion"
                    ></FormControlLabel>
                  </FormGroup>
                </div>
              </div>
            </Box>
          );
        }
      }

export default HeaderOccasionBox;