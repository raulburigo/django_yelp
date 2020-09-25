from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('', include('restaurants.urls')),
    path('accounts/', include('accounts.urls')),
    path('accounts/', include('django.contrib.auth.urls')),
    path('api/v1/restaurants/', include('restaurants.endpoints')),
    path('admin/', admin.site.urls),
]
