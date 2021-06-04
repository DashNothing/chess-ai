/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useState } from "react";
import styled from "@emotion/styled";

import { GameState, Color } from "../interfaces";

import { FENFromGameState, evaluateMaterialAdvantage } from "../GameLogic";

type PropTypes = {
	gameState: GameState;
};

const GameInfo = ({ gameState }: PropTypes) => {
	return (
		<Wrapper>
			<p>
				Current player:{" "}
				{gameState.currentPlayer === Color.White ? "white" : "black"}
			</p>
			<div>
				<h3>Castling rights</h3>
				<h4>White</h4>
				<p>White king side: {gameState.castlingRights.whiteShort.toString()}</p>
				<p>White queen side: {gameState.castlingRights.whiteLong.toString()}</p>
				<h4>Black</h4>
				<p>Black king side: {gameState.castlingRights.blackShort.toString()}</p>
				<p>Black queen side: {gameState.castlingRights.blackLong.toString()}</p>
			</div>
			<div>
				<p>En passant square: {FENFromGameState(gameState).split(" ")[3]}</p>
			</div>
			<div>
				<p>50 move rule counter: {gameState.halfMoveClock}</p>
			</div>
			<div>
				<p>Full moves: {gameState.fullMoves}</p>
			</div>
			<p>
				Material advantage:{" "}
				{evaluateMaterialAdvantage(gameState.boardState, Color.White)}
			</p>
		</Wrapper>
	);
};

const Wrapper = styled.aside`
	padding: 10px;
	background-color: rgba(0, 0, 0, 0.2);

	div {
		margin: 10px 0;
	}
`;

export default GameInfo;
