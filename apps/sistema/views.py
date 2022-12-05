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

    def logar_usuario(self, chave_de_seguranca):
        try:
            login = Conta.objects.get(chave_seguranca=chave_de_seguranca)
            return login
        except Conta.DoesNotExist:
            self.mensagem = 'Chave de segurança inválida'
            return None
    
    def post(self, request):
        login = self.logar_usuario(self.request.POST.get('chave_seguranca'))
        if login != None:
            request.session['usuario_id'] = login.id
            if login.tipo:
                return HttpResponseRedirect(reverse('produtos:historico_pedidos'))
            if not login.tipo:
                return HttpResponseRedirect(reverse('barista:tela_atendimento'))
        if self.mensagem != None:
            messages.info(request, self.mensagem)
        return render(request, "pages/login.html")
