import {
	generateLegalMoves,
	generatePseudoLegalMoves,
	evaluateMaterialAdvantage,
	makeMove,
} from "./GameLogic";
import { Move, GameState, Color } from "./interfaces";

export const getRandomMove = async (gameState: GameState) => {
	let legalMoves = generateLegalMoves(gameState);

	const randomMove = legalMoves[Math.floor(Math.random() * legalMoves.length)];

	return randomMove;
};

export const getNegamaxMove = (gameState: GameState) => {
	const depth = 4;
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
		for (const move of movesToEvaluate) {
			let score: number = negaMax(makeMove(gameState, move), depth - 1) * -1;
			if (score > max) max = score;
		}

		return max;
	};

	let bestMovesWithScores: { move: Move; score: number }[] = [];
	let bestMoveScore: number = Number.POSITIVE_INFINITY;
	let allLegalMoves: Move[] = generateLegalMoves(gameState);

	if (allLegalMoves.length === 0) {
		console.log("Game over");
		return undefined;
	}

	let startTime: number, endTime: number;
	startTime = Date.now();

	// Get the best move relative to all the previous moves evaluated
	for (const move of allLegalMoves) {
		let moveScore: number = negaMax(makeMove(gameState, move), depth - 1);
		if (moveScore <= bestMoveScore) {
			bestMoveScore = moveScore;
			bestMovesWithScores.push({
				move: move,
				score: moveScore,
			});
		}
	}

	// Only keep the best moves
	bestMovesWithScores = bestMovesWithScores.filter(
		({ move, score }) => score === bestMoveScore
	);

	endTime = Date.now();
	let timeDiff = endTime - startTime; //in ms

	console.log("Checking " + positionCounter + " moves");
	console.log("That took " + timeDiff + "ms");

	if (bestMovesWithScores.length === 0) return undefined;

	return bestMovesWithScores[
		Math.floor(Math.random() * bestMovesWithScores.length)
	].move;
};

export const getAlphaBetaMove = (gameState: GameState): Move | undefined => {
	const depth = 3;

	let positionCounter = 0;

	const alphaBeta = (
		gameState: GameState,
		alpha: number,
		beta: number,
		depth: number
	) => {
		positionCounter++;

		if (depth == 0) {
			return evaluateMaterialAdvantage(
				gameState.boardState,
				gameState.currentPlayer
			);
		}

		let movesToEvaluate = generateLegalMoves(gameState);
		for (const move of movesToEvaluate) {
			let score: number =
				alphaBeta(makeMove(gameState, move), -1 * beta, -1 * alpha, depth - 1) *
				-1;
			if (score >= beta) return beta; //  fail hard beta-cutoff
			if (score > alpha) alpha = score; // alpha acts like max in MiniMax
		}

		return alpha;
	};

	let bestMovesWithScores: { move: Move; score: number }[] = [];
	let bestMoveScore: number = Number.POSITIVE_INFINITY;
	let allLegalMoves: Move[] = generateLegalMoves(gameState);

	let startTime: number, endTime: number;
	startTime = Date.now();

	// Get the best move relative to all the previous moves evaluated
	for (const move of allLegalMoves) {
		let moveScore: number = alphaBeta(
			makeMove(gameState, move),
			Number.NEGATIVE_INFINITY,
			Number.POSITIVE_INFINITY,
			depth
		);
		if (moveScore <= bestMoveScore) {
			bestMoveScore = moveScore;
			bestMovesWithScores.push({
				move: move,
				score: moveScore,
			});
		}
	}

	// Only keep the best moves
	bestMovesWithScores = bestMovesWithScores.filter(
		({ move, score }) => score === bestMoveScore
	);

	endTime = Date.now();
	let timeDiff = endTime - startTime; //in ms

	console.log("Checking " + positionCounter + " moves");
	console.log("That took " + timeDiff + "ms");

	if (bestMovesWithScores.length == 0) {
		return undefined;
	}

	return bestMovesWithScores[
		Math.floor(Math.random() * bestMovesWithScores.length)
	].move;
};
