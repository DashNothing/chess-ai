import { Move, Piece, Color, PieceType, CastlingRights } from "./interfaces";
import {
	numSquaresToEdge,
	kingMoves,
	knightMoves,
	pawnCapturesWhite,
	pawnCapturesBlack,
} from "./PrecomputedMoves";

/*
	Generates moves without check detection
	Returns a list of all pesudo legal moves
*/
export const generatePseudoLegalMoves = (
	boardState: (Piece | null)[],
	sideColor: Color,
	castlingRights: CastlingRights
): Move[] => {
	let pseudoLegalMoves: Move[] = [];

	let pieces: [Piece | null, number][] = boardState.map((piece, index) => [
		piece,
		index,
	]);
	pieces = pieces.filter(([piece, index]) => piece?.color == sideColor);

	// First 4 are orthogonal, last 4 are diagonals (N, S, W, E, NW, SE, NE, SW)
	const directionOffsets = [8, -8, -1, 1, 7, -7, 9, -9];

	pieces.forEach(([piece, squareIndex]) => {
		switch (piece?.type) {
			case PieceType.Rook: {
				for (let directionIndex = 0; directionIndex < 4; directionIndex++) {
					let currentDirOffset = directionOffsets[directionIndex];
					for (
						let n = 0;
						n < numSquaresToEdge[squareIndex][directionIndex];
						n++
					) {
						let targetSquare = squareIndex + currentDirOffset * (n + 1);

						// Blocked by friendly piece, so stop looking in this direction
						if (boardState[targetSquare]?.color == sideColor) {
							break;
						}

						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: targetSquare,
						});

						// Can caputure, so stop looking in this direction
						if (
							boardState[targetSquare] != null &&
							boardState[targetSquare]?.color != sideColor
						) {
							break;
						}
					}
				}
				break;
			}

			case PieceType.Bishop: {
				for (let directionIndex = 4; directionIndex < 8; directionIndex++) {
					let currentDirOffset = directionOffsets[directionIndex];
					for (
						let n = 0;
						n < numSquaresToEdge[squareIndex][directionIndex];
						n++
					) {
						let targetSquare = squareIndex + currentDirOffset * (n + 1);

						// Blocked by friendly piece, so stop looking in this direction
						if (boardState[targetSquare]?.color == sideColor) {
							break;
						}

						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: targetSquare,
						});

						// Can caputure, so stop looking in this direction
						if (
							boardState[targetSquare] != null &&
							boardState[targetSquare]?.color != sideColor
						) {
							break;
						}
					}
				}
				break;
			}

			case PieceType.Queen: {
				for (let directionIndex = 0; directionIndex < 8; directionIndex++) {
					let currentDirOffset = directionOffsets[directionIndex];
					for (
						let n = 0;
						n < numSquaresToEdge[squareIndex][directionIndex];
						n++
					) {
						let targetSquare = squareIndex + currentDirOffset * (n + 1);

						// Blocked by friendly piece, so stop looking in this direction
						if (boardState[targetSquare]?.color == sideColor) {
							break;
						}

						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: targetSquare,
						});

						// Can caputure, so stop looking in this direction
						if (
							boardState[targetSquare] != null &&
							boardState[targetSquare]?.color != sideColor
						) {
							break;
						}
					}
				}
				break;
			}

			case PieceType.Knight: {
				// Find all knight moves from the piece's square
				let allKnightMoves = knightMoves[squareIndex];

				// Filter out the moves that land on friendly pieces
				allKnightMoves.forEach((targetSquare) => {
					if (boardState[targetSquare]?.color != sideColor) {
						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: targetSquare,
						});
					}
				});

				break;
			}

			case PieceType.King: {
				// Find all king moves from the piece's square
				let allKingMoves = kingMoves[squareIndex];

				// Filter out the moves that land on friendly pieces
				allKingMoves.forEach((targetSquare) => {
					if (boardState[targetSquare]?.color != sideColor) {
						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: targetSquare,
						});
					}
				});

				// Castling
				const canCastleShort =
					sideColor == Color.White
						? castlingRights.whiteShort
						: castlingRights.blackShort;

				const canCastleLong =
					sideColor == Color.White
						? castlingRights.whiteLong
						: castlingRights.blackLong;

				if (canCastleShort) {
					if (
						boardState[squareIndex + 1] == null &&
						boardState[squareIndex + 2] == null
					) {
						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: squareIndex + 2,
						});
					}
				}

				if (canCastleLong) {
					if (
						boardState[squareIndex - 1] == null &&
						boardState[squareIndex - 2] == null
					) {
						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: squareIndex - 2,
						});
					}
				}

				break;
			}

			case PieceType.Pawn: {
				// Single moves
				let targetSquare =
					piece.color == Color.White ? squareIndex + 8 : squareIndex - 8;

				if (targetSquare >= 0 && targetSquare < 64) {
					if (boardState[targetSquare] == null)
						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: targetSquare,
						});
				}

				// Double first move
				let doubleMoveSquare =
					piece.color == Color.White ? squareIndex + 16 : squareIndex - 16;
				let startingRank = piece.color == Color.White ? 1 : 6;

				if (Math.floor(squareIndex / 8) == startingRank) {
					if (
						boardState[targetSquare] == null &&
						boardState[doubleMoveSquare] == null
					) {
						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: doubleMoveSquare,
						});
					}
				}

				// Pawn captures
				let pawnCaptures: number[] = [];
				if (piece.color == Color.White) {
					pawnCaptures = pawnCapturesWhite[squareIndex];
				} else {
					pawnCaptures = pawnCapturesBlack[squareIndex];
				}

				pawnCaptures.forEach((captureSquare) => {
					if (
						boardState[captureSquare]?.color != sideColor &&
						boardState[captureSquare] != null
					) {
						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: captureSquare,
						});
					}
				});

				break;
			}

			default:
				break;
		}
	});

	return pseudoLegalMoves;
};

