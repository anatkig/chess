import React from "react";
import Queen from "../../pieces/Queen";
import King from "../../pieces/King";
import Pawn from "../../pieces/Pawn";
import Bishop from "../../pieces/Bishop";
import Rook from "../../pieces/Rook";
import Knight from "../../pieces/Knight";
import './piece.css';


const Piece = ({ type, color }: { type: string, color: string }) => {
    return (
        <div className="flex place-content-center piece">{
            type === "knight" ? <Knight color={color} /> :
                type === "queen" ? <Queen color={color} /> :
                    type === "king" ? <King color={color} /> :
                        type === "rook" ? <Rook color={color} /> :
                            type === "bishop" ? <Bishop color={color} /> : <Pawn color={color} />

        }</div>
    )
}

export default Piece;