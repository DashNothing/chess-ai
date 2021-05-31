import {
	generateLegalMoves,
	generatePseudoLegalMoves,
	evaluateMaterialAdvantage,
	makeVirtualMove,
} from "./GameLogic";
import { Piece, PieceType, Color, Move, CastlingRights } from "./interfaces";

export const getRandomMove = (
	boardState: (Piece | null)[],
	castlingRights: CastlingRights
) => {
	let legalMoves = generateLegalMoves(boardState, Color.Black, castlingRights);

	const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];

	return randomMove;
};

export const getNegamaxMove = (
	boardState: (Piece | null)[],
	castlingRights: CastlingRights
): Move | undefined => {
	let positionCounter: number = 0;

	const negaMax = (
		currentBoardState: (Piece | null)[],
		depth: number,
		side: Color
	): number => {
		positionCounter++;

		if (depth == 0) {
			return evaluateMaterialAdvantage(currentBoardState, side);
		}

		let max = Number.NEGATIVE_INFINITY;
		let movesToEvaluate = generatePseudoLegalMoves(
			currentBoardState,
			side,
			castlingRights
		);
		movesToEvaluate.forEach((move) => {
			let score = -negaMax(
				makeVirtualMove(currentBoardState, move),
				depth - 1,
				side == Color.White ? Color.Black : Color.White
			);
			if (score > max) max = score;
		});

		return max;
	};

	let bestMovesWithScores: { move: Move; score: number }[] = [];
	let bestMoveScore: number = Number.POSITIVE_INFINITY;
	let allLegalMoves: Move[] = generatePseudoLegalMoves(
		boardState,
		Color.Black,
		castlingRights
	);

	if (allLegalMoves.length == 0) {
		console.log("Game over");
		return;
	}

	let startTime: number, endTime: number;
	startTime = Date.now();

	// Get the best move relative to all the previous moves evaluated
	allLegalMoves.forEach((move) => {
		let moveScore = negaMax(makeVirtualMove(boardState, move), 3, Color.White);
		if (moveScore <= bestMoveScore) {
			bestMoveScore = moveScore;
			bestMovesWithScores.push({
				move: move,
				score: moveScore,
			});
		}
	});

	// Only keep the best moves
	bestMovesWithScores = bestMovesWithScores.filter(
		({ move, score }) => score == bestMoveScore
	);

	endTime = Date.now();
	let timeDiff = endTime - startTime; //in ms

	console.log("Checking " + positionCounter + " moves");
	console.log("That took " + timeDiff + "ms");

	if (bestMovesWithScores.length == 0) return;

	return bestMovesWithScores[
		Math.floor(Math.random() * bestMovesWithScores.length)
	].move;
};
