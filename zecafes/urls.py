from django.contrib import admin
from django.urls import path, include
from apps.sistema.views import tela_login
from django.conf.urls import handler404

app_name = "zecafes"

urlpatterns = [
    path('barista/', include('barista.urls')),
    path('pedidos/', include('pedido.urls')),
    path('', tela_login.as_view(), name='login'),
    path('admin/', admin.site.urls),
]