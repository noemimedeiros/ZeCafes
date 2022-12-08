from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.http import HttpResponse
from utils.forms import ContaForm
from django.contrib import messages
from conta.models import Conta
from django.views.generic import ListView, DetailView, UpdateView, CreateView, TemplateView, FormView

# Create your views here.
class tela_login(FormView):
    template_name = "pages/login.html"
    form_class = ContaForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        self.request.session.flush()
        return context
    
    def post(self, request):
        try:
            login = Conta.objects.get(chave_seguranca=self.request.POST.get('chave_seguranca'))
        except Conta.DoesNotExist:
            self.mensagem = 'Chave de segurança inválida'
            login =  None
        
        if login != None:
            request.session['usuario_id'] = login.id
            if login.tipo:
                return HttpResponseRedirect(reverse('produtos:historico_pedidos'))
            if not login.tipo:
                return HttpResponseRedirect(reverse('barista:tela_atendimento'))
        if self.mensagem != None:
            messages.info(request, self.mensagem)
        return render(request, "pages/login.html")
