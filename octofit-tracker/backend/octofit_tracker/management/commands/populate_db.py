from django.core.management.base import BaseCommand
from django.conf import settings
from djongo import models

from django.contrib.auth import get_user_model
from django.db import connection

from bson import ObjectId

class Team(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    name = models.CharField(max_length=100, unique=True)
    class Meta:
        db_table = 'teams'

class Activity(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    user_email = models.CharField(max_length=100)
    type = models.CharField(max_length=100)
    duration = models.IntegerField()
    class Meta:
        db_table = 'activities'

class Leaderboard(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    team = models.CharField(max_length=100)
    points = models.IntegerField()
    class Meta:
        db_table = 'leaderboard'

class Workout(models.Model):
    _id = models.ObjectIdField(primary_key=True, default=ObjectId, editable=False)
    name = models.CharField(max_length=100)
    difficulty = models.CharField(max_length=50)
    class Meta:
        db_table = 'workouts'

User = get_user_model()

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        # Clear collections
        Team.objects.all().delete()
        Activity.objects.all().delete()
        Leaderboard.objects.all().delete()
        Workout.objects.all().delete()
        User.objects.all().delete()

        # Teams
        marvel = Team.objects.create(name='Marvel')
        dc = Team.objects.create(name='DC')

        # Users
        users = [
            {'username': 'ironman', 'email': 'ironman@marvel.com', 'team': marvel},
            {'username': 'captainamerica', 'email': 'cap@marvel.com', 'team': marvel},
            {'username': 'spiderman', 'email': 'spiderman@marvel.com', 'team': marvel},
            {'username': 'batman', 'email': 'batman@dc.com', 'team': dc},
            {'username': 'superman', 'email': 'superman@dc.com', 'team': dc},
            {'username': 'wonderwoman', 'email': 'wonderwoman@dc.com', 'team': dc},
        ]
        for u in users:
            user = User.objects.create_user(username=u['username'], email=u['email'], password='password')
            # Optionally associate team if you extend user model

        # Activities
        Activity.objects.create(user_email='ironman@marvel.com', type='run', duration=30)
        Activity.objects.create(user_email='batman@dc.com', type='cycle', duration=45)
        Activity.objects.create(user_email='spiderman@marvel.com', type='swim', duration=25)
        Activity.objects.create(user_email='superman@dc.com', type='run', duration=60)

        # Leaderboard
        Leaderboard.objects.create(team='Marvel', points=120)
        Leaderboard.objects.create(team='DC', points=110)

        # Workouts
        Workout.objects.create(name='Pushups', difficulty='Easy')
        Workout.objects.create(name='Pullups', difficulty='Medium')
        Workout.objects.create(name='Squats', difficulty='Easy')
        Workout.objects.create(name='Deadlift', difficulty='Hard')


        # Unique index on email for users must be created via mongosh, not Django ORM

        self.stdout.write(self.style.SUCCESS('octofit_db database populated with test data.'))
