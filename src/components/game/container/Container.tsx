import { connect } from "react-redux";
import React from "react";
import { Store } from "../../../types/types";
import Cell from "../cell/Cell";
import Letters from "../letters/Letters";
import Numbers from "../numbers/Numbers";
import { CellType } from "../../../types/types";
import './container.css';


const Container = ({ cells }: { cells: [CellType[]] }) => {

    return (
        <div className="container">
            <Letters />
            <div className="flex mx-auto container-row">
                <Numbers />
                <div className="flex inner-container flex-wrap mx-auto border-2 border-black place-content-around">
                    {cells.map(row => row.map((cell, index) => <Cell color={cell.backgroundColor} key={index + cell.backgroundColor} />))}
                </div>
                <Numbers />
            </div>
            <Letters />
        </div>
    )
}

const mapStateToProps = (state: Store) => ({ cells: state.cellReducer });

export default connect(mapStateToProps)(Container);