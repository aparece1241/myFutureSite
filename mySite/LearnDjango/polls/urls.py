from django.urls import path, include, re_path
from django.conf.urls import url

from . import views



app_name = 'polls'
urlpatterns = [
    path('',views.IndexView.as_view(), name='index'),
    path('<int:pk>/',views.DetailView.as_view(), name="details"),
    path('<int:pk>/results',views.ResultView.as_view(), name="results"),
    path('<int:question_id>/votes',views.votes, name="votes"),
]