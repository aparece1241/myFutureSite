from django.urls import path
from . import views


app_name = 'Game'
urlpatterns = [
    path('',views.home, name='home'),
    path('upload',views.upload_game, name = 'upload'),
    path('games-list/',views.game_list, name='game_list'),
    path('<slug:slug>/', views.details, name = 'details'),
    #adds play template
    # path('<slug:slug>/play',views.play, name='play'),
]