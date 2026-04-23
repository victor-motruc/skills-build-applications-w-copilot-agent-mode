import React, { useEffect, useState } from 'react';

const Workouts = () => {
	const [workouts, setWorkouts] = useState([]);
	const codespace = process.env.REACT_APP_CODESPACE_NAME;
	const baseUrl = codespace
		? `https://${codespace}-8000.app.github.dev/api/workouts/`
		: `http://localhost:8000/api/workouts/`;

	useEffect(() => {
		console.log('Fetching from:', baseUrl);
		fetch(baseUrl)
			.then(res => res.json())
			.then(data => {
				const items = data.results || data;
				console.log('Fetched workouts:', items);
				setWorkouts(items);
			})
			.catch(err => console.error('Error fetching workouts:', err));
	}, [baseUrl]);

	return (
		<div>
			<h2>Workouts</h2>
			<ul>
				{workouts.map((w, i) => (
					<li key={w.id || i}>{w.name} ({w.difficulty})</li>
				))}
			</ul>
		</div>
	);
};

export default Workouts;
