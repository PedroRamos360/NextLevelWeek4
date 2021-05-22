import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal() {
	const { closeLevelUpModal } = useContext(ChallengesContext);
	const [level, setLevel] = useState(1);

	const user = Cookies.get('userMoveit');
	useEffect(() => {
		fetch(`https://pedro-moveit-backend.herokuapp.com/get-user/${user}`)
		.then(res => res.json())
		.then(data => {
			setLevel(data.level);
		});
	}, [])

	return (
		<div className={styles.overlay}>
			<div className={styles.container}>
				<header>{level}</header>
				<strong>Parabéns</strong>
				<p>Você alcançou um novo level.</p>

				<button type="button" onClick={closeLevelUpModal}>
					<img src="/icons/close.svg" alt="Fechar modal"/>
				</button>
			</div>
		</div>
	)
}