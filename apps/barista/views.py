from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from produto.models import Produtos, TipoProduto
from .models import Barista
from conta.models import Conta
from pedido.models import Pedidos, MetodoPagamento
from django.views.generic import ListView, DetailView, UpdateView, CreateView, FormView
from django.views.generic.edit import DeleteView
from extra_views import SearchableListMixin
from django.contrib.auth.mixins import UserPassesTestMixin
from utils.forms import ProdutosDisponivelForm, BaristaForm, ContaForm, PedidosConcluirForm
from datetime import date, datetime, timedelta
from utils.views import ZecafesView
from utils.forms import PedidosForm
from utils.utils import random_generator
from django.contrib.auth.decorators import login_required, permission_required
from django.contrib import messages

# Create your views here.
class tela_venda(ListView):
    template_name = "pages/venda/tela_venda.html"
    model = Produtos
    context_object_name = "produtos"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["cafes"] = Produtos.objects.filter(tipo=TipoProduto.objects.get(id=1))
        context["bebidas"] = Produtos.objects.filter(tipo=TipoProduto.objects.get(id=2))
        context["lanches"] = Produtos.objects.filter(tipo=TipoProduto.objects.get(id=3))
        context["sobremesas"] = Produtos.objects.filter(tipo=TipoProduto.objects.get(id=4))
        return context

    def post(self, request):
        form = PedidosForm().save(commit=False)
        form.numero = self.request.POST.get('numero')
        form.descricao = self.request.POST.get('descricao')
        form.metodo_pagamento = MetodoPagamento.objects.get(id=self.request.POST.get('metodo'))
        form.valor = float(self.request.POST.get('valor'))
        form.tempo_gasto = datetime.now().strftime("%H:%M:%S")
        form.save()
        messages.success(self.request, 'Sucesso')
        return HttpResponseRedirect(reverse('barista:tela_venda'))
    
class tela_atendimento_pedidos(ZecafesView, ListView):
    template_name = "pages/venda/tela_atendimento.html"
    model = Pedidos
    context_object_name = "pedidos"
    ordering = ['-tempo_gasto']

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["pedidos_concluidos"] = Pedidos.objects.filter(concluido=1, data_pedido=date.today())
        return context

    def get_queryset(self, **kwargs):
        return super().get_queryset(**kwargs).filter(concluido=0, cancelado=0)

class tela_atendimento_produtos(ZecafesView, SearchableListMixin, ListView):
    template_name = "pages/venda/tela_produtos.html"
    model = Produtos
    context_object_name = "produtos"
    search_fields = ['tipo__tipo']

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["tipos"] = TipoProduto.objects.all()
        return context

class finalizar_pedido(ZecafesView, UpdateView):
    model = Pedidos
    form_class = PedidosConcluirForm

    def form_valid(self, request, **kwargs):
        form = PedidosConcluirForm(instance=Pedidos.objects.get(numero=self.request.POST.get('numero'))).save(commit=False)
        if self.request.POST.get('finalizar'):
            form.concluido = True
            form.barista = Barista.objects.get(conta_id=self.request.session['usuario_id'])
            form.tempo_gasto = datetime.now() - timedelta(hours = int(form.tempo_gasto.strftime("%H")), minutes  = int(form.tempo_gasto.strftime("%M")), milliseconds  = int(form.tempo_gasto.strftime("%S")))
            form.save()
            return HttpResponseRedirect(self.request.META.get('HTTP_REFERER'))
        if self.request.POST.get('cancelar'):
            form.cancelado = True
            form.barista = Barista.objects.get(conta_id=self.request.session['usuario_id'])
            form.tempo_gasto = datetime.now() - timedelta(hours = int(form.tempo_gasto.strftime("%H")), minutes  = int(form.tempo_gasto.strftime("%M")), milliseconds  = int(form.tempo_gasto.strftime("%S")))
            form.save()
            return HttpResponseRedirect(self.request.META.get('HTTP_REFERER'))

class produto_disponivel(ZecafesView, UpdateView):
    model = Produtos
    form_class = ProdutosDisponivelForm

    def form_valid(self, request, **kwargs):
        form = ProdutosDisponivelForm(instance=Produtos.objects.get(id=self.request.POST.get('produto'))).save(commit=False)
        if form.disponivel:
            form.disponivel = False
            form.save()
            return HttpResponseRedirect(self.request.META.get('HTTP_REFERER'))
        if not form.disponivel:
            form.disponivel = True
            form.save()
            return HttpResponseRedirect(self.request.META.get('HTTP_REFERER'))

class lista_baristas(UserPassesTestMixin, ZecafesView, SearchableListMixin, ListView):
    template_name = "pages/gerente/lista_baristas.html"
    model = Barista
    search_fields = ['conta_id__nome', 'cpf']
    context_object_name = 'baristas'
    paginate_by = 6

    def test_func(self):
        return Conta.objects.get(id=self.request.session['usuario_id']).tipo

class cadastro_barista(ZecafesView, CreateView):
    template_name = "pages/gerente/cadastro_barista.html"
    model = Barista
    form_class = BaristaForm

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["conta"] = ContaForm()
        return context
    
    def post(self, request):
        if ContaForm(request.POST, request.FILES).is_valid():
            conta = ContaForm(request.POST, request.FILES).save(commit=False)
            conta.chave_seguranca = random_generator()
            conta.tipo = 0
            conta.save()
        if BaristaForm(request.POST).is_valid():
            barista = BaristaForm(request.POST).save(commit=False)
            barista.conta_id = conta.id
            barista.save()
        return HttpResponseRedirect(reverse('barista:lista-baristas'))

class editar_barista(ZecafesView, UpdateView):
    template_name = "pages/gerente/editar_barista.html"
    model = Barista
    context_object_name = 'barista'
    form_class = BaristaForm

class excluir_barista(DeleteView):
    template_name = "pages/gerente/lista_barista.html"
    model = Barista

    def post(self, request, *args, **kwargs):
        conta = Conta.objects.get(id=self.get_object().conta.pk)
        self.object = self.get_object()
        self.object.delete()
        conta.delete()
        return HttpResponseRedirect(reverse('barista:lista-baristas'))