import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
	const [leaderboard, setLeaderboard] = useState([]);
	const codespace = process.env.REACT_APP_CODESPACE_NAME;
	const baseUrl = codespace
		? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
		: `http://localhost:8000/api/leaderboard/`;

	useEffect(() => {
		console.log('Fetching from:', baseUrl);
		fetch(baseUrl)
			.then(res => res.json())
			.then(data => {
				const items = data.results || data;
				console.log('Fetched leaderboard:', items);
				setLeaderboard(items);
			})
			.catch(err => console.error('Error fetching leaderboard:', err));
	}, [baseUrl]);

	return (
		<div>
			<h2>Leaderboard</h2>
			<ul>
				{leaderboard.map((l, i) => (
					<li key={l.id || i}>{l.team}: {l.points} pts</li>
				))}
			</ul>
		</div>
	);
};

export default Leaderboard;
