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

    def __init__(self, *args, **kwargs):
        super(ContaForm, self).__init__(*args, **kwargs)
        self.fields['chave_seguranca'].required = False

class BaristaForm(forms.ModelForm):
    class Meta:
        model = Barista
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(BaristaForm, self).__init__(*args, **kwargs)
        self.fields['conta'].required = False

class PedidosForm(forms.ModelForm):
    class Meta:
        model = Pedidos
        fields = '__all__'

class PedidosConcluirForm(forms.ModelForm):
    class Meta:
        model = Pedidos
        fields = ['concluido', 'cancelado', 'barista', 'tempo_gasto']

class ProdutosForm(forms.ModelForm):
    class Meta:
        model = Produtos
        fields = '__all__'

class ProdutosDisponivelForm(forms.ModelForm):
    class Meta:
        model = Produtos
        fields = ['id','disponivel']
