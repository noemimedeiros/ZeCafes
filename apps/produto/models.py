from django.db import models

# Create your models here.
class TipoProduto(models.Model):
    tipo = models.CharField(verbose_name="Tipo", max_length=15, null=False, blank=False)

    def __str__(self):
        return f'{self.tipo}'

    class Meta:
        db_table = "Tipo_produto"

class Produtos(models.Model):
    nome = models.CharField(verbose_name="Nome", max_length=30, null=False, blank=False)
    imagem = models.ImageField(verbose_name="Imagem", max_length=30, null=False, blank=False)
    valor = models.DecimalField(verbose_name="Valor", null=False, blank=False, max_digits=8, decimal_places=2)
    tipo = models.ForeignKey(TipoProduto, on_delete=models.CASCADE, null=False, blank=False, db_column="tipo")
    disponivel = models.BooleanField(verbose_name="Disponível", null=False, blank=False)

    class Meta:
        db_table = "Produtos"