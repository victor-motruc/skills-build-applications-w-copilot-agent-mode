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
		<div className="card shadow-sm mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4 text-warning">Users</h2>
				<div className="table-responsive">
					<table className="table table-striped table-hover align-middle">
						<thead className="table-light">
							<tr>
								<th>#</th>
								<th>Username</th>
								<th>Email</th>
							</tr>
						</thead>
						<tbody>
							{users.map((u, i) => (
								<tr key={u.id || i}>
									<td>{i + 1}</td>
									<td>{u.username}</td>
									<td>{u.email}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Users;
