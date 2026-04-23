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
		<div className="card shadow-sm mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4 text-danger">Workouts</h2>
				<div className="table-responsive">
					<table className="table table-striped table-hover align-middle">
						<thead className="table-light">
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Difficulty</th>
							</tr>
						</thead>
						<tbody>
							{workouts.map((w, i) => (
								<tr key={w.id || i}>
									<td>{i + 1}</td>
									<td>{w.name}</td>
									<td>{w.difficulty}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Workouts;
