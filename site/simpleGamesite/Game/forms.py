from django import forms
from . import models

class GameUploads(forms.ModelForm):
    class Meta:
        model = models.Game
        fields = ['name','image','description','slug']