import React from "react";
import './cell.css';

const Cell = ({ color }: { color: String }) => {
    return (
        <div className={`${color === "white" ? "bg-[#E2BB7B]" : "bg-[#AE734E]"}  cell`} />
    )
}

export default Cell;