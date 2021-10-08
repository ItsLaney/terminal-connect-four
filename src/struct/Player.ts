import chalk from "chalk";
import Piece from "./Piece";

type ColorString = "Yellow"|"Red";

export default class Player {
    private _piece: Piece;
    public get piece(): Piece {
        return this._piece;
    }
    
    private _colorFn: chalk.ChalkFunction;
    public get colorFn(): chalk.ChalkFunction {
        return this._colorFn;
    }

    private _colorName: ColorString;
    public get colorName(): ColorString {
        return this._colorName;
    }

    constructor(piece: Piece, colorFn: chalk.ChalkFunction, colorName: ColorString) {
        this._piece = piece;
        this._colorFn = colorFn;
        this._colorName = colorName;
    }
} 