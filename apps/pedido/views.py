from django.shortcuts import render
from .models import Pedidos
from conta.models import Conta
from django.views.generic import ListView
from extra_views import SearchableListMixin
from utils.views import ZecafesView
from django.db.models import Q
from django.contrib.auth.mixins import UserPassesTestMixin
from django.shortcuts import redirect

# Create your views here.
class HistoricoPedidos(UserPassesTestMixin, ZecafesView, SearchableListMixin, ListView):
    template_name = 'pages/gerente/historico_pedidos.html'
    model = Pedidos
    paginate_by = 5
    context_object_name = "historico"
    search_fields = ['numero', 'barista__conta_id__nome']

    def test_func(self):
        return Conta.objects.get(id=self.request.session['usuario_id']).tipo

    def handle_no_permission(self):
        return redirect('barista:tela_atendimento')

    def get_queryset(self):
        if self.request.GET.get('data_fim') and self.request.GET.get('q') != '':
            return super().get_queryset().filter(Q(barista__conta_id__nome=self.request.GET.get('q')) & Q(Q(concluido=1) | Q(cancelado=1)) & Q(data_pedido__range=[self.request.GET.get('data_inicio'), self.request.GET.get('data_fim')]))
        if self.request.GET.get('data_fim'):
            return super().get_queryset().filter(Q(Q(concluido=1) | Q(cancelado=1)) & Q(data_pedido__range=[self.request.GET.get('data_inicio'), self.request.GET.get('data_fim')]))
        else:
            return super().get_queryset().filter(Q(concluido=1 )| Q(cancelado=1))