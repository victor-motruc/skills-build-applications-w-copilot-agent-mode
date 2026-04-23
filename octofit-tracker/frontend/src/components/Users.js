import React, { useEffect, useState } from 'react';

const Users = () => {
	const [users, setUsers] = useState([]);
	const codespace = process.env.REACT_APP_CODESPACE_NAME;
	const baseUrl = codespace
		? `https://${codespace}-8000.app.github.dev/api/users/`
		: `http://localhost:8000/api/users/`;

	useEffect(() => {
		console.log('Fetching from:', baseUrl);
		fetch(baseUrl)
			.then(res => res.json())
			.then(data => {
				const items = data.results || data;
				console.log('Fetched users:', items);
				setUsers(items);
			})
			.catch(err => console.error('Error fetching users:', err));
	}, [baseUrl]);

	return (
		<div>
			<h2>Users</h2>
			<ul>
				{users.map((u, i) => (
					<li key={u.id || i}>{u.username} ({u.email})</li>
				))}
			</ul>
		</div>
	);
};

export default Users;
