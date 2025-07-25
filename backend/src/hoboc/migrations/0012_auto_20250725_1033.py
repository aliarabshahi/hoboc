# Generated by Django 3.2.19 on 2025-07-25 07:03

from django.db import migrations, models
import hoboc.models


class Migration(migrations.Migration):

    dependencies = [
        ('hoboc', '0011_projectfile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectfile',
            name='file',
            field=models.FileField(upload_to=hoboc.models.project_files_upload_path),
        ),
        migrations.AlterField(
            model_name='resumesubmissionmodel',
            name='resume_file',
            field=models.FileField(upload_to=hoboc.models.resume_files_upload_path),
        ),
    ]
