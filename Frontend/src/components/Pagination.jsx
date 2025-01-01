import React from "react";
import { Pagination as MuiPagination } from "@mui/material";

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null; 

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
        color="success" 
        shape="circle" 
        variant="outlined"
        sx={{
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "green",
            color: "white",
          },
        }}
      />
    </div>
  );
}

export default Pagination;
