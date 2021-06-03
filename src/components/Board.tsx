/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useState } from "react";
import styled from "@emotion/styled";

import { Piece, PieceType, Color, Move, GameState } from "../interfaces";

import { generateLegalMoves } from "../GameLogic";

type PropTypes = {
	gameState: GameState;
	lastMove: Move | null;
	onMakeMove: (move: Move) => void;
};

const Board = ({ gameState, lastMove, onMakeMove }: PropTypes) => {
	const [markedLegalMoveSquares, setMarkedLegalMoveSquares] = useState<
		number[]
	>([]);

	const boardTiles: React.ReactNode = gameState.boardState.map(
		(piece, index) => {
			return (
				<Square
					key={index}
					isLight={
						!(Math.floor(index / 8) % 2 !== 0
							? index % 2 !== 0
							: index % 2 === 0)
					}
					row={8 - Math.floor(index / 8)}
					image={getImageForPiece(piece)}
					onDragOver={(e) => onDragOver(e)}
					onDrop={(e) => onDrop(e, index)}
					isMarkedLegal={markedLegalMoveSquares.includes(index)}
					isMarkedLastMove={
						lastMove?.fromSquare === index || lastMove?.toSquare === index
					}
				>
					{piece ? (
						piece.color === gameState.currentPlayer ? (
							<div
								draggable
								onDragStart={(e) =>
									onDragStart(e, index, getImageForPiece(piece))
								}
								onDragEnd={(e) => onDragEnd(e)}
							></div>
						) : (
							<div></div>
						)
					) : null}
				</Square>
			);
		}
	);

	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const onDragStart = (e: React.DragEvent, tilePos: number, piece: string) => {
		(e.currentTarget as HTMLElement).style.opacity = "0";
		e.dataTransfer.setData("tilePosition", tilePos.toString());
		let dragImage = new Image();
		dragImage.src = `chess-ai/images/${piece}.svg`;

		e.dataTransfer.setDragImage(dragImage, 45, 45);

		let allLegalMoves = generateLegalMoves(gameState);

		setMarkedLegalMoveSquares(
			allLegalMoves
				.filter(({ fromSquare, toSquare }) => fromSquare === tilePos)
				.map(({ fromSquare, toSquare }) => toSquare)
		);
	};

	const onDragEnd = (e: React.DragEvent) => {
		(e.currentTarget as HTMLElement).style.opacity = "1";
		setMarkedLegalMoveSquares([]);
	};

	const onDrop = (e: React.DragEvent, tilePosition: number) => {
		if (markedLegalMoveSquares.includes(tilePosition)) {
			let move: Move = {
				fromSquare: parseInt(e.dataTransfer.getData("tilePosition")),
				toSquare: tilePosition,
			};
			onMakeMove(move);
			setMarkedLegalMoveSquares([]);
		}
	};

	return <Chessboard>{boardTiles}</Chessboard>;
};

const Chessboard = styled.div`
	width: 500px;
	height: 500px;
	background-color: green;
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: repeat(8, 1fr);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

type SquareProps = {
	row: number;
	isLight: boolean;
	isMarkedLegal: boolean;
	isMarkedLastMove: boolean;
	image: string;
};

const Square = styled.div<SquareProps>`
	position: relative;
	display: grid;
	place-items: center;
	grid-row: ${(props) => props.row};
	width: 100%;
	height: 100%;
	background-color: ${(props) => (props.isLight ? "#f6edcd" : "#f0cf8e")};
	color: black;

	::after {
		content: "";
		position: absolute;
		width: 85%;
		height: 85%;
		border: 2px solid #5ca099;
		opacity: ${(props) => (props.isMarkedLegal ? 1 : 0)};
		pointer-events: none;
		z-index: 2;
	}

	::before {
		content: "";
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #a8c8a6;
		opacity: ${(props) => (props.isMarkedLastMove ? 0.9 : 0)};
		pointer-events: none;
		z-index: 0;
	}

	div {
		width: 80%;
		height: 80%;
		background-image: ${(props) => `url("chess-ai/images/${props.image}.svg")`};
		background-size: cover;
		z-index: 1;
	}
`;

const getImageForPiece = (piece: Piece | null): string => {
	if (piece == null) return "";
	switch (piece.type) {
		case PieceType.King: {
			if (piece.color === Color.Black) return "king_b";
			return "king_w";
		}
		case PieceType.Queen: {
			if (piece.color === Color.Black) return "queen_b";
			return "queen_w";
		}
		case PieceType.Rook: {
			if (piece.color === Color.Black) return "rook_b";
			return "rook_w";
		}
		case PieceType.Bishop: {
			if (piece.color === Color.Black) return "bishop_b";
			return "bishop_w";
		}
		case PieceType.Knight: {
			if (piece.color === Color.Black) return "knight_b";
			return "knight_w";
		}
		case PieceType.Pawn: {
			if (piece.color === Color.Black) return "pawn_b";
			return "pawn_w";
		}
		default:
			return "";
	}
};

export default Board;
