import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export default function ExperienceBar() {
	const { currentExperience, experienceToNextLevel } = useContext(ChallengesContext);

	let percentToNextLevel = Math.round((currentExperience / experienceToNextLevel) * 100);

	if (percentToNextLevel == NaN) {
		percentToNextLevel = 0;
	}

	return (
		<header className={styles.experienceBar}>
			<span>0 xp</span>
			<div>
				<div style={{ width: `${percentToNextLevel}%` }} />

				<span className={styles.currentExperience} style={{left: `${percentToNextLevel}%`}}>
					{currentExperience} xp
				</span>
			</div>
			<span>{experienceToNextLevel} xp</span>
		</header>
	);
}