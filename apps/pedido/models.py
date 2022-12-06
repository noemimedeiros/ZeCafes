from django.db import models
from django.utils import timezone
from barista.models import Barista
from zecafes import settings
 
# Create your models here.
class MetodoPagamento(models.Model):
    metodo = models.CharField(verbose_name="Método", max_length=15, null=False, blank=False)

    def __str__(self):
        return f'{self.metodo}'

    class Meta:
        db_table = "Metodo_pagamento"

class Pedidos(models.Model):
    numero = models.CharField(verbose_name="Número", max_length=8, unique=True, primary_key=True, null=False, blank=False)
    metodo_pagamento = models.ForeignKey(MetodoPagamento, verbose_name="Método de Pagamento", on_delete=models.CASCADE, null=False, blank=False, db_column="metodo_pagamento")
    descricao = models.CharField(verbose_name="Descrição", max_length=4000, null=False, blank=False)
    observacoes = models.CharField(verbose_name="Observações", max_length=40, null=True, blank=True)
    valor = models.DecimalField(verbose_name="Valor", null=False, blank=False, max_digits=8, decimal_places=2)
    data_pedido = models.DateField(verbose_name="Data do Pedido", null=False, blank=False, default=timezone.now)
    barista = models.ForeignKey(Barista, on_delete=models.CASCADE, verbose_name="Barista", null=True, blank=True, db_column="barista")
    concluido = models.BooleanField(verbose_name="Concluído", default=False)
    tempo_gasto = models.TimeField(verbose_name="Tempo Gasto", null=True, blank=True)
    cancelado = models.BooleanField(verbose_name="Cancelado", default=False)
    
    class Meta:
        db_table = "Pedidos"