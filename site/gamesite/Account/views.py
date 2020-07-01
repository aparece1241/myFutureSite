from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.http import HttpResponse
from django.contrib.auth import login as log, logout
# Create your views here.

def log_in(request):
    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            log(request,form.get_user())
            if 'next' in request.POST:
                return redirect(request.POST.get('next'))
            else:
                return redirect('Game:home')

    else:
        form = AuthenticationForm()
    return render(request,'Account/login.html',{'form':form})



def sign_up(request):
    if request.method == "POST":
        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            user = form.save()
            log(request,user)
            return redirect('Game:home')
    else:
        form = UserCreationForm()
    return render(request,'Account/signup.html',{'form':form})

