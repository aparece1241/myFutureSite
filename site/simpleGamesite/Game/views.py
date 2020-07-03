from django.shortcuts import render,redirect
from django.http import HttpResponse
from django.contrib.auth.decorators import login_required

from . import forms
from . import models
# Create your views here.


@login_required(login_url='Account:login')
def upload(request):
    if request.method == "POST":
        form = forms.GameUploads(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('Game:home')
    else:
        form = forms.GameUploads()
    return render(request, 'Game/upload.html', {'form': form})

def home(request):
    games = models.Game.objects.all()
    return render(request, 'Game/home.html', {'games': games})

def details(request, slug):
    game = models.Game.objects.get(slug = slug)
    return render(request, "Game/details.html", {'game': game})

