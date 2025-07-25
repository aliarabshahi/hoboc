# Generated by Django 3.2.19 on 2025-07-14 06:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('hoboc', '0006_contactusmodel_projectordermodel_resumesubmissionmodel'),
    ]

    operations = [
        migrations.CreateModel(
            name='BlogTagModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('slug', models.SlugField(unique=True)),
            ],
            options={
                'verbose_name': 'Blog Tag',
                'verbose_name_plural': 'Blog Tags',
            },
        ),
        migrations.CreateModel(
            name='BlogTopicModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('catchy_title', models.CharField(blank=True, default='', max_length=100, null=True)),
                ('slug', models.SlugField(max_length=100, unique=True)),
                ('description', models.TextField(blank=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='blogs/topics/images/')),
                ('logo_file', models.FileField(blank=True, null=True, upload_to='blogs/topics/logos/')),
                ('is_published', models.BooleanField(default=True)),
                ('priority', models.PositiveIntegerField(default=1)),
            ],
            options={
                'verbose_name': 'Course Topic',
                'verbose_name_plural': 'Course Topics',
            },
        ),
        migrations.CreateModel(
            name='BlogWriterModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bio', models.TextField(blank=True)),
                ('profile_picture', models.ImageField(blank=True, null=True, upload_to='courses/writers/')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='writer_profile', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Blog Writer',
                'verbose_name_plural': 'Blog Writers',
            },
        ),
        migrations.CreateModel(
            name='BlogPostModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('slug', models.SlugField(unique=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('pdf_file', models.FileField(blank=True, null=True, upload_to='blogs/pdfs/')),
                ('video_file', models.FileField(blank=True, null=True, upload_to='blogs/videos/')),
                ('video_url', models.URLField(blank=True, null=True)),
                ('thumbnail', models.ImageField(blank=True, null=True, upload_to='blogs/thumbs/')),
                ('cover_image', models.ImageField(blank=True, null=True, upload_to='blogs/covers/')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('is_published', models.BooleanField(default=False)),
                ('tags', models.ManyToManyField(blank=True, to='hoboc.BlogTagModel')),
                ('topic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='blog_topic', to='hoboc.blogtopicmodel')),
                ('writer', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='blog_writer', to='hoboc.blogwritermodel')),
            ],
            options={
                'verbose_name': 'Blogs ',
                'verbose_name_plural': 'Blogs',
                'unique_together': {('topic', 'slug')},
            },
        ),
    ]
