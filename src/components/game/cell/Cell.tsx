import React from "react";
import './cell.css';

const Cell = ({ color }: { color: String }) => {
    return (
        <div className={`${color === "white" ? "bg-white" : "bg-black"}  cell`} />
    )
}

export default Cell;