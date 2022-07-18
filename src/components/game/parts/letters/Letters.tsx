import React from "react";

const Letters = () => {
    return (
        <div className="flex mx-auto letters w-[580px] h-[30px] rotate-180">
            {[...Array(8)].map((_, index) => <div className="text-center mx-px letter w-[70px]" key={index}>{String.fromCharCode(97 + index)}</div>)}
        </div>)
}

export default Letters;