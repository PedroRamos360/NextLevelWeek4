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

	function handleUserSubmit() {
		const data = {
			'username': user,
		}

		let userExists = false;
		fetch(`https://pedro-moveit-backend.herokuapp.com/get-user/${user}`)
		.then(res => res.json())
		.then(data => {
			console.log(data.Error == undefined);
			if (data.Error == undefined) {
				userExists = true;
			}
		})
		if (!userExists) {
			fetch(`https://pedro-moveit-backend.herokuapp.com/create-user`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data)
			}).then(response => {
				return response.json();
			})
		}
	}

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
						Cookies.set('userMoveit', e.target.value);
					}}
				/>
					{user ? (
						<div onClick={handleUserSubmit}>
							<Link href='/app' >
								<button>
									<TiChevronRight color='white' size={40}/>
								</button>
							</Link>
						</div>
					) : (
						<Link href='/'>
							<button disabled>
								<TiChevronRight color='white' size={40}/>
							</button>
						</Link>
					)}
			</div>
			<Link href='/app'>
				<a onClick={() => {Cookies.set('userMoveit', '')}}>Ou entre anonimamente</a>
			</Link>
		</div>
		</>
	)

}