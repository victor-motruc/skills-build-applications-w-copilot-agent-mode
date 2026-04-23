from django.test import TestCase
from .models import Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
	def test_team_creation(self):
		team = Team.objects.create(name='TestTeam')
		self.assertEqual(str(team), 'TestTeam')

	def test_activity_creation(self):
		activity = Activity.objects.create(user_email='test@example.com', type='run', duration=10)
		self.assertEqual(str(activity), 'test@example.com - run')

	def test_leaderboard_creation(self):
		lb = Leaderboard.objects.create(team='TestTeam', points=42)
		self.assertEqual(str(lb), 'TestTeam: 42')

	def test_workout_creation(self):
		workout = Workout.objects.create(name='TestWorkout', difficulty='Easy')
		self.assertEqual(str(workout), 'TestWorkout (Easy)')
