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
		<div className="card shadow-sm mb-4">
			<div className="card-body">
				<h2 className="card-title mb-4 text-primary">Activities</h2>
				<div className="table-responsive">
					<table className="table table-striped table-hover align-middle">
						<thead className="table-light">
							<tr>
								<th>#</th>
								<th>User Email</th>
								<th>Type</th>
								<th>Duration (min)</th>
							</tr>
						</thead>
						<tbody>
							{activities.map((a, i) => (
								<tr key={a.id || i}>
									<td>{i + 1}</td>
									<td>{a.user_email}</td>
									<td>{a.type}</td>
									<td>{a.duration}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default Activities;
