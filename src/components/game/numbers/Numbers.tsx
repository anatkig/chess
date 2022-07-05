import React from "react";
import './numbers.css';

const Numbers = () => {
    return (
        <div className="flex flex-col place-content-around numbers">
            {[...Array(8)].map((_, index) => <div className="text-center flex place-content-center items-center mx-px number">{index + 1}</div>)}
        </div>
    )
}

export default Numbers;