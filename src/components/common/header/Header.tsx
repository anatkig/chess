import React from "react";
import './header.css';
import { ReactComponent as Knight } from "../../../assets/Chess-Knight.svg";

const Header = () => {
    return (
        <div className="bg-red-700 py-1 pl-5 flex gap-x-4 border-2 header">
            <div className="w-8 header-piece"><Knight /></div>
            <span className="text-4xl text-white font-bold self-end header-text">Chess</span>
        </div >
    )
}

export default Header;