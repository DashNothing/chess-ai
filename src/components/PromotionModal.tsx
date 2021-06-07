/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";
import React, { useState } from "react";
import styled from "@emotion/styled";
import { PieceType } from "../interfaces";

type PropTypes = {
	x: number;
	y: number;
	isShowing: boolean;
	onSelect: (selectedPiece: PieceType) => void;
};

const PromotionModal = ({ x, y, isShowing, onSelect }: PropTypes) => {
	return (
		<div>
			{isShowing == true && (
				<Container>
					<button
						style={{ animationDelay: "0s" }}
						onClick={(e) => onSelect(PieceType.Queen)}
					>
						<img src={`${process.env.PUBLIC_URL}/images/queen_w.svg`} />
					</button>
					<button
						style={{ animationDelay: "0.1s" }}
						onClick={(e) => onSelect(PieceType.Rook)}
					>
						<img src={`${process.env.PUBLIC_URL}/images/rook_w.svg`} />
					</button>
					<button
						style={{ animationDelay: "0.2s" }}
						onClick={(e) => onSelect(PieceType.Bishop)}
					>
						<img src={`${process.env.PUBLIC_URL}/images/bishop_w.svg`} />
					</button>
					<button
						style={{ animationDelay: "0.3s" }}
						onClick={(e) => onSelect(PieceType.Knight)}
					>
						<img src={`${process.env.PUBLIC_URL}/images/knight_w.svg`} />
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
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	display: flex;
	flex-direction: row;
	column-gap: 10px;

	button {
		padding: 10px;
		background-color: #fff;
		border-radius: 100%;
		box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
		opacity: 0;
		animation: ${appearAnimation} 0.4s;
		animation-fill-mode: forwards;

		img {
			display: block;
			width: 35px;
			height: 35px;
			object-fit: contain;
		}
	}
`;

export default PromotionModal;
