/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import { useState, useEffect } from "react";

import Board from "./components/Board";
import GameInfo from "./components/GameInfo";

import { Color, Move, GameState, PieceType, Piece } from "./interfaces";
import { makeMove, gameStateFromFEN, promotePawn } from "./GameLogic";
import { getNegamaxMove } from "./AI";
import PromotionModal from "./components/PromotionModal";

//const startingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const startingFEN =
	"rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2 ";

const promotionFEN = "k7/7P/8/8/8/8/p7/7K w - - 2 20";

function App() {
	const [gameState, setGameState] = useState<GameState>(
		gameStateFromFEN(promotionFEN)
	);
	const [lastMove, setLastMove] = useState<Move | null>(null);
	const [isPromotionModalShowing, setIsPromotionModalShowing] = useState(false);
	const [squareToPromote, setSquareToPromote] = useState<number | null>(null);

	useEffect(() => {
		const computerMakeMove = async () => {
			getNegamaxMove(gameState).then((computerMove) => {
				console.log("Negamax move : " + computerMove);
				if (!computerMove) return;
				callMakeMove(computerMove);
			});
		};
		if (gameState.currentPlayer === Color.Black) {
			computerMakeMove();
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
		</Wrapper>
	);
}

const Wrapper = styled.main`
	display: grid;
	grid-template-columns: 1fr 3fr 1fr;
	padding: 40px;
`;

export default App;
