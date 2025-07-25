# Generated by Django 3.2.19 on 2025-07-24 08:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hoboc', '0008_auto_20250714_1021'),
    ]

    operations = [
        migrations.CreateModel(
            name='NotificationSubscription',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('mobile', models.CharField(max_length=20)),
                ('email', models.EmailField(blank=True, max_length=254, null=True)),
                ('full_name', models.CharField(blank=True, max_length=100, null=True)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('topics', models.ManyToManyField(to='hoboc.CoursesTopicModel')),
            ],
            options={
                'verbose_name': 'Notification Subscription',
                'verbose_name_plural': 'Notification Subscriptions',
                'unique_together': {('mobile',)},
            },
        ),
    ]
