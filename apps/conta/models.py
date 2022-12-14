from django.db import models
from django.conf import settings
from django.core.files.storage import FileSystemStorage
fs = FileSystemStorage(location=settings.STATIC_ROOT)

# Create your models here.
class Conta(models.Model):
    chave_seguranca = models.CharField(verbose_name="Chave de Segurança", max_length=9, null=False, blank=False, unique=True)
    foto = models.ImageField(verbose_name="Foto", max_length=40, null=False, blank=False, upload_to='usuario', storage=fs)
    nome = models.CharField(verbose_name="Nome", max_length=30, null=False, blank=False)
    tipo = models.BooleanField(verbose_name="Tipo", null=False)

    def __str__(self):
        return f'{self.nome}'

    class Meta:
        db_table = "Conta"