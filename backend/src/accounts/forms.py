from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustomUser

class CustomUserCreationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        # You can explicitly list all the fields you want to include:
        fields = ['username', 'email', 'password1', 'password2', 'name']


class CustomUserChangeForm(UserChangeForm):
    class Meta:
        model = CustomUser
        # Same here — list what you want to expose in the admin/edit form
        fields = ['username', 'email', 'first_name', 'last_name', 'name']
