/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Color, PieceType } from "../interfaces";

type PropTypes = {
	x: number;
	y: number;
	isShowing: boolean;
	winner: Color | null;
	onRestart: () => void;
};

const GameOverModal = ({ x, y, isShowing, winner, onRestart }: PropTypes) => {
	return (
		<div
			style={{
				position: "absolute",
				left: "50%",
				top: "50%",
				transform: "translate(-50%, -50%)",
			}}
		>
			{isShowing == true && (
				<Container>
					<h3>{winner !== null ? "Checkmate" : "Stalemate"}</h3>
					<p>
						{winner !== null &&
							`Winner is ${winner === Color.White ? "white" : "black"}`}
					</p>
					<button
						style={{ animationDelay: "0.3s" }}
						onClick={(e) => {
							onRestart();
						}}
					>
						Play again
					</button>
				</Container>
			)}
		</div>
	);
};

const appearAnimation = keyframes`
	0% {
		transform: translateY(200px);
		opacity: 0;
	}
	100% {
		transform: translateY(0px);
		opacity: 1;
	}
`;

const Container = styled.div`
	column-gap: 10px;
	background-color: #fff;
	color: #000;
	padding: 20px 60px;
	text-align: center;
	border-radius: 6px;
	box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.2);
	opacity: 0;
	animation: ${appearAnimation} 0.4s;
	animation-fill-mode: forwards;

	h3 {
		margin-bottom: 10px;
	}

	p {
		margin-bottom: 15px;
	}

	button {
		padding: 15px 25px;
		background-color: #7ee654;
		font-weight: bold;
		border-radius: 6px;
		box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
	}
`;

export default GameOverModal;
