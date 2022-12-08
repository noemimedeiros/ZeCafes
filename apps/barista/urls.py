from django.urls import path

from . import views

app_name =  'barista'

urlpatterns = [
    path('venda/', views.tela_venda.as_view(), name='tela_venda'),
    path('atendimento/pedidos/', views.tela_atendimento_pedidos.as_view(), name='tela_atendimento'),
    path('atendimento/produtos', views.tela_atendimento_produtos.as_view(), name='tela_produtos'),
    path('produto_disponivel/<pk>/', views.produto_disponivel.as_view(), name='produto_disponivel'),
    path('baristas/', views.lista_baristas.as_view(), name='lista-baristas'),
    path('baristas/cadastro/', views.cadastro_barista.as_view(), name='cadastro_baristas'),
    path('baristas/edicao/<pk>/', views.editar_barista.as_view(), name='editar_baristas'),
    path('baristas/excluir/<pk>/', views.excluir_barista.as_view(), name='excluir_barista'),
    path('finalizar_pedido/<pk>/', views.finalizar_pedido.as_view(), name='finalizar_pedido'),
]