import React, { useEffect, useState } from "react";
import {
  Box,
  FormGroup,
  FormControlLabel,
  Checkbox,
  RadioGroup,
  Radio,
  FormControl,
} from "@mui/material";

const HeaderSortBox = ({index, sortFilter, setSortFilter, filterIsHovering}) => {

        const styles = {
          radio: {
            color: "black",
            '&.MuiChecked': {
              color: "black",
            },
          },
        }


        const updateSortArray = (sortKey, event) => {
          
          setSortFilter({ ...sortFilter, [sortKey]: event.target.checked });

          /*Object.keys(sortFilter).map((key) => {
            if (key !== sortKey) {
              setSortFilter({...sortFilter, [key]: !event.target.checked});
            }
            console.log("key: " + sortKey) //only the first is updated in the array, the others are not
          })*/
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
                  <FormControl>
                    <RadioGroup
                      row
                      defaultValue={"trending"}
                      name={"sort by group"}
                      
                    >
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <FormControlLabel 
                          value="trending" 
                          control={
                          <Radio 
                            style={styles.radio} 
                            checked={sortFilter.trending}
                          />} 
                          onChange={(e) => {
                            updateSortArray("trending", e);
                          }}
                          label="Trending"></FormControlLabel>
                        <FormControlLabel 
                          value="mostpopular" 
                          control={
                          <Radio 
                            style={styles.radio} 
                            checked={sortFilter.mostpopular}
                          />} 
                          onChange={(e) => {
                            updateSortArray("mostpopular", e);
                          }}
                          label="Most Popular">
                        </FormControlLabel>
                        <FormControlLabel 
                          value="titleA" 
                          control={
                          <Radio 
                            style={styles.radio} 
                            checked={sortFilter.titlea}
                          /> } 
                          onChange={(e) => {
                            updateSortArray("titlea", e);
                          }}
                          label="Title A-Z">
                        </FormControlLabel>
                        <FormControlLabel 
                          value="titleZ" 
                          control={
                          <Radio 
                            style={styles.radio} 
                            checked={sortFilter.titlez}
                          />} 
                          onChange={(e) => {
                            updateSortArray("titlez", e);
                          }}
                          label="Title Z-A">
                        </FormControlLabel>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <FormControlLabel 
                          value="oldest" 
                          control={
                          <Radio 
                            style={styles.radio} 
                            checked={sortFilter.oldest}
                          />} 
                          onChange={(e) => {
                            updateSortArray("oldest", e);
                          }}
                          label="Oldest">
                        </FormControlLabel>
                        <FormControlLabel 
                          value="newest" 
                          control={
                          <Radio 
                            style={styles.radio} 
                            checked={sortFilter.newest}
                          />} 
                          onChange={(e) => {
                            updateSortArray("newest", e);
                          }}
                          label="Newest">
                        </FormControlLabel>
                        <FormControlLabel 
                          value="designerA" 
                          control={
                          <Radio 
                            style={styles.radio} 
                            checked={sortFilter.designera}
                          />} 
                          onChange={(e) => {
                            updateSortArray("designera", e);
                          }}
                          label="Designer A-Z">
                        </FormControlLabel>
                        <FormControlLabel 
                          value="designerZ" 
                          control={
                          <Radio 
                            style={styles.radio} 
                            checked={sortFilter.designerz}
                          />}
                          onChange={(e) => {
                            updateSortArray("designerz", e);
                          }}
                          label="Designer Z-A">
                        </FormControlLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </Box>
          );
        }
      }

export default HeaderSortBox;