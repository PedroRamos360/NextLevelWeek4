import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { HomeContext } from '../pages';
import styles from '../styles/components/Profile.module.css';

export default function Profile() {
	const { level } = useContext(ChallengesContext);
	const { user } = useContext(HomeContext);
	const [userExists, setUserExists] = useState(true);

	useEffect(() => {
		fetch(`https://api.github.com/users/${user}`)
			.then(res => res.json())
			.then(data => {
				if (data.message == "Not Found") {
					setUserExists(false);
				} else {
					setUserExists(true);
				}
			});
	});

	return (
		<div className={styles.profileContainer}>
			{ userExists
				? <img src={`https://github.com/${user}.png`} alt={user} />
				: <img src={'anonymous.jpg'} alt={user}/>
			}

			<div>
				{ user
					? <strong>{user}</strong>
					: <strong>Anônimo</strong>
				}
				<p>
					<img src="icons/level.svg" alt="Level"/>
					Level {level}
				</p>
			</div>
		</div>
	)
}