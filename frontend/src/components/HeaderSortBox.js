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

const HeaderSortBox = ({index, gifts, sortFilter, setSortFilter, filterIsHovering, setSortLabel}) => {
        
    //sort is used by gifts and cards
    const styles = {
          radio: {
            color: "black",
            '&.MuiChecked': {
              color: "black",
            },
          },
          giftBox: {
            position: "absolute",
            width: "25%",
            height: 200,
            top: "70px",
            left: "75%",
            background: "rgba(167, 205,	167, 0.8)",
            zIndex: 1,
          },
          cardBox: {
            position: "absolute",
            width: 300,
            height: 200,
            top: "70px",
            left: "85%",
            background: "rgba(167, 205,	167, 0.8)",
            zIndex: 1,
          },
        }

        //options to render with cards
        const RenderWhenNoGift = () => {
          if (!gifts) {
            return (
              <><FormControlLabel
                value="designerA"
                control={<Radio
                  style={styles.radio}
                  checked={sortFilter === "designera"} />}
                onChange={(e) => {
                  updateSortArray("designera", e);
                  setSortLabel("Designer A-Z");
                } }
                label="Designer A-Z">
              </FormControlLabel>
              <FormControlLabel
                value="designerZ"
                control={<Radio
                  style={styles.radio}
                  checked={sortFilter === "designerz"} />}
                onChange={(e) => {
                  updateSortArray("designerz", e);
                  setSortLabel("Designer Z-A");
                } }
                label="Designer Z-A">
                </FormControlLabel></>
            )
          }
        }


        //function to update the checked filter options
        const updateSortArray = (sortKey, event) => {
          setSortFilter(sortKey);
        };
        

        //only show box when user hovers over filter
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
                  <FormControl>
                    <RadioGroup
                      row
                      defaultValue={"trending"}
                      name={"sort by group"}                     
                    >
                      <div style={{ display: "flex", flexDirection: "column"}}>
              
                        <FormControlLabel 
                          value="mostpopular" 
                          control={
                          <Radio 
                            style={styles.radio} 
                            checked={sortFilter === "mostpopular"}
                          />} 
                          onChange={(e) => {
                            updateSortArray("mostpopular", e);
                            setSortLabel("Most Popular");
                          }}
                          label="Most Popular">
                        </FormControlLabel>
                        <FormControlLabel 
                          value="titleA" 
                          control={
                          <Radio 
                            style={styles.radio} 
                            checked={sortFilter === "titlea"}
                          /> } 
                          onChange={(e) => {
                            updateSortArray("titlea", e);
                            setSortLabel("Title A-Z");
                          }}
                          label="Title A-Z">
                        </FormControlLabel>
                        <FormControlLabel 
                          value="titleZ" 
                          control={
                          <Radio 
                            style={styles.radio} 
                            checked={sortFilter === "titlez"}
                          />} 
                          onChange={(e) => {
                            updateSortArray("titlez", e);
                            setSortLabel("Title Z-A");
                          }}
                          label="Title Z-A">
                        </FormControlLabel>
                        <FormControlLabel 
                          value="oldest" 
                          control={
                          <Radio 
                            style={styles.radio} 
                            checked={sortFilter === "oldest"}
                          />} 
                          onChange={(e) => {
                            updateSortArray("oldest", e);
                            setSortLabel("Oldest");
                          }}
                          label="Oldest">
                        </FormControlLabel>
                      </div>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <FormControlLabel 
                          value="newest" 
                          control={
                          <Radio 
                            style={styles.radio} 
                            checked={sortFilter === "newest"}
                          />} 
                          onChange={(e) => {
                            updateSortArray("newest", e);
                            setSortLabel("Newest");
                          }}
                          label="Newest">
                        </FormControlLabel>
                        <RenderWhenNoGift />
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