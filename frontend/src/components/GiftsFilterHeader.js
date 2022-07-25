import React, { useEffect, useState } from "react";
import { 
    Box,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Table,
    TableCell,
    TableHead,
    TableRow,
    Typography
 } from "@mui/material";
 import FilterList from "@mui/icons-material/FilterList";
 import GiftHeaderSizeBox from "./GiftsHeaderSizeBox";
 import GiftsHeaderPriceBox from "./GiftsHeaderPriceBox";
 import HeaderOccasionBox from "./HeaderOccasionBox";
 import HeaderSortBox from "./HeaderSortBox";
 


const ProductsFilterHeader = ({
      giftSizeFilter, setGiftSizeFilter, 
      giftPriceFilter, setGiftPriceFilter, 
      occasionFilter, setOccasionFilter,
      sortFilter, setSortFilter}) => {
    const styles = {
        filterHeader: {
          display: "flex",
          alignItems: "center",
          justifyContent: "start",
          borderRight: "1px solid",
          background: "#A7CDA7",
          "&:hover": {
            background: "#FF69B4",
          },
        },
        filterBar: {
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: 70,
          alignItems: "center",
          justifyContent: "center",
          background: "#A7CDA7",
          "&:hover": {
            background: "#FF69B4",
          },
          boxShadow:
            "0px 2px 4px rgba(51, 97, 50, 0.25), inset 0px 6px 4px rgba(51, 97, 50, 0.25)",
          top: "60px",
          zIndex: "1",
        },
    
        tableRow: {
            height: 70,
            display: "flex",
            flexDirection: "row",
            width: "100%",
          },
          tableCell: {
            borderRight: "1px solid",
            backgroundColor: "FF69B4",
            alignItems: "center",
            width: "100%",
            borderBottom: "none",
            background: "#A7CDA7",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "5px 10px",
            fontFamily: "Abril Fatface",
          },
          tableCellHover: {
            borderRight: "1px solid",
            background: "rgba(10, 81, 8, 0.61)",
            alignItems: "center",
            width: "100%",
            borderBottom: "none",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            padding: "5px 10px",
            fontFamily: "Abril Fatface",
          },
    }
    
     const [filterIsHovering, setFilterIsHovering] = useState(-1);
    
     function handleFilterMouseEnter(index) {
       setFilterIsHovering(index);
     }  
    
    
     

    // Header bar
    return(
        <Box position="fixed" style={styles.filterBar}>
          <Table>
            <TableHead>
              <TableRow style={styles.tableRow}>
                <TableCell
                  style={
                    filterIsHovering === 0
                      ? styles.tableCellHover
                      : styles.tableCell
                  }
                  onMouseEnter={() => handleFilterMouseEnter(0)}
                  onMouseLeave={() => handleFilterMouseEnter(-1)}
                >
                  <div>
                    <GiftHeaderSizeBox index={0} giftSizeFilter={giftSizeFilter} setGiftSizeFilter={setGiftSizeFilter} filterIsHovering={filterIsHovering}></GiftHeaderSizeBox>
                    <div>
                      <Typography variant="h7" style={{ fontSize: "20px" }}>
                        Size
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h7">All Sizes</Typography>
                    </div>
                  </div>
                  <div>
                    <FilterList style={{ alignContent: "right" }} />
                  </div>
                </TableCell>
                <TableCell
                  style={
                    filterIsHovering === 1
                      ? styles.tableCellHover
                      : styles.tableCell
                  }
                  onMouseEnter={() => handleFilterMouseEnter(1)}
                  onMouseLeave={() => handleFilterMouseEnter(-1)}
                >
                  <div>
                    <GiftsHeaderPriceBox index={1} giftPriceFilter={giftPriceFilter} setGiftPriceFilter={setGiftPriceFilter} filterIsHovering={filterIsHovering}></GiftsHeaderPriceBox>
                    <div>
                      <Typography variant="h7" style={{ fontSize: "20px" }}>
                        Price
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h7">All Prices</Typography>
                    </div>
                  </div>

                  <div>
                    <FilterList style={{ alignContent: "right" }} />
                  </div>
                </TableCell>
                <TableCell
                  style={
                    filterIsHovering === 2
                      ? styles.tableCellHover
                      : styles.tableCell
                  }
                  onMouseEnter={() => handleFilterMouseEnter(2)}
                  onMouseLeave={() => handleFilterMouseEnter(-1)}
                >
                  <div>
                    <HeaderOccasionBox index={2} gifts={true} occasionFilter={occasionFilter} setOccasionFilter={setOccasionFilter} filterIsHovering={filterIsHovering}></HeaderOccasionBox>
                    <div>
                      <Typography variant="h7" style={{ fontSize: "20px" }}>
                        Occasions
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h7">All Occasions</Typography>
                    </div>
                  </div>
                  <div>
                    <FilterList style={{ alignContent: "right" }} />
                  </div>
                </TableCell>
                <TableCell
                  style={
                    filterIsHovering === 5
                      ? styles.tableCellHover
                      : styles.tableCell
                  }
                  onMouseEnter={() => handleFilterMouseEnter(5)}
                  onMouseLeave={() => handleFilterMouseEnter(-1)}
                >
                  <div>
                    <HeaderSortBox index={5} gifts={true} sortFilter={sortFilter} setSortFilter={setSortFilter} filterIsHovering={filterIsHovering}></HeaderSortBox>
                    <div>
                      <Typography variant="h7" style={{ fontSize: "20px" }}>
                        Sort By
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h7">Trending</Typography>
                    </div>
                  </div>
                  <div>
                    <FilterList style={{ alignContent: "right" }} />
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </Box>
    );
     
    
}
export default ProductsFilterHeader;