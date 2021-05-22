import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challenges from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

interface Challenge {
	type: 'body' | 'eye';
	description: string;
	amount: number;
}

interface ChallengesContextData {
	level: number;
	currentExperience: number;
	challengesCompleted: number;
	activeChallenge: Challenge;
	experienceToNextLevel: number;
	levelUp: () => void;
	startNewChallenge: () => void;
	resetChallenge: () => void;
	completeChallenge: () => void;
	closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
	children: ReactNode;
	level: number;
	currentExperience: number;
	challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest } : ChallengesProviderProps) {
	const user = Cookies.get('userMoveit');
	const [level, setLevel] = useState(rest.level ?? 1);
	const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
	const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);

	const [activeChallenge, setActiveChallenge] = useState(null);
	const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

	const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

	useEffect(() => {
		Notification.requestPermission();
	}, []);

	useEffect(() => {
		fetch(`https://pedro-moveit-backend.herokuapp.com/get-user/${user}`)
		.then(res => res.json())
		.then(data => {
			setLevel(data.level);
			setCurrentExperience(data.xp);
			setChallengesCompleted(data.completed_challenges);
		});

		Cookies.set('levelMoveit', level.toString());
		Cookies.set('currentExperienceMoveit', currentExperience.toString());
		Cookies.set('challengesCompletedMoveit', challengesCompleted.toString());
	}, [level, currentExperience, challengesCompleted]);

	function levelUp() {
		setLevel(level + 1);
		setIsLevelUpModalOpen(true);
		const data = {
			"username": user,
			"level": level + 1,
			"xp": currentExperience,
			"completed_challenges": challengesCompleted
	  }
		fetch(`https://pedro-moveit-backend.herokuapp.com/update-user`, {
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		}).then(response => {
			return response.json();
		});
	}

	function closeLevelUpModal() {
		setIsLevelUpModalOpen(false);
	}

	function startNewChallenge() {
		const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
		const challenge = challenges[randomChallengeIndex];

		setActiveChallenge(challenge);

		new Audio('/notification.mp3').play();

		if (Notification.permission === "granted") {
			new Notification('Novo desafio 🚀', {
				body: `Valendo ${challenge.amount}xp!`
			});
		}
	}

	function resetChallenge() {
		setActiveChallenge(null);
	}

	function completeChallenge() {
		if (!activeChallenge) {
			return;
		}

		const { amount } = activeChallenge;

		let finalExperience = currentExperience + amount;

		if (finalExperience >= experienceToNextLevel) {
			finalExperience = finalExperience - experienceToNextLevel;
			levelUp();
		}

		setCurrentExperience(finalExperience);
		setActiveChallenge(null);
		setChallengesCompleted(challengesCompleted + 1);
		const data = {
			"username": user,
			"level": level,
			"xp": finalExperience,
			"completed_challenges": challengesCompleted + 1
	  }
		fetch(`https://pedro-moveit-backend.herokuapp.com/update-user`, {
			method: 'patch',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data)
		}).then(response => {
			return response.json();
		})
	}

	return (
		<ChallengesContext.Provider
			value={{
				level,
				currentExperience,
				challengesCompleted,
				activeChallenge,
				experienceToNextLevel,
				levelUp,
				startNewChallenge,
				resetChallenge,
				completeChallenge,
				closeLevelUpModal
			}}
		>
			{children}
			{ isLevelUpModalOpen && <LevelUpModal />}

		</ChallengesContext.Provider>
	)
}