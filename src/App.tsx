/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";

import Board from "./components/Board";

import { Piece, PieceType, Color, Move, CastlingRights } from "./interfaces";
import {
	isMoveCastling,
	positionFromFEN,
	evaluateMaterialAdvantage,
} from "./GameLogic";
import { getNegamaxMove, getRandomMove } from "./AI";

let board: (Piece | null)[] = [];

/* for (let file = 0; file < 8; file++) {
	for (let rank = 0; rank < 8; rank++) {
		board[file + 8 * rank] = null;
	}
} */

const startingFEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

board = positionFromFEN(startingFEN);

function App() {
	const [boardState, setBoardState] = useState(board);
	const [currentPlayer, setCurrentPlayer] = useState(Color.White);
	const [castlingRights, setCastlingRights] = useState<CastlingRights>({
		whiteShort: true,
		whiteLong: true,
		blackShort: true,
		blackLong: true,
	});

	useEffect(() => {
		if (currentPlayer == Color.Black) {
			computerMakeMove();
		}
	}, [currentPlayer]);

	const makeMove = (move: Move) => {
		let tempBoardState: (Piece | null)[] = [...boardState];
		let draggedPiece = tempBoardState[move.fromSquare];
		tempBoardState[move.fromSquare] = null;
		tempBoardState[move.toSquare] = draggedPiece;

		// Check for castling
		if (boardState[move.fromSquare]?.type == PieceType.King) {
			let rookMove: Move | undefined = isMoveCastling(move);
			if (rookMove) {
				let rook = tempBoardState[rookMove.fromSquare];
				tempBoardState[rookMove.fromSquare] = null;
				tempBoardState[rookMove.toSquare] = rook;
			}

			// Remove castling rights if king has moved
			let newCastlingRights = { ...castlingRights };
			if (currentPlayer == Color.White) {
				newCastlingRights.whiteShort = false;
				newCastlingRights.whiteLong = false;
			} else {
				newCastlingRights.blackShort = false;
				newCastlingRights.blackLong = false;
			}

			setCastlingRights(newCastlingRights);
		}

		// Remove castling rights if rook moved
		if (boardState[move.fromSquare]?.type == PieceType.Rook) {
			let newCastlingRights = { ...castlingRights };
			if (currentPlayer == Color.White) {
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

			setCastlingRights(newCastlingRights);
		}

		// Remove castling rights if rook taken
		if (boardState[move.toSquare]?.type == PieceType.Rook) {
			let newCastlingRights = { ...castlingRights };
			if (boardState[move.toSquare]?.color == Color.White) {
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

			setCastlingRights(newCastlingRights);
		}

		// Change current player
		if (currentPlayer == Color.White) setCurrentPlayer(Color.Black);
		else setCurrentPlayer(Color.White);
		// Update board state
		setBoardState(tempBoardState);
	};

	const computerMakeMove = () => {
		let computerMove = getNegamaxMove(boardState, castlingRights);

		if (!computerMove) return;

		makeMove(computerMove);
	};

	return (
		<main>
			<Board
				boardState={boardState}
				currentPlayer={currentPlayer}
				castlingRights={castlingRights}
				onMakeMove={makeMove}
			/>
			<InfoSection>
				<p>
					Current player: {currentPlayer == Color.White ? "white" : "black"}
				</p>
				<p>
					Material advantage:{" "}
					{evaluateMaterialAdvantage(boardState, Color.White)}
				</p>
			</InfoSection>
		</main>
	);
}

const InfoSection = styled.div`
	padding: 50px;
`;

export default App;
