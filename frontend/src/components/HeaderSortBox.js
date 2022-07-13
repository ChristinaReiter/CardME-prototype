import React, { useEffect, useState } from "react";
import {
  Box,
  FormGroup,
    FormControlLabel,
    Checkbox,
} from "@mui/material";

const HeaderSortBox = ({index, sortFilter, setSortFilter, filterIsHovering}) => {

        const updateSortArray = (sortKey, event) => {
          setSortFilter({ ...sortFilter, [sortKey]: event.target.checked });
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
                left: "85%",
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
                          checked={sortFilter.mostpopular}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSortArray("mostpopular", e);
                      }}
                      label="Most Popular"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={sortFilter.trending}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSortArray("trending", e);
                      }}
                      label="Trending"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={sortFilter.titlesort}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSortArray("titlesort", e);
                      }}
                      label="Title A-Z"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={sortFilter.titleUpsidedown}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSortArray("titleUpsidedown", e);
                      }}
                      label="Title Z-A"
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
                          checked={sortFilter.Newest}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSortArray("newest", e);
                      }}
                      label="Newest"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={sortFilter.oldest}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSortArray("oldest", e);
                      }}
                      label="Oldest"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={sortFilter.designersort}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSortArray("designersort", e);
                      }}
                      label="Designer A-Z"
                    ></FormControlLabel>
                  </FormGroup>
                  <FormGroup>
                    <FormControlLabel
                      value="end"
                      control={
                        <Checkbox
                          style={{ color: "black", "&$checked": "black" }}
                          checked={sortFilter.designerUpsitedown}
                        ></Checkbox>
                      }
                      onChange={(e) => {
                        updateSortArray("designerupsidedown", e);
                      }}
                      label="Designer Z-A"
                    ></FormControlLabel>
                  </FormGroup>
                </div>
              </div>
            </Box>
          );
        }
      }

export default HeaderSortBox;