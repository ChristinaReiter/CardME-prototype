import React, { useEffect, useState } from "react";
import { 
    Box,
    Table,
    TableCell,
    TableHead,
    TableRow,
    Typography
 } from "@mui/material";
 import FilterList from "@mui/icons-material/FilterList";
 import HeaderColorBox from "./HeaderColorBox";
 import HeaderVibeBox from "./HeaderVibeBox";
 import HeaderStyleBox from "./HeaderStyleBox";
 import HeaderRecipientsBox from "./HeaderRecipientsBox";
 import HeaderOccasionBox from "./HeaderOccasionBox";
 import HeaderSeasonBox from "./HeaderSeasonBox";
 import HeaderSortBox from "./HeaderSortBox";
 


const CardsFilterHeader = ({
      colorFilter, setColorFilter, 
      vibeFilter, setVibeFilter, 
      styleFilter, setStyleFilter, 
      recipientsFilter, setRecipientsFilter, 
      occasionFilter, setOccasionFilter,
      seasonFilter, setSeasonFilter,
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
                    <HeaderColorBox index={0} colorFilter={colorFilter} setColorFilter={setColorFilter} filterIsHovering={filterIsHovering}></HeaderColorBox>
                    <div>
                      <Typography variant="h7" style={{ fontSize: "20px" }}>
                        Color
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h7">All Colors</Typography>
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
                    <HeaderVibeBox index={1} vibeFilter={vibeFilter} setVibeFilter={setVibeFilter} filterIsHovering={filterIsHovering}></HeaderVibeBox>
                    <div>
                      <Typography variant="h7" style={{ fontSize: "20px" }}>
                        Vibes
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h7">All Vibes</Typography>
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
                    <HeaderStyleBox index={2} styleFilter={styleFilter} setStyleFilter={setStyleFilter} filterIsHovering={filterIsHovering}></HeaderStyleBox>
                    <div>
                      <Typography variant="h7" style={{ fontSize: "20px" }}>
                        Styles
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h7">All Styles</Typography>
                    </div>
                  </div>
                  <div>
                    <FilterList style={{ alignContent: "right" }} />
                  </div>
                </TableCell>
                <TableCell
                  style={
                    filterIsHovering === 3
                      ? styles.tableCellHover
                      : styles.tableCell
                  }
                  onMouseEnter={() => handleFilterMouseEnter(3)}
                  onMouseLeave={() => handleFilterMouseEnter(-1)}
                >
                  <div>
                    <HeaderRecipientsBox index={3} recipientsFilter={recipientsFilter} setRecipientsFilter={setRecipientsFilter} filterIsHovering={filterIsHovering}></HeaderRecipientsBox>
                    <div>
                      <Typography variant="h7" style={{ fontSize: "20px" }}>
                        Recipients
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h7">All Recipients</Typography>
                    </div>
                  </div>
                  <div>
                    <FilterList style={{ alignContent: "right" }} />
                  </div>
                </TableCell>
                <TableCell
                  style={
                    filterIsHovering === 4
                      ? styles.tableCellHover
                      : styles.tableCell
                  }
                  onMouseEnter={() => handleFilterMouseEnter(4)}
                  onMouseLeave={() => handleFilterMouseEnter(-1)}
                >
                  <div>
                    <HeaderOccasionBox index={4} gifts={false} occasionFilter={occasionFilter} setOccasionFilter={setOccasionFilter} filterIsHovering={filterIsHovering}></HeaderOccasionBox>
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
                    <HeaderSeasonBox index={5} seasonFilter={seasonFilter} setSeasonFilter={setSeasonFilter} filterIsHovering={filterIsHovering}></HeaderSeasonBox>
                    <div>
                      <Typography variant="h7" style={{ fontSize: "20px" }}>
                        Season
                      </Typography>
                    </div>
                    <div>
                      <Typography variant="h7">All Seasons</Typography>
                    </div>
                  </div>
                  <div>
                    <FilterList style={{ alignContent: "right" }} />
                  </div>
                </TableCell>
                <TableCell
                  style={
                    filterIsHovering === 6
                      ? styles.tableCellHover
                      : styles.tableCell
                  }
                  onMouseEnter={() => handleFilterMouseEnter(6)}
                  onMouseLeave={() => handleFilterMouseEnter(-1)}
                >
                  <div>
                    <HeaderSortBox index={6} gifts={false} sortFilter={sortFilter} setSortFilter={setSortFilter} filterIsHovering={filterIsHovering}></HeaderSortBox>
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
export default CardsFilterHeader;