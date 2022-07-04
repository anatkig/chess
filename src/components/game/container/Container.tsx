import { connect } from "react-redux";
import React from "react";
import { Store } from "../../../types/types";
import Cell from "../cell/Cell";
import { CellType } from "../../../types/types";
import './container.css';


const Container = ({ cells }: { cells: [CellType[]] }) => {

    return (
        <div className="flex container flex-wrap mx-auto my-4 border-2 border-black place-content-around">
            {cells.map(row => row.map((cell, index) => <Cell color={cell.backgroundColor} key={index + cell.backgroundColor} />))}
        </div>
    )
}

const mapStateToProps = (state: Store) => ({ cells: state.cellReducer });

export default connect(mapStateToProps)(Container);