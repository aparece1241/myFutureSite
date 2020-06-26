from django.shortcuts import render
from .models import Game
# Create your views here.


def home(request):
    games = Game.objects.all()
    return render(request,'Game/home.html',{'games': games})
    