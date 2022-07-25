import React, { useEffect, useState } from "react";
import {
  Box,
  FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

const HeaderSeasonBox = ({index, seasonFilter, setSeasonFilter, filterIsHovering}) => {

        const updateSeasonArray = (seasonKey, event) => {
          setSeasonFilter({ ...seasonFilter, [seasonKey]: event.target.checked });
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
                left: "70%",
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
                          checked={seasonFilter.spring}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSeasonArray("spring", e);
                      }}
                      label="Spring"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={seasonFilter.summer}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSeasonArray("summer", e);
                      }}
                      label="Summer"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={seasonFilter.autumn}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSeasonArray("autumn", e);
                      }}
                      label="Autumn"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={seasonFilter.winter}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSeasonArray("winter", e);
                      }}
                      label="Winter"
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
                          checked={seasonFilter.christmas}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSeasonArray("christmas", e);
                      }}
                      label="Christmas"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={seasonFilter.easter}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSeasonArray("easter", e);
                      }}
                      label="Easter"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={seasonFilter.valentines}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSeasonArray("valentines", e);
                      }}
                      label="Valentine's Day"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={seasonFilter.newyear}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSeasonArray("newyear", e);
                      }}
                      label="New Year"
                    ></FormControlLabel>
                  </FormGroup>
                </div>
              </div>
            </Box>
          );
        }
      }

export default HeaderSeasonBox;