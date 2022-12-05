from conta.models import Conta

class ZecafesView():
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["usuario"] = Conta.objects.get(id=self.request.session['usuario_id'])
        return context
    