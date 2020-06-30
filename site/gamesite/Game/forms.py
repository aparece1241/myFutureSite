from django import forms
from . import models

class UploadGame(forms.ModelForm):
    class Meta:
        model = models.Game
        fields = [
            'name','description','game_images','slug'
        ]