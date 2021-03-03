import styles from '../styles/pages/Home.module.css';
import { TiChevronRight } from "react-icons/ti";
import Link from 'next/link'
import React, { useState } from "react";
import Head from 'next/head';
import Cookies from 'js-cookie';

let user = '';

function changeUser(newUser) {
	user = newUser;
}

export default function Home() {
	const [user, setUser] = useState('');

	return (
		<>
		<Head>
			<title>Início | move.it</title>
		</Head>
		<div className={styles.homeContainer}>
			<h1>Bem vindo ao Move it!</h1>
			<div>
				<input
					value={user}
					placeholder="Digite seu usuário do github"
					onChange={(e) => {
						setUser(e.target.value);
						changeUser(e.target.value);
						Cookies.set('user', e.target.value);
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
			<Link href='/app'>
				<a onClick={() => {Cookies.set('user', '')}}>Ou entre anonimamente</a>
			</Link>
		</div>
		</>
	)

}