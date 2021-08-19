/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";
import useAsyncEffect from "use-async-effect";

import Board from "./components/Board";
import GameInfo from "./components/GameInfo";

import { Color, Move, GameState, PieceType, Piece } from "./interfaces";
import {
	makeMove,
	gameStateFromFEN,
	promotePawn,
	generateLegalMoves,
	getKingAttacks,
} from "./GameLogic";
import { getNegamaxMove, getAlphaBetaMove } from "./AI";
import PromotionModal from "./components/PromotionModal";
import GameOverModal from "./components/GameOverModal";

const startingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
//const startingFEN = "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2 ";

const promotionFEN = "k7/7P/8/8/8/8/p7/7K w - - 2 20";

const checkFEN = "8/2k2q2/8/5R2/2n5/5K2/8/8 w - - 2 20";

const checkmateFEN = "K7/8/1rq5/8/8/8/8/8 w - - 2 20";

const whiteCheckmateFEN = "k7/8/1R2Q3/8/8/8/8/8 w - - 2 20";

const castleCheckFEN = "8/q7/8/8/8/8/8/4K2R w KQkq - 2 20";

function App() {
	const [gameState, setGameState] = useState<GameState>(
		gameStateFromFEN(startingFEN)
	);
	const [lastMove, setLastMove] = useState<Move | null>(null);
	const [isPromotionModalShowing, setIsPromotionModalShowing] = useState(false);
	const [isGameOverModalShowing, setIsGameOverModalShowing] = useState(false);
	const [winner, setWinner] = useState<Color | null>(null);
	const [squareToPromote, setSquareToPromote] = useState<number | null>(null);

	useEffect(() => {
		// Check for checkmate and stalemates
		const responseMoves = generateLegalMoves(gameState);
		if (responseMoves.length === 0) {
			const kingAttacks = getKingAttacks(gameState);
			// checkmate
			if (kingAttacks.length > 0) {
				setWinner(
					gameState.currentPlayer == Color.White ? Color.Black : Color.White
				);
			}
			// stalemate, winner is null
			setIsGameOverModalShowing(true);
		}

		if (gameState.currentPlayer === Color.Black) {
			let computerMove: Move | undefined = getAlphaBetaMove(gameState);
			if (!computerMove) {
				setIsGameOverModalShowing(true);
				return;
			}
			callMakeMove(computerMove);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [gameState]);

	const callMakeMove = (move: Move) => {
		const newGameState = makeMove(gameState, move);

		// If new game state's current player is the same after making the move, the move is a promotion
		if (gameState.currentPlayer == newGameState.currentPlayer) {
			setSquareToPromote(move.toSquare);
			setIsPromotionModalShowing(true);
		}

		setGameState(newGameState);

		// Set new last move
		setLastMove(move);
	};

	const handlePromotionSelect = (selectedPiece: PieceType): void => {
		if (squareToPromote == null) return;
		let newGameState = promotePawn(gameState, squareToPromote, selectedPiece);

		setGameState(newGameState);
		setIsPromotionModalShowing(false);
	};

	const restart = () => {
		setGameState(gameStateFromFEN(startingFEN));
		setLastMove(null);
		setIsPromotionModalShowing(false);
		setIsGameOverModalShowing(false);
		setSquareToPromote(null);
		setWinner(null);
	};

	return (
		<Wrapper>
			<GameInfo gameState={gameState} />
			<Board
				gameState={gameState}
				lastMove={lastMove}
				onMakeMove={callMakeMove}
			/>
			<PromotionModal
				x={0}
				y={0}
				isShowing={isPromotionModalShowing}
				onSelect={handlePromotionSelect}
			/>
			<GameOverModal
				x={0}
				y={0}
				isShowing={isGameOverModalShowing}
				winner={winner}
				onRestart={restart}
			/>
		</Wrapper>
	);
}

const Wrapper = styled.main`
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
	padding: 40px;
`;

export default App;
