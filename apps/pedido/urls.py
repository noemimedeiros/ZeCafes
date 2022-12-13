from django.urls import path

from .views import HistoricoPedidos

app_name =  'pedidos'

urlpatterns = [
    path('historico_pedidos/', HistoricoPedidos.as_view(), name='historico_pedidos'),
]