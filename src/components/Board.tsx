/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from "react";
import { jsx } from "@emotion/react";
import styled from "@emotion/styled";

import { Piece, PieceType, Color, Move, CastlingRights } from "../interfaces";

import { generatePseudoLegalMoves, generateLegalMoves } from "../GameLogic";

type PropTypes = {
	boardState: (Piece | null)[];
	currentPlayer: Color;
	castlingRights: CastlingRights;
	onMakeMove: (move: Move) => void;
};

const Board = ({
	boardState,
	currentPlayer,
	castlingRights,
	onMakeMove,
}: PropTypes) => {
	const [markedLegalMoveSquares, setMarkedLegalMoveSquares] = useState<
		number[]
	>([]);

	const boardTiles: React.ReactNode = boardState.map((piece, index) => {
		return (
			<Square
				key={index}
				isLight={
					!(Math.floor(index / 8) % 2 != 0 ? index % 2 != 0 : index % 2 == 0)
				}
				row={8 - Math.floor(index / 8)}
				image={getImageForPiece(piece)}
				onDragOver={(e) => onDragOver(e)}
				onDrop={(e) => onDrop(e, index)}
				isMarked={markedLegalMoveSquares.includes(index)}
			>
				{piece ? (
					piece.color == currentPlayer ? (
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
	});

	const onDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const onDragStart = (e: React.DragEvent, tilePos: number, piece: string) => {
		(e.currentTarget as HTMLElement).style.opacity = "0";
		e.dataTransfer.setData("tilePosition", tilePos.toString());
		let dragImage = new Image();
		dragImage.src = `images/${piece}.svg`;

		e.dataTransfer.setDragImage(dragImage, 45, 45);

		let allLegalMoves = generateLegalMoves(
			boardState,
			currentPlayer,
			castlingRights
		);

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
	isMarked: boolean;
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
		width: 20%;
		height: 20%;
		transform: rotate(45deg);
		background-color: #5ca099;
		opacity: ${(props) => (props.isMarked ? 1 : 0)};
		pointer-events: none;
	}

	div {
		width: 80%;
		height: 80%;
		background-image: ${(props) => `url("images/${props.image}.svg")`};
		background-size: cover;
	}
`;

const getImageForPiece = (piece: Piece | null): string => {
	if (piece == null) return "";
	switch (piece.type) {
		case PieceType.King: {
			if (piece.color == Color.Black) return "king_b";
			return "king_w";
		}
		case PieceType.Queen: {
			if (piece.color == Color.Black) return "queen_b";
			return "queen_w";
		}
		case PieceType.Rook: {
			if (piece.color == Color.Black) return "rook_b";
			return "rook_w";
		}
		case PieceType.Bishop: {
			if (piece.color == Color.Black) return "bishop_b";
			return "bishop_w";
		}
		case PieceType.Knight: {
			if (piece.color == Color.Black) return "knight_b";
			return "knight_w";
		}
		case PieceType.Pawn: {
			if (piece.color == Color.Black) return "pawn_b";
			return "pawn_w";
		}
		default:
			return "";
	}
};

export default Board;
