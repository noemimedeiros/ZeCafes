from django import forms
from conta.models import Conta
from barista.models import Barista
from pedido.models import Pedidos
from produto.models import Produtos
from zecafes import settings

class ContaForm(forms.ModelForm):
    class Meta:
        model = Conta
        fields = '__all__'

class BaristaForm(forms.ModelForm):
    class Meta:
        model = Barista
        fields = '__all__'

class PedidosForm(forms.ModelForm):
    class Meta:
        model = Pedidos
        fields = '__all__'

class PedidosConcluirForm(forms.ModelForm):
    class Meta:
        model = Pedidos
        fields = ['concluido', 'cancelado']

class ProdutosForm(forms.ModelForm):
    class Meta:
        model = Produtos
        fields = '__all__'

class ProdutosDisponivelForm(forms.ModelForm):
    class Meta:
        model = Produtos
        fields = ['id','disponivel']
