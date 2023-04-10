import React from "react";
import "./Pagination.css";

function Pagination({ onPageChange, currentPage }) {
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(currentPage - 1)}>&lt;</button>

      <button onClick={() => onPageChange(1)}>1</button>
      <button onClick={() => onPageChange(2)}>2</button>
      <button onClick={() => onPageChange(3)}>3</button>

      <button onClick={() => onPageChange(currentPage + 1)}>&gt;</button>
    </div>
  );
}

export default Pagination;
