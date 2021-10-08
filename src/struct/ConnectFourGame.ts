import chalk from 'chalk';
import promptSync from 'prompt-sync';
import Board from './Board';
import Piece from './Piece';
import Player from './Player';

const prompt = promptSync({sigint: true})

export class ConnectFourGame {
    private board: Board;
    private turn: Player;
    private players: {
        red: Player, 
        yellow: Player
    };

    constructor() {
        this.board = new Board();
        this.players = {
            red: new Player(Piece.Red, chalk.red, "Red"),
            yellow: new Player(Piece.Yellow, chalk.yellow, "Yellow")
        };
        this.turn = this.players.red

    }

    public run() {
        while (true) {
            console.log(this.board.format());
            console.log(this.turn.colorFn(`${this.turn.colorName}'s turn`) + chalk.reset(':'));
            let col = prompt('> ');
            while (!this.board.checkMove(parseInt(col) - 1)) {
                console.log(this.board.format());
                console.log('Invalid move! ' + this.turn.colorFn(`${this.turn.colorName}'s turn`) + chalk.reset(':'));
                col = prompt('> ');
            }

            this.board.addPiece(this.turn.piece, parseInt(col) - 1)

            if (this.board.checkWin(this.turn.piece)) {
                console.log(this.board.format());
                console.log(this.turn.colorFn(`${this.turn.colorName} Won!!`))
                break;   
            }

            if (this.board.checkTie()) {
                console.log(this.board.format());
                console.log("It's a Tie")
                break;   
            }


            if (this.turn === this.players.red) {
                this.turn = this.players.yellow;
            } else {
                this.turn = this.players.red;
            }
            
            
        }
    } 
}