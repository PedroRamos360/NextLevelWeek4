import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
	minutes: number;
	seconds: number;
	hasFinished: boolean;
	isActive: boolean;
	startCountdown: () => void;
	resetCountdown: () => void;
	startRest: () => void;
}

interface CountdownProviderProps {
	children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({children} : CountdownProviderProps) {
	const { startNewChallenge, resetChallenge } = useContext(ChallengesContext);

	const [time, setTime] = useState(25 * 60);
	const [isActive, setIsActive] = useState(false);
	const [hasFinished, setHasFinished] = useState(false);
	const [restTime, setRestTime] = useState(false);
	const [startTime, setStartTime] = useState(0);
	const [fakeTime, setFakeTime] = useState(25 * 60);

	const minutes = Math.floor(time / 60);
	const seconds = time % 60;

	function startCountdown() {
		setIsActive(true);
	}

	function resetCountdown() {
		clearTimeout(countdownTimeout);
		setIsActive(false);
		setTime(25 * 60);
		setHasFinished(false);
	}

	function startRest() {
		setIsActive(true);
	}

	function setStart(miliseconds) {
		if (startTime == 0) {
			setStartTime(miliseconds);
		}
	}

	useEffect(() => {
		let secondsPassed = 0;
		if (isActive) {
			setStart(new Date().getTime());
			if (startTime == 0) {
				secondsPassed = Math.floor((new Date().getTime() - new Date().getTime()+1000)/1000);
			} else {
				secondsPassed = Math.floor((new Date().getTime() - startTime)/1000);
			}
		}

		if (isActive && time > 0) {
			countdownTimeout = setTimeout(() => {
				setFakeTime(fakeTime - 1);
				setTime(25*60 - secondsPassed);
			}, 1000);
		} else if (isActive && time == 0 && restTime == false) {
			setHasFinished(true);
			setIsActive(false);
			startNewChallenge();
			setRestTime(true);
			setTime(5 * 60);
		} else if (isActive && time == 0 && restTime == true) {
			new Audio('/notification.mp3').play();
			setHasFinished(true);
			setRestTime(false);
			resetCountdown();
			resetChallenge();
		}
	}, [isActive, fakeTime]);
	return (
		<CountdownContext.Provider value={{
			minutes,
			seconds,
			hasFinished,
			isActive,
			startCountdown,
			resetCountdown,
			startRest
		}}>
			{children}
		</CountdownContext.Provider>
	);
}