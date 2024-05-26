from django.urls import path
from . import views

urlpatterns = [
    path('menu', views.MenuAPIView.as_view(), name='menu')
]
