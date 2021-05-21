import { useContext, useEffect, useState } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import Cookies from 'js-cookie';
import styles from '../styles/components/Profile.module.css';

export default function Profile() {
	const [level, setLevel] = useState(1);
	const [userExists, setUserExists] = useState(true);
	const [userImg, setUserImg] = useState('');

	const user = Cookies.get('userMoveit');


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
			fetch(`https://pedro-moveit-backend.herokuapp.com/get-user/${user}`)
			.then(res => res.json())
			.then(data => {
				console.log(data);
				setLevel(data.level);
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