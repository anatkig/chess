import { connect } from "react-redux";
import React from "react";
import { Store } from "../../../types/types";
import Cell from "../cell/Cell";
import { CellType } from "../../../types/types";
import './container.css';


const Container = ({ cells }: { cells: [CellType[]] }) => {

    return (
        <div className="container">
            <div className="flex mx-auto letters">
                {[...Array(8)].map((_, index) => <div className="text-center mx-px letter">{String.fromCharCode(97 + index)}</div>)}
            </div>
            <div className="flex mx-auto container-row">
                <div className="flex flex-col place-content-around numbers">
                    {[...Array(8)].map((_, index) => <div className="text-center flex place-content-center items-center mx-px number">{index + 1}</div>)}
                </div>
                <div className="flex inner-container flex-wrap mx-auto border-2 border-black place-content-around">
                    {cells.map(row => row.map((cell, index) => <Cell color={cell.backgroundColor} key={index + cell.backgroundColor} />))}
                </div>
                <div className="flex flex-col  place-content-around numbers">
                    {[...Array(8)].map((_, index) => <div className="text-center flex place-content-center items-center mx-px number">{index + 1}</div>)}
                </div>
            </div>
            <div className="flex mx-auto letters">
                {[...Array(8)].map((_, index) => <div className="text-center mx-px letter">{String.fromCharCode(97 + index)}</div>)}
            </div>
        </div>
    )
}

const mapStateToProps = (state: Store) => ({ cells: state.cellReducer });

export default connect(mapStateToProps)(Container);