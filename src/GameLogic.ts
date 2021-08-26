import {
	Move,
	Piece,
	Color,
	PieceType,
	CastlingRights,
	GameState,
} from "./interfaces";
import {
	numSquaresToEdge,
	kingMoves,
	knightMoves,
	pawnCapturesWhite,
	pawnCapturesBlack,
} from "./PrecomputedMoves";
import {
	pawnPSTableB,
	knightPSTableB,
	bishopPSTableB,
	rookPSTableB,
	queenPSTableB,
	kingPSTableEarlyB,
	kingPSTableEndB,
	pawnPSTableW,
	knightPSTableW,
	bishopPSTableW,
	rookPSTableW,
	queenPSTableW,
	kingPSTableEndW,
	kingPSTableEarlyW,
} from "./PieceSquareTables";

var attackMoves: { piece: Piece; squares: number[] }[] = [];

/*
	Generates moves without check detection
	Returns a list of all pesudo legal moves
*/
export const generatePseudoLegalMoves = (gameState: GameState): Move[] => {
	let pseudoLegalMoves: Move[] = [];

	let pieces: [Piece | null, number][] = gameState.boardState.map(
		(piece, index) => [piece, index]
	);

	pieces = pieces.filter(
		([piece, index]) => piece?.color === gameState.currentPlayer
	);

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
						if (gameState.boardState[targetSquare]?.color === piece?.color) {
							break;
						}

						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: targetSquare,
						});

						// Can caputure, so stop looking in this direction
						if (
							gameState.boardState[targetSquare] != null &&
							gameState.boardState[targetSquare]?.color !== piece?.color
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
						if (gameState.boardState[targetSquare]?.color === piece?.color) {
							break;
						}

						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: targetSquare,
						});

						// Can caputure, so stop looking in this direction
						if (
							gameState.boardState[targetSquare] != null &&
							gameState.boardState[targetSquare]?.color !== piece?.color
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
						if (
							gameState.boardState[targetSquare]?.color ===
							gameState.currentPlayer
						) {
							break;
						}

						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: targetSquare,
						});

						// Can caputure, so stop looking in this direction
						if (
							gameState.boardState[targetSquare] != null &&
							gameState.boardState[targetSquare]?.color !==
								gameState.currentPlayer
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
					if (
						gameState.boardState[targetSquare]?.color !==
						gameState.currentPlayer
					) {
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
				let allKingMoves = [...kingMoves[squareIndex]];

				// Don't add moves that are under attack
				const attackedSquares = getAttackedSquares(gameState);
				for (let attackedSquare of attackedSquares) {
					for (let kingMove of allKingMoves)
						if (kingMove === attackedSquare) {
							allKingMoves.splice(allKingMoves.indexOf(kingMove), 1);
						}
				}

				// Filter out the moves that land on friendly pieces
				allKingMoves.forEach((targetSquare) => {
					if (gameState.boardState[targetSquare]?.color !== piece?.color) {
						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: targetSquare,
						});
					}
				});

				// Castling
				const canCastleShort =
					gameState.currentPlayer === Color.White
						? gameState.castlingRights.whiteShort
						: gameState.castlingRights.blackShort;

				const canCastleLong =
					gameState.currentPlayer === Color.White
						? gameState.castlingRights.whiteLong
						: gameState.castlingRights.blackLong;

				if (canCastleShort) {
					if (
						gameState.boardState[squareIndex + 1] == null &&
						gameState.boardState[squareIndex + 2] == null &&
						!attackedSquares.includes(squareIndex + 1) &&
						!attackedSquares.includes(squareIndex + 2)
					) {
						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: squareIndex + 2,
						});
					}
				}

				if (canCastleLong) {
					if (
						gameState.boardState[squareIndex - 1] == null &&
						gameState.boardState[squareIndex - 2] == null &&
						!attackedSquares.includes(squareIndex - 1) &&
						!attackedSquares.includes(squareIndex - 2)
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
					piece.color === Color.White ? squareIndex + 8 : squareIndex - 8;

				if (targetSquare >= 0 && targetSquare < 64) {
					if (gameState.boardState[targetSquare] == null)
						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: targetSquare,
						});
				}

				// Double first move
				let doubleMoveSquare =
					piece.color === Color.White ? squareIndex + 16 : squareIndex - 16;
				let startingRank = piece.color === Color.White ? 1 : 6;

				if (Math.floor(squareIndex / 8) === startingRank) {
					if (
						gameState.boardState[targetSquare] == null &&
						gameState.boardState[doubleMoveSquare] == null
					) {
						pseudoLegalMoves.push({
							fromSquare: squareIndex,
							toSquare: doubleMoveSquare,
						});
					}
				}

				// Pawn captures
				let pawnCaptures: number[] = [];
				if (piece.color === Color.White) {
					pawnCaptures = pawnCapturesWhite[squareIndex];
				} else {
					pawnCaptures = pawnCapturesBlack[squareIndex];
				}

				pawnCaptures.forEach((captureSquare) => {
					if (
						gameState.boardState[captureSquare]?.color !==
							gameState.currentPlayer &&
						gameState.boardState[captureSquare] != null
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
export const generateLegalMovesSlow = (gameState: GameState): Move[] => {
	let legalMoves: Move[] = [];
	let pseudoLegalMoves: Move[] = generatePseudoLegalMoves(gameState);

	pseudoLegalMoves.forEach((move) => {
		const gameStateAfterMove = makeMove(gameState, move);
		const opponentResponses = generatePseudoLegalMoves(gameStateAfterMove);

		let myKingSquare = gameStateAfterMove.boardState.indexOf(
			gameStateAfterMove.boardState.find(
				(piece) =>
					piece?.type === PieceType.King &&
					piece?.color === gameState.currentPlayer
			) || null
		);

		if (
			opponentResponses.some(
				(responseMove) => responseMove.toSquare === myKingSquare
			)
		) {
		} else {
			legalMoves.push(move);
		}
	});

	return legalMoves;
};

/*
	Generates legal moves in an optimized way, using lists of attacked squares
	Returns a list of all legal moves
*/
export const generateLegalMoves = (gameState: GameState): Move[] => {
	let pseudoLegalMoves: Move[] = generatePseudoLegalMoves(gameState);
	let legalMoves: Move[] = [];

	const kingAttacks = getKingAttacks(gameState);

	// If king is in check
	if (kingAttacks.length > 0) {
		if (kingAttacks.length == 1) {
			// Single check, can do only 3 things:
			// 1. move the king out of the check
			const movesWithKing = pseudoLegalMoves.filter(
				(move) => gameState.boardState[move.fromSquare]?.type === PieceType.King
			);
			// 2. capture the checking piece
			const captures = pseudoLegalMoves.filter(
				(move) => move.toSquare === gameState.boardState.indexOf(kingAttacks[0])
			);
			// 3. block the check if the checking piece is queen, rook or bishop
			if (isSlidingPiece(kingAttacks[0].type)) {
				// Get the attacking piece's attack ray toward the king
				const attackRay: number[] = getAttackRayToKing(
					kingAttacks[0],
					gameState
				);
				// Get the moves that end in the attack ray squares
				const blocks = pseudoLegalMoves.filter((move) =>
					attackRay.includes(move.toSquare)
				);
				legalMoves.push(...blocks);
			}

			legalMoves.push(...movesWithKing);
			legalMoves.push(...captures);
		} else {
			// Double check
			// Only king moves are allowed
			legalMoves = pseudoLegalMoves.filter(
				(move) => gameState.boardState[move.fromSquare]?.type === PieceType.King
			);
		}
	} else {
		// If king is not in check we need to find pinned pieces and remove
		// any moves that move outside of the line between the attacker and the king
		legalMoves = pseudoLegalMoves;

		// Only sliding pieces can pin other pieces
		const opponentSlidingPieces = gameState.boardState.filter(
			(piece) =>
				piece &&
				piece.color !== gameState.currentPlayer &&
				isSlidingPiece(piece.type)
		);

		// Get all the attack rays from opponent sliding pieces to the king
		const attackRays: { attackerSquare: number; ray: number[] }[] =
			opponentSlidingPieces.map((piece) => {
				return {
					attackerSquare: gameState.boardState.indexOf(piece),
					ray: getAttackRayToKing(piece!, gameState),
				};
			});

		// If any attack ray goes through only one friendly piece and the king,
		// that piece can only move inside the ray
		for (const attackRay of attackRays) {
			let friendlyPiecesInRay = 0;
			let pinnedPieceSquare: number;
			attackRay.ray.forEach((square) => {
				if (gameState.boardState[square]?.color === gameState.currentPlayer) {
					friendlyPiecesInRay++;
					// If first piece in the ray it's the pinned piece
					if (friendlyPiecesInRay == 1) {
						pinnedPieceSquare = square;
					}
				}
			});

			if (friendlyPiecesInRay == 2) {
				const pinnedPieceMoves = legalMoves.filter(
					(move) => move.fromSquare == pinnedPieceSquare
				);

				const illegalPinnedPieceMoves = pinnedPieceMoves.filter(
					(move) =>
						!attackRay.ray.includes(move.toSquare) &&
						move.toSquare !== attackRay.attackerSquare
				);

				illegalPinnedPieceMoves.forEach((illegalMove) => {
					legalMoves.splice(legalMoves.indexOf(illegalMove), 1);
				});
			}
		}
	}

	return legalMoves;
};

/*
	Returns the indeces of squares that the opposing player is attacking
*/
const getAttackedSquares = (gameState: GameState): number[] => {
	var attackedSquares: number[] = [];

	const opponentColor =
		gameState.currentPlayer === Color.White ? Color.Black : Color.White;

	const opponentPieces: Piece[] = gameState.boardState
		.filter((piece) => piece != null && piece?.color === opponentColor)
		.map((piece) => piece!);

	// For every opponent piece get all the squares they attack
	opponentPieces.forEach((opponentPiece) => {
		attackedSquares.push(
			...getPieceAttackingSquares(
				gameState,
				opponentPiece,
				gameState.boardState.indexOf(opponentPiece)
			)
		);
	});

	return attackedSquares;
};

/*
	Takes a piece
	Returns a list of all indeces attacked by the piece
*/
const getPieceAttackingSquares = (
	gameState: GameState,
	piece: Piece,
	squareIndex: number
): number[] => {
	let attackedSquares: number[] = [];

	// First 4 are orthogonal, last 4 are diagonals (N, S, W, E, NW, SE, NE, SW)
	const directionOffsets = [8, -8, -1, 1, 7, -7, 9, -9];

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

					attackedSquares.push(targetSquare);

					// Blocked by friendly piece, so stop looking in this direction
					if (gameState.boardState[targetSquare]?.color === piece?.color) {
						break;
					}

					// Can caputure, so stop looking in this direction
					// If it's a king, don't stop
					if (
						gameState.boardState[targetSquare] != null &&
						gameState.boardState[targetSquare]?.color !== piece?.color &&
						gameState.boardState[targetSquare]?.type !== PieceType.King
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

					attackedSquares.push(targetSquare);

					// Blocked by friendly piece, so stop looking in this direction
					if (gameState.boardState[targetSquare]?.color === piece?.color) {
						break;
					}

					// Can caputure, so stop looking in this direction
					// If it's a king, don't stop
					if (
						gameState.boardState[targetSquare] != null &&
						gameState.boardState[targetSquare]?.color !== piece?.color &&
						gameState.boardState[targetSquare]?.type !== PieceType.King
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

					attackedSquares.push(targetSquare);

					// Blocked by friendly piece, so stop looking in this direction
					if (gameState.boardState[targetSquare]?.color === piece?.color) {
						break;
					}

					// Can caputure, so stop looking in this direction
					// If it's a king, don't stop
					if (
						gameState.boardState[targetSquare] != null &&
						gameState.boardState[targetSquare]?.color !== piece?.color &&
						gameState.boardState[targetSquare]?.type !== PieceType.King
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
				attackedSquares.push(targetSquare);
			});

			break;
		}

		case PieceType.Pawn: {
			// Pawn captures
			let pawnCaptures: number[] = [];
			if (piece.color === Color.White) {
				pawnCaptures = pawnCapturesWhite[squareIndex];
			} else {
				pawnCaptures = pawnCapturesBlack[squareIndex];
			}

			pawnCaptures.forEach((captureSquare) => {
				attackedSquares.push(captureSquare);
			});

			break;
		}

		case PieceType.King: {
			// Find all king moves from the piece's square
			let allKingMoves = [...kingMoves[squareIndex]];

			// Filter out the moves that land on friendly pieces
			allKingMoves.forEach((targetSquare) => {
				attackedSquares.push(targetSquare);
			});

			break;
		}

		default:
			break;
	}

	return attackedSquares;
};

/*
	Returns a list of all pieces attacking the current player's king
*/
export const getKingAttacks = (gameState: GameState): Piece[] => {
	let kingAttacks: Piece[] = [];

	const myKingSquare = gameState.boardState.indexOf(
		gameState.boardState.find(
			(piece) =>
				piece?.type == PieceType.King && piece?.color == gameState.currentPlayer
		)!
	);

	const opponentColor =
		gameState.currentPlayer === Color.White ? Color.Black : Color.White;

	const opponentPieces: Piece[] = gameState.boardState
		.filter((piece) => piece != null && piece?.color === opponentColor)
		.map((piece) => piece!);

	for (let opponentPiece of opponentPieces) {
		const attackedSquares = getPieceAttackingSquares(
			gameState,
			opponentPiece,
			gameState.boardState.indexOf(opponentPiece)
		);

		for (let square of attackedSquares) {
			if (square === myKingSquare) {
				kingAttacks.push(opponentPiece!);
			}
		}
	}

	return kingAttacks;
};

/*
	Returns a list of all attacked squares in a ray toward the current player's king
*/
const getAttackRayToKing = (piece: Piece, gameState: GameState): number[] => {
	let attackRay: number[] = [];

	const squareIndex = gameState.boardState.indexOf(piece);

	// First 4 are orthogonal, last 4 are diagonals (N, S, W, E, NW, SE, NE, SW)
	const directionOffsets = [8, -8, -1, 1, 7, -7, 9, -9];
	const startDir = piece.type === PieceType.Bishop ? 4 : 0;
	const endDir = piece.type === PieceType.Rook ? 4 : 8;

	// Check every direction and save the attack ray where the current player's king is found
	for (
		let directionIndex = startDir;
		directionIndex < endDir;
		directionIndex++
	) {
		let currentDirOffset = directionOffsets[directionIndex];
		let foundKing = false;
		let tempRaySquares = [];
		for (let n = 0; n < numSquaresToEdge[squareIndex][directionIndex]; n++) {
			let targetSquare = squareIndex + currentDirOffset * (n + 1);

			// Blocked by friendly piece, so stop looking in this direction
			if (gameState.boardState[targetSquare]?.color === piece?.color) {
				break;
			}

			tempRaySquares.push(targetSquare);

			// If it's a king this is the right ray
			if (
				gameState.boardState[targetSquare] != null &&
				gameState.boardState[targetSquare]?.color !== piece?.color &&
				gameState.boardState[targetSquare]?.type === PieceType.King
			) {
				foundKing = true;
				break;
			}
		}
		if (foundKing) {
			attackRay = [...tempRaySquares];
			break;
		}
	}

	return attackRay;
};

/*
	Takes a game state and a move
	Returns a modified game state based on the provied move
*/
export const makeMove = (gameState: GameState, move: Move): GameState => {
	let newBoard: (Piece | null)[] = [...gameState.boardState];
	let newCastlingRights: CastlingRights = { ...gameState.castlingRights };
	let newCurrentPlayer: Color = gameState.currentPlayer;
	let newEnPassantSquare: number | null = null;
	let newHalfMoveClock: number = gameState.halfMoveClock;
	let newFullMoves: number = gameState.fullMoves;

	// Change the board state
	let movedPiece = newBoard[move.fromSquare];
	newBoard[move.fromSquare] = null;
	newBoard[move.toSquare] = movedPiece;

	// Check if move is pawn move or capture for the half move clock
	let isPawnMoveOrCapture: boolean = false;
	if (gameState.boardState[move.toSquare] != null) {
		isPawnMoveOrCapture = true;
	}

	// Check for castling
	if (gameState.boardState[move.fromSquare]?.type === PieceType.King) {
		// Move the rook if castling
		let rookMove: Move | undefined = isMoveCastling(move);
		if (rookMove) {
			let rook = newBoard[rookMove.fromSquare];
			newBoard[rookMove.fromSquare] = null;
			newBoard[rookMove.toSquare] = rook;
		}

		// Remove castling rights if king has moved
		if (gameState.currentPlayer === Color.White) {
			newCastlingRights.whiteShort = false;
			newCastlingRights.whiteLong = false;
		} else {
			newCastlingRights.blackShort = false;
			newCastlingRights.blackLong = false;
		}
	}

	// Remove castling rights if rook moved
	if (gameState.boardState[move.fromSquare]?.type === PieceType.Rook) {
		if (gameState.currentPlayer === Color.White) {
			if (move.fromSquare === 0) {
				newCastlingRights.whiteLong = false;
			} else if (move.fromSquare === 7) {
				newCastlingRights.whiteShort = false;
			}
		} else {
			if (move.fromSquare === 56) {
				newCastlingRights.blackLong = false;
			} else if (move.fromSquare === 63) {
				newCastlingRights.blackShort = false;
			}
		}
	}

	// Remove castling rights if rook taken
	if (gameState.boardState[move.toSquare]?.type === PieceType.Rook) {
		if (gameState.boardState[move.toSquare]?.color === Color.White) {
			if (move.toSquare === 0) {
				newCastlingRights.whiteLong = false;
			} else if (move.toSquare === 7) {
				newCastlingRights.whiteShort = false;
			}
		} else {
			if (move.toSquare === 56) {
				newCastlingRights.blackLong = false;
			} else if (move.toSquare === 63) {
				newCastlingRights.blackShort = false;
			}
		}
	}

	// Change current player, but only if a pawn hasn't moved to a promotion square
	if (!isMovePromotion(move, gameState.boardState)) {
		if (gameState.currentPlayer === Color.White) {
			newCurrentPlayer = Color.Black;
		} else {
			newCurrentPlayer = Color.White;
			// If the move was black's increment the full move counter
			newFullMoves++;
		}
	} else if (gameState.currentPlayer == Color.Black) {
		newBoard = promotePawn(
			{ ...gameState, boardState: newBoard },
			move.toSquare,
			PieceType.Queen
		).boardState;
		newCurrentPlayer = Color.White;
		// If the move was black's increment the full move counter
		newFullMoves++;
	}

	// Check for en passant opportunity (only if a pawn has moved twice this turn)
	if (gameState.boardState[move.fromSquare]?.type === PieceType.Pawn) {
		if (
			Math.abs(
				Math.floor(move.fromSquare / 8) - Math.floor(move.toSquare / 8)
			) === 2
		) {
			newEnPassantSquare =
				move.toSquare +
				8 *
					(gameState.boardState[move.fromSquare]?.color === Color.White
						? -1
						: 1);
		}

		isPawnMoveOrCapture = true;
	}

	// Increment the half move clock if the move wasnt pawn move or a capture
	if (isPawnMoveOrCapture === false) newHalfMoveClock++;
	else newHalfMoveClock = 0;

	let newGameState: GameState = {
		boardState: newBoard,
		castlingRights: newCastlingRights,
		currentPlayer: newCurrentPlayer,
		enPassantSquare: newEnPassantSquare,
		halfMoveClock: newHalfMoveClock,
		fullMoves: newFullMoves,
	};

	return newGameState;
};

/* 
  Checks if the given move is castling
  Returns the rook move for castling or undefined
*/
export const isMoveCastling = (move: Move): Move | undefined => {
	if (move.toSquare === move.fromSquare + 2)
		return {
			fromSquare: move.toSquare + 1,
			toSquare: move.toSquare - 1,
		};

	if (move.toSquare === move.fromSquare - 2)
		return {
			fromSquare: move.toSquare - 2,
			toSquare: move.toSquare + 1,
		};

	return undefined;
};

/*
	Check if the move is a promotion and returns a boolean
*/
export const isMovePromotion = (
	move: Move,
	boardState: (Piece | null)[]
): boolean => {
	if (boardState[move.fromSquare]?.type == PieceType.Pawn) {
		// If white pawn is on the 8th rank
		if (
			boardState[move.fromSquare]?.color == Color.White &&
			Math.floor(move.toSquare / 8) == 7
		) {
			return true;
		}
		// If black pawn is on the 1st rank
		if (
			boardState[move.fromSquare]?.color == Color.Black &&
			Math.floor(move.toSquare / 8) == 0
		) {
			return true;
		}
	}

	return false;
};

/*
	Check if the piece is a rook, bishop or queen
*/
const isSlidingPiece = (piece: PieceType): boolean => {
	return (
		piece === PieceType.Bishop ||
		piece === PieceType.Rook ||
		piece === PieceType.Queen
	);
};

/*
	Promotes a pawn and advances the turn to the next player
*/
export const promotePawn = (
	gameState: GameState,
	pawnSquare: number,
	promoteTo: PieceType
): GameState => {
	let newBoard: (Piece | null)[] = [...gameState.boardState];
	let newCurrentPlayer: Color = gameState.currentPlayer;
	let newFullMoves: number = gameState.fullMoves;

	// Update the board state
	if (newBoard[pawnSquare] != null) {
		newBoard[pawnSquare] = {
			color: newBoard[pawnSquare]!.color,
			type: promoteTo,
		};
	}

	// Change the current player
	if (gameState.currentPlayer === Color.White) {
		newCurrentPlayer = Color.Black;
	} else {
		newCurrentPlayer = Color.White;
		// If the move was black's increment the full move counter
		newFullMoves++;
	}

	const newGameState: GameState = {
		...gameState,
		boardState: newBoard,
		currentPlayer: newCurrentPlayer,
		fullMoves: newFullMoves,
	};

	return newGameState;
};

/*
	Transfors a FEN string into the GameState object
*/
export const gameStateFromFEN = (fen: string): GameState => {
	let newBoard: (Piece | null)[] = [];
	let newCastlingRights: CastlingRights = {
		whiteShort: false,
		whiteLong: false,
		blackShort: false,
		blackLong: false,
	};
	let newCurrentPlayer: Color;
	let newEnPassantSquare: number | null = null;
	let newHalfMoveClock: number;
	let newFullMoves: number;

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

	const fenArray: string[] = fen.split(" ");

	// Board representation
	let fenBoard = fenArray[0];
	let file = 0;
	let rank = 7;

	for (let symbol of fenBoard) {
		if (symbol === "/") {
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
					color: symbol === symbol.toUpperCase() ? Color.White : Color.Black,
				};
				newBoard[file + 8 * rank] = piece;
				file++;
			}
		}
	}

	// Current player
	let fenPlayer = fenArray[1];

	if (fenPlayer === "w") newCurrentPlayer = Color.White;
	else newCurrentPlayer = Color.Black;

	// Castling rights
	let fenCastling = fenArray[2];

	if (fenCastling.includes("K")) newCastlingRights.whiteShort = true;
	if (fenCastling.includes("Q")) newCastlingRights.whiteLong = true;
	if (fenCastling.includes("k")) newCastlingRights.blackShort = true;
	if (fenCastling.includes("q")) newCastlingRights.blackLong = true;

	// En passant square
	let fenPassant = fenArray[3];

	if (fenPassant !== "-") {
		let fileString = fenPassant[0];
		let rankString = fenPassant[1];

		newEnPassantSquare =
			fileString.charCodeAt(0) - 65 + parseInt(rankString) * 8;
	}

	// Half move clock
	let fenHalfMove = fenArray[4];

	newHalfMoveClock = parseInt(fenHalfMove);

	// Full move clock
	let fenFullMoves = fenArray[5];

	newFullMoves = parseInt(fenFullMoves);

	let newGameState: GameState = {
		boardState: newBoard,
		castlingRights: newCastlingRights,
		currentPlayer: newCurrentPlayer,
		enPassantSquare: newEnPassantSquare,
		halfMoveClock: newHalfMoveClock,
		fullMoves: newFullMoves,
	};

	return newGameState;
};

