from django.urls import path
from . import views

app_name="Game"
urlpatterns = [
    path('',views.home, name="home"),
    path('upload/',views.upload,name="upload"),
    path('details/<slug:slug>',views.details, name = "details"),
]