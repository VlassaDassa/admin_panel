from django.urls import path
from . import views

urlpatterns = [
    path('menu', views.MenuAPIView.as_view(), name='menu'),
    path('page/<pageName>', views.EditPageAPIView.as_view(), name='page'),
    path('colors', views.EditColorsApiView.as_view(), name='colors'),
    path('footer_contacts', views.FooterContactsApiView.as_view(), name='footer_contacts'),
]
