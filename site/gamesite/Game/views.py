from django.shortcuts import render, redirect
from django.http import HttpResponse
from .models import Game
from . import forms
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

def upload_game(request):
    if request.method == "POST":
        form = forms.UploadGame(data=request.POST)
        if form.is_valid():
            instance = form.save(commit=False)
            instance.author = request.user
            instance.save()
            return redirect('Game:game_list')
    else:
        form = forms.UploadGame()
    return render(request,'Game/upload.html',{'form':form})




