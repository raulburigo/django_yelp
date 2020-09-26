from django.urls import path
from .views import home_view, detail_view, update_view


urlpatterns = [
    path('', home_view),
    path('restaurants/<int:id>/', detail_view),
    path('restaurants/<int:id>/update/', update_view),
]
