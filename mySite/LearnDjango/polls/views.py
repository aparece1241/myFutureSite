from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse, HttpResponseRedirect
from django.http import Http404
from django.template import loader
from django.urls import reverse
from django.views import generic

from django.utils import timezone

from .models import Question, Choice

# Create your views here.
class IndexView(generic.ListView):
    template_name = "polls/index.html"
    context_object_name = "latest_question_list"
    def get_queryset(self):
        """return the last 5 piblished questions"""
        return Question.objects.filter(pub_date__lte = timezone.now()).order_by('-pub_date')[:5]
        return Question.objects.filter(pub_date__lte=timezone.now())

class DetailView(generic.DetailView):
    model = Question
    template_name = "polls/details.html"

class ResultView(generic.DetailView):
    model = Question
    template_name = "polls/results.html"

def detail(request, question_id):

    # try:
    #     question = Question.objects.get(pk=question_id)
    # except Question.DoesNotExist:
    #     raise Http404("Question does not exist ")

    question = get_object_or_404(Question, pk=question_id)
    return render(request,'polls/details.html',{'question': question})



def results(request, question_id):
    question = get_object_or_404(Question,pk=question_id)
    return render(request, 'polls/results.html', {'question': question})



def votes(request, question_id):
    question = get_object_or_404(Question,pk = question_id)
    try:
        selected_choice = question.choice_set.get(pk = request.POST['choice'])
    except (KeyError,Choice.DoesNotExist):
        return render(
            request,'polls/details.html',{
                'question':question,
                'error_message': "You did'nt select a choice"
            }
        )
    else:
        selected_choice.votes =+1
        selected_choice.save()

    print(question.id)
    return HttpResponseRedirect(reverse('polls:results',args=(question.id,)))



def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    template = loader.get_template('polls/index.html')
    context = {
        'latest_question_list':latest_question_list,
    }
    return HttpResponse(template.render(context,request))
'''def index(request):
    latest_question_list = Question.objects.order_by('-pub_date')[:5]
    context = {'latest_question_list': latest_question_list}
    return render(request, 'polls/index.html', context)'''