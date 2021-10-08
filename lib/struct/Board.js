"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const Piece_1 = __importDefault(require("./Piece"));
class Board {
    constructor() {
        this.rows = 6;
        this.cols = 7;
        this.state = [...new Array(this.rows)].map(_ => [...new Array(this.cols)].map(_ => Piece_1.default.Empty));
        this.lastMove = {
            row: 0,
            col: 0
        };
    }
    addPiece(piece, colNum) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.state[row][colNum] === Piece_1.default.Empty) {
                this.state[row][colNum] = piece;
                this.lastMove = { row, col: colNum };
                return true;
            }
        }
        return false;
    }
    checkMove(colNum) {
        if (colNum < 0 || colNum > this.cols - 1)
            return false;
        if (this.state[0][colNum] !== Piece_1.default.Empty)
            return false;
        return true;
    }
    format() {
        const r = chalk_1.default.red.bold;
        const y = chalk_1.default.yellow.bold;
        const e = chalk_1.default.grey;
        const boardDisplay = this.state.map((row) => {
            return row.map((piece) => {
                switch (piece) {
                    case Piece_1.default.Empty:
                        return e("•");
                    case Piece_1.default.Red:
                        return r("o");
                    case Piece_1.default.Yellow:
                        return y("o");
                }
            }).join(" ");
        }).join("\n");
        const boardHeader = "1 2 3 4 5 6 7";
        return boardHeader + "\n" + boardDisplay;
    }
    checkWin(piece) {
        if (this.checkSequence(this.getLine(1, 0), piece))
            return true;
        if (this.checkSequence(this.getLine(0, 1), piece))
            return true;
        if (this.checkSequence(this.getLine(1, 1), piece))
            return true;
        if (this.checkSequence(this.getLine(1, -1), piece))
            return true;
        return false;
    }
    checkTie() {
        return !this.state[0].includes(Piece_1.default.Empty);
    }
    getLine(rowStep, colStep) {
        const row = this.lastMove.row;
        const col = this.lastMove.col;
        const arr = [];
        for (let offset = -3; offset <= 3; offset++) {
            if (row + offset * rowStep < 0)
                continue;
            if (row + offset * rowStep >= this.rows)
                continue;
            if (col + offset * colStep < 0)
                continue;
            if (col + offset * colStep >= this.cols)
                continue;
            arr.push(this.state[row + offset * rowStep][col + offset * colStep]);
        }
        return arr;
    }
    checkSequence(sequence, piece) {
        let inARow = 0;
        for (let i = 0; i < sequence.length; i++) {
            if (sequence[i] === piece) {
                inARow++;
                if (inARow >= 4) {
                    return true;
                }
            }
            else {
                inARow = 0;
            }
        }
        return false;
    }
}
exports.default = Board;