/*
	Generates the moves with check detecion by generating pseudo legal moves and removing illegal moves
	Returns a list of all legal moves
*/
export const generateLegalMoves = (
	boardState: (Piece | null)[],
	sideColor: Color,
	castlingRights: CastlingRights
): Move[] => {
	let legalMoves: Move[] = [];
	let pseudoLegalMoves: Move[] = generatePseudoLegalMoves(
		boardState,
		sideColor,
		castlingRights
	);

	pseudoLegalMoves.forEach((move) => {
		const boardAfterMove = makeVirtualMove(boardState, move);
		const opponentResponses = generatePseudoLegalMoves(
			boardAfterMove,
			sideColor == Color.White ? Color.Black : Color.White,
			castlingRights
		);

		let myKingSquare = boardAfterMove.indexOf(
			boardAfterMove.find(
				(piece) => piece?.type == PieceType.King && piece?.color == sideColor
			) || null
		);

		if (
			opponentResponses.some(
				(responseMove) => responseMove.toSquare == myKingSquare
			)
		) {
		} else {
			legalMoves.push(move);
		}
	});

	return legalMoves;
};

export const makeVirtualMove = (
	boardState: (Piece | null)[],
	move: Move
): (Piece | null)[] => {
	let tempBoardState: (Piece | null)[] = [...boardState];
	let movedPiece = tempBoardState[move.fromSquare];
	tempBoardState[move.fromSquare] = null;
	tempBoardState[move.toSquare] = movedPiece;

	// Check for castling
	if (boardState[move.fromSquare]?.type == PieceType.King) {
		let rookMove: Move | undefined = isMoveCastling(move);
		if (rookMove) {
			let rook = tempBoardState[rookMove.fromSquare];
			tempBoardState[rookMove.fromSquare] = null;
			tempBoardState[rookMove.toSquare] = rook;
		}
	}

	return tempBoardState;
};

/* 
  Checks if the given move is castling
  Returns the rook move for castling or undefined
*/
export const isMoveCastling = (move: Move): Move | undefined => {
	if (move.toSquare == move.fromSquare + 2)
		return {
			fromSquare: move.toSquare + 1,
			toSquare: move.toSquare - 1,
		};

	if (move.toSquare == move.fromSquare - 2)
		return {
			fromSquare: move.toSquare - 2,
			toSquare: move.toSquare + 1,
		};

	return undefined;
};

/*
	Transfors a FEN string into an array of Pieces and nulls representing the board
*/
export const positionFromFEN = (fen: string): (Piece | null)[] => {
	let newBoard: (Piece | null)[] = [];

	const symbolToPiece = (symbol: string): PieceType => {
		switch (symbol.toLowerCase()) {
			case "p":
				return PieceType.Pawn;
			case "r":
				return PieceType.Rook;
			case "n":
				return PieceType.Knight;
			case "b":
				return PieceType.Bishop;
			case "q":
				return PieceType.Queen;
			case "k":
				return PieceType.King;
			default:
				return PieceType.King;
		}
	};

	const fenBoard: string = fen.split(" ")[0];
	let file = 0;
	let rank = 7;

	for (let symbol of fenBoard) {
		if (symbol == "/") {
			file = 0;
			rank--;
		} else {
			if (!isNaN(parseInt(symbol))) {
				for (let i = 0; i < parseInt(symbol); i++)
					newBoard[file + i + rank * 8] = null;
				file += parseInt(symbol);
			} else {
				let piece: Piece = {
					type: symbolToPiece(symbol),
					color: symbol == symbol.toUpperCase() ? Color.White : Color.Black,
				};
				newBoard[file + 8 * rank] = piece;
				file++;
			}
		}
	}

	return newBoard;
};

/*
	Evaluates material advantage of the board state
	Positive value means white is winnin, negative means black is winning, zero is tied
*/
export const evaluateMaterialAdvantage = (
	boardState: (Piece | null)[],
	side: Color
): number => {
	let materialAdvantage = 0;

	const piecePoints = {
		[PieceType.Pawn]: 1,
		[PieceType.Bishop]: 3,
		[PieceType.Knight]: 3,
		[PieceType.Rook]: 5,
		[PieceType.Queen]: 9,
		[PieceType.King]: 900,
	};

	boardState.forEach((piece) => {
		if (piece) {
			materialAdvantage +=
				piecePoints[piece.type] * (piece.color == Color.White ? 1 : -1);
		}
	});

	return materialAdvantage * (side == Color.White ? 1 : -1);
};
