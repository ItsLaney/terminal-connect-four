"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(piece, colorFn, colorName) {
        this._piece = piece;
        this._colorFn = colorFn;
        this._colorName = colorName;
    }
    get piece() {
        return this._piece;
    }
    get colorFn() {
        return this._colorFn;
    }
    get colorName() {
        return this._colorName;
    }
}
exports.default = Player;
