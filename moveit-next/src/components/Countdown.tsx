import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css';
import { CgCheckO } from "react-icons/cg";

import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';

export default function Countdown() {
	const {
		minutes,
		seconds,
		hasFinished,
		isActive,
		startCountdown,
		resetCountdown,
		startRest
	} = useContext(CountdownContext);

	// padStart preenche com '0' no início se o length não for 2
	const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
	const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

	return (
		<div>
			<div className={styles.countdownContainer}>
				<div>
					<span>{minuteLeft}</span>
					<span>{minuteRight}</span>
				</div>
				<span>:</span>
				<div>
					<span>{secondLeft}</span>
					<span>{secondRight}</span>
				</div>
			</div>

			{ hasFinished ? (
				<button
					type="button"
					className={`${styles.restButton}`}
					onClick={startRest}
				>
					Iniciar descanso
					<CgCheckO color='#4cd62b'/>
				</button>
			) : (
				<>
					{ isActive ? (
						<button
							type="button"
							className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
							onClick={resetCountdown}
						>
							Desistir
						</button>
					) : (
						<button
							type="button"
							className={styles.countdownButton}
							onClick={startCountdown}
						>
							Iniciar trabalho
						</button>
					)}
				</>
			)}

		</div>
	);
}