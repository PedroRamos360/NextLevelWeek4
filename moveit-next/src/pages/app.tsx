import React from "react";
import CompletedChallenges from "../components/CompletedChallenges";
import Countdown from "../components/Countdown";

import ExperienceBar from "../components/ExperienceBar";
import Profile from "../components/Profile";

import Head from 'next/head';
import { GetServerSideProps } from 'next';

import styles from '../styles/pages/App.module.css';
import ChallengeBox from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface AppProps {
	levelMoveit: number;
	currentExperienceMoveit: number;
	challengesCompletedMoveit: number;
}


export default function AppPage(props : AppProps) {
	return (
		<ChallengesProvider
			level={props.levelMoveit}
			currentExperience={props.currentExperienceMoveit}
			challengesCompleted={props.challengesCompletedMoveit}
		>
			<div className={styles.container}>
				<Head>
					<title>Aplicação | move.it</title>
				</Head>
				<ExperienceBar />

				<CountdownProvider>
					<section>
						<div>
							<Profile />
							<CompletedChallenges />

							<Countdown />
						</div>
						<div>
							<ChallengeBox />
						</div>
					</section>
				</CountdownProvider>
			</div>
		</ChallengesProvider>
	)
}


// Faz chamadas api antes de renderizar os componentes em tela, assim os componentes podem
// receber as informações prontas
// Tudo que está secrito dentro dessa função roda dentro do server node do next.js
export const getServerSideProps : GetServerSideProps = async (ctx) => {
	const { levelMoveit, currentExperienceMoveit, challengesCompletedMoveit } = ctx.req.cookies;

	return {
		props: {
			levelMoveit: Number(levelMoveit),
			currentExperienceMoveit: Number(currentExperienceMoveit),
			challengesCompletedMoveit: Number(challengesCompletedMoveit)
		}
	}
}