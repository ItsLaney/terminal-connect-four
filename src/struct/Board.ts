import chalk from "chalk"
import Piece from "./Piece";

export default class Board {
    private rows = 6;
    private cols = 7;
    private state: Piece[][];
    private lastMove: {
        row: number,
        col: number
    };

    constructor() {
        this.state = [...new Array(this.rows)].map(_ => [...new Array(this.cols)].map(_ => Piece.Empty));
        this.lastMove = {
            row: 0,
            col: 0
        };
    }

    public addPiece(piece: Piece, colNum: number) {
        for (let row = this.rows - 1; row >= 0; row--) {
            if (this.state[row][colNum] === Piece.Empty) {
                this.state[row][colNum] = piece;
                this.lastMove = { row, col: colNum };
                return true;
            }
        }
        return false;
    }

    public checkMove(colNum: number) {
        if (colNum < 0 || colNum > this.cols - 1) return false;
        if (this.state[0][colNum] !== Piece.Empty) return false;
        return true;
    }

    public format() {
        const r = chalk.red.bold;
        const y = chalk.yellow.bold;
        const e = chalk.grey;

        const boardDisplay = this.state.map((row) => {
            return row.map((piece) => {
                switch (piece) {
                    case Piece.Empty:
                        return e("•");
                    case Piece.Red:
                        return r("o");
                    case Piece.Yellow:
                        return y("o");
                }
            }).join(" ");
        }).join("\n");

        const boardHeader = "1 2 3 4 5 6 7";

        return boardHeader + "\n" + boardDisplay;
    }

    public checkWin(piece: Piece) {
        if (this.checkSequence(this.getLine(1, 0), piece)) return true;
        if (this.checkSequence(this.getLine(0, 1), piece)) return true;
        if (this.checkSequence(this.getLine(1, 1), piece)) return true;
        if (this.checkSequence(this.getLine(1, -1), piece)) return true;
        return false;
    }

    public checkTie() {
        return !this.state[0].includes(Piece.Empty)

    }

    private getLine(rowStep: number, colStep: number) {
        const row = this.lastMove!.row
        const col = this.lastMove!.col
        const arr = [];
        for (let offset = -3; offset <= 3; offset++) {
            if (row + offset * rowStep < 0) continue;
            if (row + offset * rowStep >= this.rows) continue;
            if (col + offset * colStep < 0) continue;
            if (col + offset * colStep >= this.cols) continue;
            arr.push(this.state[row + offset * rowStep][col + offset * colStep]);
        }
        return arr;
    }

    private checkSequence(sequence: Piece[], piece: Piece) {
        let inARow = 0;
        for (let i = 0; i < sequence.length; i++) {
            if (sequence[i] === piece) {
                inARow++;
                if (inARow >= 4) {
                    return true;
                }
            } else {
                inARow = 0;
            }
        }

        return false;
    }
}