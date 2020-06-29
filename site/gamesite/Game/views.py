from django.shortcuts import render
from django.http import HttpResponse
from .models import Game
# Create your views here.


def home(request):
    games = Game.objects.all()
    return render(request,'Game/home.html',{'games': games})

def game_list(request):
    game = Game.objects.all()
    # return HttpResponse('List of all the games here')
    return render(request,'Game/game_list.html',{'game':game})

def details(request,slug):
    game = Game.objects.get(slug = slug)
    return render(request,'Game/details.html',{'game':game})




