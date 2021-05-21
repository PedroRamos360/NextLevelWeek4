import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

export default function ExperienceBar() {
	const [experienceToNextLevel, setExperienceToNextLevel] = useState(1);
	const [currentExperience, setCurrentExperience] = useState(0);

	const user = Cookies.get('userMoveit');

	useEffect(() => {
		fetch(`https://pedro-moveit-backend.herokuapp.com/get-user/${user}`)
		.then(res => res.json())
		.then(data => {
			setCurrentExperience(data.xp);
			setExperienceToNextLevel(Math.pow((data.level + 1) * 4, 2));
		});
	}, [])


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