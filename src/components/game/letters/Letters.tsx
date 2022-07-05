import React from "react";
import './letters.css';

const Letters = () => {
    return (
        <div className="flex mx-auto letters">
            {[...Array(8)].map((_, index) => <div className="text-center mx-px letter">{String.fromCharCode(97 + index)}</div>)}
        </div>)
}

export default Letters;