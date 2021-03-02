import styles from '../styles/pages/Home.module.css';
import { TiChevronRight } from "react-icons/ti";
import Link from 'next/link'
import { createContext, ReactNode, useEffect, useState } from "react";

let user = '';

function changeUser(newUser) {
	user = newUser;
}

export default function Home() {
	const [user, setUser] = useState('');

	return (
		<HomeProvider>
			<div className={styles.homeContainer}>
				<h1>Bem vindo ao Move it!</h1>
				<div>
					<input
						value={user}
						placeholder="Digite seu usuário do github"
						onChange={(e) => {
							setUser(e.target.value);
							changeUser(e.target.value);
						}}
					/>
						{user ? (
							<Link href='/app'>
								<button>
									<TiChevronRight color='white' size={40}/>
								</button>
							</Link>
						) : (
							<Link href='/'>
								<button>
									<TiChevronRight color='white' size={40}/>
								</button>
							</Link>
						)}
				</div>
			</div>
		</HomeProvider>
	)

}

interface HomeProviderProps {
	children: ReactNode;
}

interface HomeContextData {
	user: string;
}

export const HomeContext = createContext({} as HomeContextData);

export function HomeProvider({ children } : HomeProviderProps) {
	return (
		<HomeContext.Provider value={{
			user,
		}}>
			{children}
		</HomeContext.Provider>
	);
}
