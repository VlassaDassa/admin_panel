from rest_framework.views import APIView, Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import json

from . import services



file_manager = services.FileManager()



class MenuAPIView(APIView):

    def get(self, request):
        ''' Получение структуры меню из JS файла '''
        
        try:
            ftp_client = services.FTPClient()
            ftp_client.download_file(settings.PATH_TO_JS)
            nav = file_manager.get_js_var(settings.LOCAL_PATH_TO_JS, 'navigations')
            ftp_client.close_connect()
            return Response(nav, status=status.HTTP_200_OK)
        except Exception as _ex:
            print(f'Ошибка - {_ex}')
            return Response({'success': False, 'error': str(_ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @csrf_exempt
    def post(self, request):
        ''' Обновление переменной navigations в JS файле '''
        
        try:
            ftp_client = services.FTPClient()

            file_manager.replace_js_var(request.body, 'navigations')
            ftp_client.upload_file(settings.LOCAL_PATH_TO_JS, settings.PATH_TO_JS)
            ftp_client.close_connect()
            
            return Response({'success': True}, status=status.HTTP_200_OK)
        except json.JSONDecodeError as e:
            print(f'Ошибка декодирования JSON: {e}')
            return Response({'success': False, 'error': 'Invalid JSON'}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as _ex:
            print(f'Ошибка - {_ex}')
            return Response({'success': False, 'error': str(_ex)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        


class EditPageAPIView(APIView):
    

    def get(self, request, *args, **kwargs):
        try:
            pageName = kwargs.get('pageName')
            pageManage = services.PageManager()
            page = pageManage.getPageObject(pageName)
            
            return Response(page)

        except Exception as _ex:
            print('Error: ',  _ex)
            return Response({'error': str(_ex)}, status=500)