import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompletedChallenges.module.css';

export default function CompletedChallenges() {
	const [challengesCompleted, setChallengesCompleted] = useState(0);
	const user = Cookies.get('userMoveit');

	useEffect(() => {
		fetch(`https://pedro-moveit-backend.herokuapp.com/get-user/${user}`)
		.then(res => res.json())
		.then(data => {
			setChallengesCompleted(data.completed_challenges);
		})
	}, []);

	return (
		<div className={styles.completedChallengesContainer}>
			<span>Desafios completos</span>
			<span>{challengesCompleted}</span>
		</div>
	);
}