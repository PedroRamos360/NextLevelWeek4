import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import Cookies from 'js-cookie';
import styles from '../styles/components/Profile.module.css';

export default function Profile() {
	const { level } = useContext(ChallengesContext);
	const [userExists, setUserExists] = useState(true);
	const [userImg, setUserImg] = useState('');

	const user = Cookies.get('user');


	useEffect(() => {
		if (user) {
			fetch(`https://api.github.com/users/${user}`)
			.then(res => res.json())
			.then(data => {
				if (data.message == "Not Found") {
					setUserExists(false);
				} else {
					setUserExists(true);
					setUserImg(data.avatar_url);
				}
			});
		} else {
			setUserImg('/anonymous.jpg');
		}
	}, []);

	return (
		<div className={styles.profileContainer}>
			{ userExists
				? <img src={userImg} alt={user} />
				: <img src={userImg} alt={'anonymous'}/>
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