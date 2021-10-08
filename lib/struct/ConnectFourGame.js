"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectFourGame = void 0;
const chalk_1 = __importDefault(require("chalk"));
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const Board_1 = __importDefault(require("./Board"));
const Piece_1 = __importDefault(require("./Piece"));
const Player_1 = __importDefault(require("./Player"));
const prompt = prompt_sync_1.default({ sigint: true });
class ConnectFourGame {
    constructor() {
        this.board = new Board_1.default();
        this.players = {
            red: new Player_1.default(Piece_1.default.Red, chalk_1.default.red, "Red"),
            yellow: new Player_1.default(Piece_1.default.Yellow, chalk_1.default.yellow, "Yellow")
        };
        this.turn = this.players.red;
    }
    run() {
        while (true) {
            console.log(this.board.format());
            console.log(this.turn.colorFn(`${this.turn.colorName}'s turn`) + chalk_1.default.reset(':'));
            let col = prompt('> ');
            while (!this.board.checkMove(parseInt(col) - 1)) {
                console.log(this.board.format());
                console.log('Invalid move! ' + this.turn.colorFn(`${this.turn.colorName}'s turn`) + chalk_1.default.reset(':'));
                col = prompt('> ');
            }
            this.board.addPiece(this.turn.piece, parseInt(col) - 1);
            if (this.board.checkWin(this.turn.piece)) {
                console.log(this.board.format());
                console.log(this.turn.colorFn(`${this.turn.colorName} Won!!`));
                break;
            }
            if (this.board.checkTie()) {
                console.log(this.board.format());
                console.log("It's a Tie");
                break;
            }
            if (this.turn === this.players.red) {
                this.turn = this.players.yellow;
            }
            else {
                this.turn = this.players.red;
            }
        }
    }
}
exports.ConnectFourGame = ConnectFourGame;