/*
	Transforms the game state into a FEN string
*/
export const FENFromGameState = ({
	boardState,
	currentPlayer,
	castlingRights,
	enPassantSquare,
	halfMoveClock,
	fullMoves,
}: GameState): string => {
	let fenString: string = "";

	const pieceToSymbol = (piece: Piece | null): string => {
		let symbol: string = "";

		if (piece == null) return symbol;

		switch (piece.type) {
			case PieceType.Pawn: {
				symbol = "p";
				break;
			}
			case PieceType.Rook: {
				symbol = "r";
				break;
			}
			case PieceType.Knight: {
				symbol = "n";
				break;
			}
			case PieceType.Bishop: {
				symbol = "b";
				break;
			}
			case PieceType.Queen: {
				symbol = "q";
				break;
			}
			case PieceType.King: {
				symbol = "k";
				break;
			}
			default:
				break;
		}

		if (piece.color === Color.White) symbol = symbol.toUpperCase();

		return symbol;
	};

	let file = 0;
	let rank = 7;

	// Board state
	for (let rankIndex = rank; rankIndex >= 0; rankIndex--) {
		let emptySquares = 0;
		for (let fileIndex = file; fileIndex < 8; fileIndex++) {
			if (boardState[fileIndex + 8 * rankIndex] == null) {
				emptySquares++;
			} else {
				if (emptySquares > 0) {
					fenString += emptySquares.toString();
				}
				fenString += pieceToSymbol(boardState[fileIndex + 8 * rankIndex]);
				emptySquares = 0;
			}
		}

		if (emptySquares > 0) {
			fenString += emptySquares.toString();
		}

		if (rankIndex !== 0) fenString += "/";
	}

	fenString += " ";

	// Current player
	fenString += currentPlayer === Color.White ? "w" : "b";

	fenString += " ";

	// Castling rights
	fenString += castlingRights.whiteShort ? "K" : "";
	fenString += castlingRights.whiteLong ? "Q" : "";
	fenString += castlingRights.blackShort ? "k" : "";
	fenString += castlingRights.blackLong ? "q" : "";

	if (fenString[fenString.length - 1] === " ") {
		fenString += "-";
	}

	fenString += " ";

	// En passant square
	if (enPassantSquare == null) fenString += "-";
	else {
		let enPassantFile = String.fromCharCode(
			enPassantSquare - Math.floor(enPassantSquare / 8) * 8 + 65
		);
		let enPassantRank = Math.floor(enPassantSquare / 8) + 1;

		fenString += enPassantFile + enPassantRank;
	}

	fenString += " ";

	// Half moves since last capture or pawn move and full move counter
	fenString += halfMoveClock + " " + fullMoves;

	return fenString;
};

