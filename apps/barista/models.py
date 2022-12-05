from django.db import models
from conta.models import Conta

# Create your models here.
class Barista(models.Model):
    conta_id = models.OneToOneField(Conta, on_delete=models.CASCADE, null=False, primary_key=True, db_column="conta_id")
    cpf = models.CharField(verbose_name="CPF", max_length=15, null=False, blank=False)
    telefone = models.CharField(verbose_name="Telefone", max_length=15, null=True, blank=True)
    data_nascimento = models.DateField(verbose_name="Data de Nascimento", null=False, blank=False)
    email = models.CharField(verbose_name="E-mail", max_length=30, null=False, blank=False)

    class Meta:
        db_table = "Barista"