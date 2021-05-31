export enum PieceType {
	King,
	Queen,
	Rook,
	Bishop,
	Knight,
	Pawn,
}

export enum Color {
	White,
	Black,
}

export interface Piece {
	type: PieceType;
	color: Color;
}

export interface Move {
	fromSquare: number;
	toSquare: number;
}

export interface CastlingRights {
	whiteShort: boolean;
	whiteLong: boolean;
	blackShort: boolean;
	blackLong: boolean;
}
