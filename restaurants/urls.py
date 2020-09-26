from django.urls import path
from .views import home_view, detail_view, update_view, teste_view


urlpatterns = [
    path('', home_view),
    path('teste/', teste_view),
    path('restaurants/<int:id>/', detail_view),
    path('restaurants/<int:id>/update/', update_view),
]
