import {
	generateLegalMoves,
	generatePseudoLegalMoves,
	evaluateMaterialAdvantage,
	makeMove,
} from "./GameLogic";
import { Move, GameState } from "./interfaces";

export const getRandomMove = (gameState: GameState) => {
	let legalMoves = generateLegalMoves(gameState);

	const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];

	return randomMove;
};

export const getNegamaxMove = async (
	gameState: GameState
): Promise<Move | undefined> => {
	let positionCounter: number = 0;

	const negaMax = (gameState: GameState, depth: number): number => {
		positionCounter++;

		if (depth === 0) {
			return evaluateMaterialAdvantage(
				gameState.boardState,
				gameState.currentPlayer
			);
		}

		let max = Number.NEGATIVE_INFINITY;
		let movesToEvaluate = generateLegalMoves(gameState);
		movesToEvaluate.forEach((move) => {
			let score = -negaMax(makeMove(gameState, move), depth - 1);
			if (score > max) max = score;
		});

		return max;
	};

	let bestMovesWithScores: { move: Move; score: number }[] = [];
	let bestMoveScore: number = Number.POSITIVE_INFINITY;
	let allLegalMoves: Move[] = generateLegalMoves(gameState);

	if (allLegalMoves.length === 0) {
		console.log("Game over");
		return Promise.resolve(undefined);
	}

	let startTime: number, endTime: number;
	startTime = Date.now();

	// Get the best move relative to all the previous moves evaluated
	allLegalMoves.forEach((move) => {
		let moveScore = negaMax(makeMove(gameState, move), 3);
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
		({ move, score }) => score === bestMoveScore
	);

	endTime = Date.now();
	let timeDiff = endTime - startTime; //in ms

	console.log("Checking " + positionCounter + " moves");
	console.log("That took " + timeDiff + "ms");

	if (bestMovesWithScores.length === 0) return Promise.resolve(undefined);

	return Promise.resolve(
		bestMovesWithScores[Math.floor(Math.random() * bestMovesWithScores.length)]
			.move
	);
};
