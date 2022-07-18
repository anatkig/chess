import React from "react";

const Numbers = () => {
    return (
        <div className="flex flex-col place-content-around rotate-180 numbers">
            {[...Array(8)].map((_, index) => index).reverse().map((index) => <div className="text-center w-[30px] h-[70px] flex place-content-center items-center mx-px number" key={index}>{index + 1}</div>)}
        </div>
    )
}

export default Numbers;