from django.urls import path
from .api_views import (
    Base, Specific, Review
)


urlpatterns = [
    path('', Base.as_view()),
    path('<str:id>/', Specific.as_view()),
    path('<str:id>/addreview/', Review.as_view()),
]
