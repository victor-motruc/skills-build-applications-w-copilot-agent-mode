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
		<div className="card shadow-sm mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4 text-info">Teams</h2>
				<div className="table-responsive">
					<table className="table table-striped table-hover align-middle">
						<thead className="table-light">
							<tr>
								<th>#</th>
								<th>Name</th>
							</tr>
						</thead>
						<tbody>
							{teams.map((t, i) => (
								<tr key={t.id || i}>
									<td>{i + 1}</td>
									<td>{t.name}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Teams;
