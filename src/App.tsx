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
	isMoveCastling,
	gameStateFromFEN,
	evaluateMaterialAdvantage,
	FENFromGameState,
} from "./GameLogic";
import { getNegamaxMove, getRandomMove } from "./AI";

import rookImg from "./images/rook_w.svg";

let board: (Piece | null)[] = [];

/* for (let file = 0; file < 8; file++) {
	for (let rank = 0; rank < 8; rank++) {
		board[file + 8 * rank] = null;
	}
} */

//const startingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
const startingFEN =
	"rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2 ";

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

	const makeMove = (move: Move) => {
		let tempBoardState: (Piece | null)[] = [...gameState.boardState];
		let draggedPiece = tempBoardState[move.fromSquare];
		tempBoardState[move.fromSquare] = null;
		tempBoardState[move.toSquare] = draggedPiece;

		// Check for castling
		if (gameState.boardState[move.fromSquare]?.type == PieceType.King) {
			let rookMove: Move | undefined = isMoveCastling(move);
			if (rookMove) {
				let rook = tempBoardState[rookMove.fromSquare];
				tempBoardState[rookMove.fromSquare] = null;
				tempBoardState[rookMove.toSquare] = rook;
			}

			// Remove castling rights if king has moved
			let newCastlingRights = { ...gameState.castlingRights };
			if (gameState.currentPlayer == Color.White) {
				newCastlingRights.whiteShort = false;
				newCastlingRights.whiteLong = false;
			} else {
				newCastlingRights.blackShort = false;
				newCastlingRights.blackLong = false;
			}

			setGameState((prevState) => ({
				...prevState,
				castlingRights: newCastlingRights,
			}));
		}

		// Remove castling rights if rook moved
		if (gameState.boardState[move.fromSquare]?.type == PieceType.Rook) {
			let newCastlingRights = { ...gameState.castlingRights };
			if (gameState.currentPlayer == Color.White) {
				if (move.fromSquare == 0) {
					newCastlingRights.whiteLong = false;
				} else if (move.fromSquare == 7) {
					newCastlingRights.whiteShort = false;
				}
			} else {
				if (move.fromSquare == 56) {
					newCastlingRights.blackLong = false;
				} else if (move.fromSquare == 63) {
					newCastlingRights.blackShort = false;
				}
			}

			setGameState((prevState) => ({
				...prevState,
				castlingRights: newCastlingRights,
			}));
		}

		// Remove castling rights if rook taken
		if (gameState.boardState[move.toSquare]?.type == PieceType.Rook) {
			let newCastlingRights = { ...gameState.castlingRights };
			if (gameState.boardState[move.toSquare]?.color == Color.White) {
				if (move.toSquare == 0) {
					newCastlingRights.whiteLong = false;
				} else if (move.toSquare == 7) {
					newCastlingRights.whiteShort = false;
				}
			} else {
				if (move.toSquare == 56) {
					newCastlingRights.blackLong = false;
				} else if (move.toSquare == 63) {
					newCastlingRights.blackShort = false;
				}
			}

			setGameState((prevState) => ({
				...prevState,
				castlingRights: newCastlingRights,
			}));
		}

		// Change current player
		if (gameState.currentPlayer == Color.White)
			setGameState((prevState) => ({
				...prevState,
				currentPlayer: Color.Black,
			}));
		else
			setGameState((prevState) => ({
				...prevState,
				currentPlayer: Color.White,
			}));

		// Update board state
		setGameState((prevState) => ({ ...prevState, boardState: tempBoardState }));

		// Set new last move
		setLastMove(move);
	};

	const computerMakeMove = () => {
		let computerMove = getNegamaxMove(
			gameState.boardState,
			gameState.castlingRights
		);

		if (!computerMove) return;

		makeMove(computerMove);
	};

	return (
		<main>
			<Board
				boardState={gameState.boardState}
				currentPlayer={gameState.currentPlayer}
				castlingRights={gameState.castlingRights}
				lastMove={lastMove}
				onMakeMove={makeMove}
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
				<img src={rookImg} />
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
