import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null; // No pagination needed if there's only one page

  return (
    <div
      className="flex justify-center mt-4"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "10px",
      }}
    >
      <MuiPagination
        count={totalPages}
        page={currentPage}
        onChange={(event, value) => onPageChange(value)}
        color="success" // Using the green color theme
        shape="circle" // Makes the pagination buttons circular
        variant="outlined"
        sx={{
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "green", // Ensure selected button is green
            color: "white", // Make text white on selection
          },
        }}
      />
    </div>
  );
}

export default Pagination;
