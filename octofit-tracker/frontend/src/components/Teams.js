import React, { useEffect, useState } from 'react';

const Teams = () => {
	const [teams, setTeams] = useState([]);
	const codespace = process.env.REACT_APP_CODESPACE_NAME;
	const baseUrl = codespace
		? `https://${codespace}-8000.app.github.dev/api/teams/`
		: `http://localhost:8000/api/teams/`;

	useEffect(() => {
		console.log('Fetching from:', baseUrl);
		fetch(baseUrl)
			.then(res => res.json())
			.then(data => {
				const items = data.results || data;
				console.log('Fetched teams:', items);
				setTeams(items);
			})
			.catch(err => console.error('Error fetching teams:', err));
	}, [baseUrl]);

	return (
		<div>
			<h2>Teams</h2>
			<ul>
				{teams.map((t, i) => (
					<li key={t.id || i}>{t.name}</li>
				))}
			</ul>
		</div>
	);
};

export default Teams;
