/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";

import Board from "./components/Board";

import {
	Piece,
	PieceType,
	Color,
	Move,
	CastlingRights,
	GameState,
} from "./interfaces";
import {
	makeMove,
	isMoveCastling,
	gameStateFromFEN,
	evaluateMaterialAdvantage,
	FENFromGameState,
} from "./GameLogic";
import { getNegamaxMove, getRandomMove } from "./AI";

let board: (Piece | null)[] = [];

/* for (let file = 0; file < 8; file++) {
	for (let rank = 0; rank < 8; rank++) {
		board[file + 8 * rank] = null;
	}
} */

//const startingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const startingFEN =
	"rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2 ";

console.log("Initial game state:");
console.log(gameStateFromFEN(startingFEN));

function App() {
	const [gameState, setGameState] = useState<GameState>(
		gameStateFromFEN(startingFEN)
	);
	const [lastMove, setLastMove] = useState<Move | null>(null);

	useEffect(() => {
		console.log(FENFromGameState(gameState));
		console.log(gameState);
		if (gameState.currentPlayer == Color.Black) {
			computerMakeMove();
		}
	}, [gameState]);

	const callMakeMove = (move: Move) => {
		const newGameState = makeMove(gameState, move);
		setGameState(newGameState);

		// Set new last move
		setLastMove(move);
	};

	const computerMakeMove = () => {
		let computerMove = getNegamaxMove(gameState);

		if (!computerMove) return;

		callMakeMove(computerMove);
	};

	return (
		<main>
			<Board
				gameState={gameState}
				lastMove={lastMove}
				onMakeMove={callMakeMove}
			/>
			<InfoSection>
				<p>
					Current player:{" "}
					{gameState.currentPlayer == Color.White ? "white" : "black"}
				</p>
				<p>
					Material advantage:{" "}
					{evaluateMaterialAdvantage(gameState.boardState, Color.White)}
				</p>
				<div
					style={{
						backgroundImage: "url(images/rook_w.svg)",
						width: "100px",
						height: "100px",
					}}
				></div>
			</InfoSection>
		</main>
	);
}

const InfoSection = styled.div`
	padding: 50px;
`;

export default App;
