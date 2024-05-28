from django.urls import path
from . import views

urlpatterns = [
    path('menu', views.MenuAPIView.as_view(), name='menu'),
    path('page/<pageName>', views.EditPageAPIView.as_view(), name='page')
]
