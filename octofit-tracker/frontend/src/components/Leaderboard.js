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
		<div className="card shadow-sm mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4 text-success">Leaderboard</h2>
				<div className="table-responsive">
					<table className="table table-striped table-hover align-middle">
						<thead className="table-light">
							<tr>
								<th>#</th>
								<th>Team</th>
								<th>Points</th>
							</tr>
						</thead>
						<tbody>
							{leaderboard.map((l, i) => (
								<tr key={l.id || i}>
									<td>{i + 1}</td>
									<td>{l.team}</td>
									<td>{l.points}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Leaderboard;
