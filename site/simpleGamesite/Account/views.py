from django.shortcuts import render , redirect
from django.http import HttpResponse
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth import login, logout

# Create your views here.

def log_in(request):
    if request.method == "POST":
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request,user)
            if 'next' in request.POST:
               return redirect(request.POST.get('next'))
            else:
                return redirect("Game:home")
    else:
        form = AuthenticationForm()
    return render(request, "Account/login.html", {'form': form})

def sign_up(request):
    if request.method == "POST":
        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("Game:home")
    else:
        form = UserCreationForm()
    return render(request, "Account/signup.html", {'form': form})

def log_out(request):
    logout(request)
    return redirect("Game:home")