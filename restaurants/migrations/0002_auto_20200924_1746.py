# Generated by Django 3.1.1 on 2020-09-24 17:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('restaurants', '0001_initial'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='restaurant',
            unique_together={('name', 'location')},
        ),
    ]