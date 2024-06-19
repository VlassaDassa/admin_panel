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
        ''' Получение элементов страницы в виде объектов '''
        try:
            pageName = kwargs.get('pageName')
            pageManage = services.PageManager()
            page = pageManage.getPageObject(pageName)
            
            return Response(page)

        except Exception as _ex:
            print('Error: ',  _ex)
            return Response({'error': str(_ex)}, status=500)


    def post(self, request, *args, **kwargs):
        ''' Получение с клиента объектов страницы и сохранение их на сервере '''
        try:
            page_name = kwargs.get('pageName')
            local_path = settings.DEFAULT_LOCAL_PATH + page_name
            remote_path = f'htdocs/{page_name}' 

            data = json.loads(request.body)['data']
            page_manager = services.PageManager()
            markup = page_manager.makeHTMLmarkup(data)

            ftp_client = services.FTPClient()
            ftp_client.download_file(remote_path)

            page_manager.injectMarkup(markup, local_path)
            ftp_client.upload_file(local_path, remote_path)

            return Response({'success': True})

        except Exception as _ex:
            print('Error: ',  _ex)
            return Response({'error': str(_ex)}, status=500)
        


class EditColorsApiView(APIView):
    def __init__(self, *args, **kwargs):
        # Получение всех необходимых переменных
        self.colors = {
            'base-color': ['base', 'Базовый'],
            'accent-color': ['accent', 'Акцентный'],
            'secondary-color': ['secondary', 'Второстепенный'],
            'text-color': ['textColor', 'Цвет текста'],
        }
    

    def get(self, request, *args, **kwargs):
        ''' Получение всех цветов '''
        try:
            ftp_client = services.FTPClient()
            ftp_client.download_file(settings.PATH_TO_CSS)
            ftp_client.close_connect()

            send_data = []
            for key in self.colors.keys():
                send_data.append({
                    'name': self.colors[key][0],
                    'displayName': self.colors[key][1],
                    'color': file_manager.get_colors(key)[0],
                    'dark_theme': file_manager.get_colors(key)[1],
                })

            return Response(send_data)

        except Exception as _ex:
            print('Error: ',  _ex)
            return Response({'error': str(_ex)}, status=500)


    @csrf_exempt
    def post(self, request, *args, **kwargs):
        ''' Получение с клиента новой цветовой схемы '''
        try:
            # Изменение названий цветов
            new_data = []
            data = json.loads(request.body)['data']
            for i in data:
                for ii in self.colors:
                    if i['name'] == self.colors[ii][0]:
                        new_data.append({
                            'name': ii,
                            'color': i['color'],
                            'dark_theme': i['dark_theme']
                        })
            
            file_manager.saveColors(new_data)
            
            # Отправка файла
            ftp_client = services.FTPClient()
            ftp_client.upload_file(settings.LOCAL_PATH_TO_CSS, settings.PATH_TO_CSS)
            ftp_client.close_connect()
            
            return Response({'success': True}, status=status.HTTP_200_OK)

        except Exception as _ex:
            print('Error: ',  _ex)
            return Response({'error': str(_ex)}, status=500)

    

class FooterContactsApiView(APIView):
    def get(self, request, *args, **kwargs):
        ''' Получение контактных данных с подвала '''
        try:
            ftp_client = services.FTPClient()
            ftp_client.download_file(settings.PATH_TO_INCLUDE)
            ftp_client.download_file(settings.PATH_TO_INDEX)
            ftp_client.close_connect()

            send_data = file_manager.get_footer_contacts(settings.LOCAL_PATH_TO_INCLUDE)
            return Response(send_data)

        except Exception as _ex:
            print('Error: ',  _ex)
            return Response({'error': str(_ex)}, status=500)
        

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        ''' Получение с клиента новых контактных данных '''
        try:
            # Изменение контактных данных
            data = json.loads(request.body)['data']
            file_manager.update_footer_contacts(settings.LOCAL_PATH_TO_INCLUDE, data)
            file_manager.update_footer_contacts(settings.LOCAL_PATH_TO_INDEX, data)
            
            # Отправка файла
            ftp_client = services.FTPClient()
            ftp_client.upload_file(settings.LOCAL_PATH_TO_INCLUDE, settings.PATH_TO_INCLUDE)
            ftp_client.upload_file(settings.LOCAL_PATH_TO_INDEX, settings.PATH_TO_INDEX)
            ftp_client.close_connect()
            
            return Response({'success': True}, status=status.HTTP_200_OK)

        except Exception as _ex:
            print('Error: ',  _ex)
            return Response({'error': str(_ex)}, status=500)