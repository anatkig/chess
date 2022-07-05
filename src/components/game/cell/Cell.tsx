import React, { ReactElement } from "react";
import './cell.css';

const Cell = ({ color, children }: { color: String, children?: ReactElement }) => {
    return (
        <div className={`${color === "white" ? "bg-[#E2BB7B]" : "bg-[#AE734E]"} flex place-items-center justify-center cell`} >{children}</div>
    )
}

export default Cell;