/*
	Evaluates material advantage of the board state
	Positive value means passed color is winning, ngative means the opponent is winning, zero is tied
*/
export const evaluateMaterialAdvantage = (
	boardState: (Piece | null)[],
	side: Color
): number => {
	const piecePoints = {
		[PieceType.Pawn]: 100,
		[PieceType.Bishop]: 330,
		[PieceType.Knight]: 320,
		[PieceType.Rook]: 500,
		[PieceType.Queen]: 900,
		[PieceType.King]: 20000,
	};
	let myScore = 0;
	let opponentScore = 0;

	let isEndgame = false;
	let isWhiteEndgame = false;

	// Endgame if no queens are on the board or every player that has a queen doesn't have minor pieces
	const whiteQueen: Piece = {
		type: PieceType.Queen,
		color: Color.White,
	};

	if (!boardState.includes(whiteQueen)) isWhiteEndgame = true;
	else {
		const whiteMinorPieceCount = boardState.filter(
			(piece) =>
				piece?.color == Color.White &&
				(piece?.type == PieceType.Bishop ||
					piece?.type == PieceType.Knight ||
					piece?.type == PieceType.Rook)
		);

		if (whiteMinorPieceCount.length == 0) isWhiteEndgame = true;
	}

	// Check if black triggers endgame only if white does
	if (isWhiteEndgame) {
		const blackQueen: Piece = {
			type: PieceType.Queen,
			color: Color.Black,
		};
		if (!boardState.includes(blackQueen)) isEndgame = true;
		else {
			const blackMinorPieceCount = boardState.filter(
				(piece) =>
					piece?.color == Color.Black &&
					(piece?.type == PieceType.Bishop ||
						piece?.type == PieceType.Knight ||
						piece?.type == PieceType.Rook)
			);

			if (blackMinorPieceCount.length == 0) isEndgame = true;
		}
	}

	let whiteKingPos: number;
	let blackKingPos: number;

	// Get king positions for king proximity
	if (isEndgame) {
		whiteKingPos = boardState.findIndex(
			(piece) => piece?.color === Color.White && piece.type === PieceType.King
		);
		blackKingPos = boardState.findIndex(
			(piece) => piece?.color === Color.Black && piece.type === PieceType.King
		);
	}

	boardState.forEach((piece, index) => {
		if (!piece) {
			return;
		}

		let table: number[] = [];
		let enemyKingPos: number | null = null;

		if (piece.color === Color.White) {
			if (isEndgame) enemyKingPos = blackKingPos;
			switch (piece.type) {
				case PieceType.Pawn:
					table = pawnPSTableW;
					break;
				case PieceType.Bishop:
					table = bishopPSTableW;
					break;
				case PieceType.Knight:
					table = knightPSTableW;
					break;
				case PieceType.Rook:
					table = rookPSTableW;
					break;
				case PieceType.Queen:
					table = queenPSTableW;
					break;
				case PieceType.King:
					if (isEndgame) table = kingPSTableEndW;
					else table = kingPSTableEarlyW;
					break;
			}
		} else {
			if (isEndgame) enemyKingPos = whiteKingPos;
			switch (piece.type) {
				case PieceType.Pawn:
					table = pawnPSTableB;
					break;
				case PieceType.Bishop:
					table = bishopPSTableB;
					break;
				case PieceType.Knight:
					table = knightPSTableB;
					break;
				case PieceType.Rook:
					table = rookPSTableB;
					break;
				case PieceType.Queen:
					table = queenPSTableB;
					break;
				case PieceType.King:
					if (isEndgame) table = kingPSTableEndB;
					else table = kingPSTableEarlyB;
					break;
			}
		}

		const materialPoints = piecePoints[piece.type];
		const positionPoints = table[index];

		let kingProximityPoints = 0;
		if (isEndgame)
			kingProximityPoints = getKingProximityModifier(enemyKingPos!, index) * 60;

		if (piece?.color === side) {
			myScore += materialPoints + positionPoints /*  + kingProximityPoints */;
		} else {
			opponentScore +=
				materialPoints + positionPoints /* + kingProximityPoints */;
		}
	});

	return myScore - opponentScore;
};

const getKingProximityModifier = (
	enemyKingPos: number,
	piecePos: number
): number => {
	const oneOffsets = [8, -8, -1, 1, 7, -7, 9, -9];
	const twoOffsets = [
		16, -16, 17, -17, 18, -18, 10, -10, 2, -2, 6, -6, 14, -14, 15, -15,
	];

	if (oneOffsets.includes(piecePos - enemyKingPos)) {
		return 2;
	} else if (twoOffsets.includes(piecePos - enemyKingPos)) {
		return 1;
	}

	return 0;
};
