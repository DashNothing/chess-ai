import { Move } from "./interfaces";

// First 4 are orthogonal, last 4 are diagonals (N, S, W, E, NW, SE, NE, SW)
const directionOffsets = [8, -8, -1, 1, 7, -7, 9, -9];

let numSquaresToEdge: [number[]] = [[]];

let rookMoves: Move[] = [];
let kingMoves: [number[]] = [[]];
let knightMoves: [number[]] = [[]];
let pawnCapturesWhite: [number[]] = [[]];
let pawnCapturesBlack: [number[]] = [[]];

for (let squareIndex = 0; squareIndex < 64; squareIndex++) {
	let y: number = Math.floor(squareIndex / 8);
	let x: number = squareIndex - y * 8;

	let north: number = 7 - y;
	let south: number = y;
	let west: number = x;
	let east: number = 7 - x;

	numSquaresToEdge[squareIndex] = [];

	numSquaresToEdge[squareIndex][0] = north;
	numSquaresToEdge[squareIndex][1] = south;
	numSquaresToEdge[squareIndex][2] = west;
	numSquaresToEdge[squareIndex][3] = east;
	numSquaresToEdge[squareIndex][4] = Math.min(north, west);
	numSquaresToEdge[squareIndex][5] = Math.min(south, east);
	numSquaresToEdge[squareIndex][6] = Math.min(north, east);
	numSquaresToEdge[squareIndex][7] = Math.min(south, west);

	// Rook moves
	for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
		let currentDirOffset = directionOffsets[directionIndex];
		for (let n = 0; n < numSquaresToEdge[squareIndex][directionIndex]; n++) {
			let targetSquare = squareIndex + currentDirOffset * (n + 1);
			rookMoves.push({ fromSquare: squareIndex, toSquare: targetSquare });
		}
	}

	// King moves
	let legalKingMoves: number[] = [];
	directionOffsets.forEach((kingMoveDelta) => {
		let kingMoveSquare: number = squareIndex + kingMoveDelta;
		// Check only moves within the bounds of the board
		if (kingMoveSquare >= 0 && kingMoveSquare < 64) {
			let kingMoveSquareY = Math.floor(kingMoveSquare / 8);
			let kingMoveSquareX = kingMoveSquare - kingMoveSquareY * 8;
			// Save only moves that didn't wrap around the board (where max move distance in any direction is 1)
			let maxMoveDistance = Math.max(
				Math.abs(x - kingMoveSquareX),
				Math.abs(y - kingMoveSquareY)
			);
			if (maxMoveDistance == 1) {
				legalKingMoves.push(kingMoveSquare);
			}
		}
	});

	kingMoves[squareIndex] = legalKingMoves;

	// Knight moves
	const allKnightJumps: number[] = [15, 17, -17, -15, 10, -6, 6, -10];
	let legalKnightJumps: number[] = [];
	allKnightJumps.forEach((knightJumpDelta) => {
		let knightJumpSquare = squareIndex + knightJumpDelta;
		// Check only moves within the bounds of the board
		if (knightJumpSquare >= 0 && knightJumpSquare < 64) {
			let knightJumpSquareY = Math.floor(knightJumpSquare / 8);
			let knightJumpSquareX = knightJumpSquare - knightJumpSquareY * 8;
			// Save only moves that didn't wrap around the board (where max move distance in any direction is 2)
			let maxMoveDistance = Math.max(
				Math.abs(x - knightJumpSquareX),
				Math.abs(y - knightJumpSquareY)
			);
			if (maxMoveDistance == 2) {
				legalKnightJumps.push(knightJumpSquare);
			}
		}
	});

	knightMoves[squareIndex] = legalKnightJumps;

	// Pawn captures
	// Calculate legal pawn captures for white and black
	let tempPawnCapturesWhite: number[] = [];
	let tempPawnCapturesBlack: number[] = [];
	if (x > 0) {
		if (y < 7) {
			tempPawnCapturesWhite.push(squareIndex + 7);
		}
		if (y > 0) {
			tempPawnCapturesBlack.push(squareIndex - 9);
		}
	}
	if (x < 7) {
		if (y < 7) {
			tempPawnCapturesWhite.push(squareIndex + 9);
		}
		if (y > 0) {
			tempPawnCapturesBlack.push(squareIndex - 7);
		}
	}

	pawnCapturesWhite[squareIndex] = tempPawnCapturesWhite;
	pawnCapturesBlack[squareIndex] = tempPawnCapturesBlack;
}

export {
	numSquaresToEdge,
	rookMoves,
	kingMoves,
	knightMoves,
	pawnCapturesBlack,
	pawnCapturesWhite,
};
