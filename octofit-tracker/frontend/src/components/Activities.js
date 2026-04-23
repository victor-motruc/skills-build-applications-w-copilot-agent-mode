import React, { useEffect, useState } from 'react';

const Activities = () => {
	const [activities, setActivities] = useState([]);
	const codespace = process.env.REACT_APP_CODESPACE_NAME;
	const baseUrl = codespace
		? `https://${codespace}-8000.app.github.dev/api/activities/`
		: `http://localhost:8000/api/activities/`;

	useEffect(() => {
		console.log('Fetching from:', baseUrl);
		fetch(baseUrl)
			.then(res => res.json())
			.then(data => {
				const items = data.results || data;
				console.log('Fetched activities:', items);
				setActivities(items);
			})
			.catch(err => console.error('Error fetching activities:', err));
	}, [baseUrl]);

	return (
		<div>
			<h2>Activities</h2>
			<ul>
				{activities.map((a, i) => (
					<li key={a.id || i}>{a.user_email} - {a.type} ({a.duration} min)</li>
				))}
			</ul>
		</div>
	);
};

export default Activities;
