import os, re, json

from django.conf import settings

from dotenv import load_dotenv
from ftplib import FTP
import requests
from bs4 import BeautifulSoup


load_dotenv()





class FTPClient:
    def __init__(self, *args, **kwargs):
        self.hostFTP = os.getenv('hostFTP')
        self.usernameFTP = os.getenv('usernameFTP')
        self.passwordFTP = os.getenv('passwordFTP')
        self.local_path = kwargs.get('localpath', settings.DEFAULT_LOCAL_PATH)
        self.encoding = kwargs.get('encoding', settings.DEFAULT_FTP_ENCODING)
        self._connect_to_ftp()


    def _connect_to_ftp(self):
        try:
            self.ftp = FTP(self.hostFTP)
            self.ftp.encoding = self.encoding
            self.ftp.login(user=self.usernameFTP, passwd=self.passwordFTP)
        except Exception as _ex:
            print('[Ошибка]: ', _ex)


    def download_file(self, remote_path):
        try:
            os.makedirs(os.path.dirname(self.local_path), exist_ok=True)
            local_file_path = os.path.join(self.local_path, os.path.basename(remote_path))
            
            with open(local_file_path, 'wb') as f:
                self.ftp.retrbinary(f'RETR {remote_path}', f.write)
                
        except Exception as _ex:
            print('[Ошибка]: ', _ex)


    def upload_file(self, remote_path, server_path):
        with open(remote_path, 'rb') as file:
            self.ftp.storbinary(f'STOR {server_path}', file)
            print(f"Uploaded: {remote_path} to {server_path}")

    
    def close_connect(self):
        self.ftp.close()



class FileManager:
    ''' Работа с файлами '''
    def __init__(self, *args, **kwargs):
        self.encoding = kwargs.get('encoding', settings.DEFAULT_FTP_ENCODING)
        self.local_path_to_js = kwargs.get('local_path_to_js', settings.LOCAL_PATH_TO_JS)
        self.local_path_to_css = kwargs.get('local_path_to_css', settings.LOCAL_PATH_TO_CSS)


    def fix_json(self, json_str):
        ''' Приведение переменной к JSON-формату '''
        js_var = json_str.replace("'", '"').strip()
        js_var = re.sub(r',\s*}', '}', js_var)
        js_var = re.sub(r',\s*]', ']', js_var)
        return  json.loads(js_var)
    

    def get_js_var(self, file_path, var_name):
        ''' Анализ JS и получение переменной '''
        with open(file_path, 'r', encoding=self.encoding) as file:
            content = file.read()

        try:
            pattern = rf'const\s+{var_name}(_str)?\s*=\s*(.*?)(?=(;|function|\/\/))'
            match = re.search(pattern, content, re.DOTALL)
              
            if match:
                return self.fix_json(match.group(2))
            else:
                print(f'[ОШИБКА]: Переменная {var_name} или {var_name}_str не найдена в файле {file_path}')
                return None
        except Exception as e:
            print(f'[ОШИБКА]: Не удалось получить переменную {var_name} из файла {file_path}: {e}')
            return None
        
        
    def replace_js_var(self, new_var, var_name):
        ''' Замена переменной в JS-файле '''
        body_unicode = new_var.decode('windows-1251', errors='ignore')
        new_data = json.loads(body_unicode)
        json_str = json.dumps(new_data['data'], ensure_ascii=False)
        new_var = json_str.encode('windows-1251')
        new_var_str = new_var.decode('utf-8', errors='ignore')
        json_data = json.dumps(new_var_str, ensure_ascii=False)

        with open(self.local_path_to_js, 'r', encoding='windows-1251') as file:
            content = file.read()

        pattern = rf'const\s+{var_name}(_str)?\s*=\s*(.*?)(?=(;|function|\/\/))'
        match = re.search(pattern, content, re.DOTALL)

        if match:
            content = content.replace(match.group(0), f'const {var_name}_str = {json_data};\n')
        else:
            print(f'Переменная {var_name} или {var_name}_str не найдена в файле JavaScript.')

        with open(self.local_path_to_js, 'w', encoding='windows-1251') as file:
            file.write(content)


    def get_colors(self, var_name):
        ''' Анализ CSS и получение значения переменной '''
        with open(self.local_path_to_css, 'r', encoding=self.encoding) as file:
            content = file.read()

        try:
            # Преобразуем имя переменной в формат с двойными тире
            var_name_pattern = f'--{var_name.replace("_", "-")}'
            pattern = rf'{var_name_pattern}\s*:\s*(.*?);'
            match = re.search(pattern, content, re.DOTALL)
              
            if match:
                return match.group(1).strip()
            else:
                print(f'[ОШИБКА]: Переменная {var_name_pattern} не найдена в файле {self.local_path_to_css}')
                return None
        except Exception as e:
            print(f'[ОШИБКА]: Не удалось получить переменную {var_name_pattern} из файла {self.local_path_to_css}: {e}')
            return None



class PageManager:
    def __init__(self, *args, **kwargs):
        self.baseUrl = kwargs.get('baseUrl', settings.MAIN_SERVER_URL)
        self.encoding = kwargs.get('encoding', settings.DEFAULT_FTP_ENCODING)


    def _getPage(self, pageName):
        url = f'{self.baseUrl}/{pageName}'
        response = requests.get(url)

        if response.status_code == 200:
            html_content = response.text
            soup = BeautifulSoup(html_content, 'html.parser')
            return soup

        raise ConnectionError     


    def getPageObject(self, pageName):
        page = self._getPage(pageName)
        news_element = page.find('main').find('div', class_='container')

        if news_element:
            def parse_element(element):
                obj = {
                    'type': f"<{element.name}>",
                    'class': element.get('class', [None])[0]
                }

                # Определение полей 
                if not list(element.find_all(recursive=False)):
                    obj['text'] = element.get_text(strip=True)
                if element.name == 'a':
                    obj['text'] = element.get_text(strip=True)
                    obj['href'] = element.get('href')
                elif element.name == 'img':
                    obj['alt'] = element.get('alt')
                    obj['src'] = element.get('src')
                    del obj['text']
                elif (element.name in ['h1', 'h2', 'strong']) and (not element.children):
                    obj['text'] = element.get_text(strip=True)
                
                # Формирование дочерних узлов
                children = [parse_element(child) for child in element.find_all(recursive=False) if child.name]
                if children:
                    obj['children'] = children

                return obj

            exclude_nodes = ['br', 'div']
            parsed_elements = [parse_element(child) for child in news_element.find_all(recursive=False) if child.name not in exclude_nodes]
        else:
            print(f'Страницу {pageName} невозможно распарсить')

        return parsed_elements
    
    
    def makeHTMLmarkup(self, pageObjects) -> str:
        types = {
            '<h1>': 'title',
            '<p>': 'newsParagraph',
            '<strong>': 'newsStrong',
            '<h2>': 'newsSubtitle',
            '<img>': 'newsPageImage',
            '<a>': 'newsLink',
        }

        def get_markup(item, types):
            item_type = item['type']
            class_name = types.get(item_type, '')
            text = item.get('text', '')
            href = item.get('href', '')
            src = item.get('src', '')

            if item_type == '<h1>':
                return f'<h1 class="{class_name}">{text}</h1>\n'
            elif item_type == '<h2>':
                return f'<p class="{types["<p>"]}"><strong class="{types["<strong>"]}"><h2 class="{class_name}">{text}</h2></strong></p>\n'
            elif item_type == '<strong>':
                return f'<strong class="{class_name}">{text}</strong>\n'
            elif item_type == '<p>':
                return f'<p class="{class_name}">{text}</p>\n'
            elif item_type == '<a>':
                return f'<p class="{types["<p>"]}"><a href="{href}" class="{class_name}">{text}</a></p>\n'
            elif item_type == '<img>':
                return f'<p class="{types["<p>"]}"><img src="{src}" class="{class_name}" /></p>\n'
            else:
                return ''


        def recurse_make_markup(item, types):
            result = ''
            if 'children' in item and item['children']:
                for child in item['children']:
                    result += recurse_make_markup(child, types)
            else:
                result += get_markup(item, types)
            return result

        result = ''.join(recurse_make_markup(item, types) for item in pageObjects)
        return result


    def injectMarkup(self, markup, local_path):
        with open(local_path, 'r', encoding=self.encoding) as file:
            content = file.read()

        soup = BeautifulSoup(content, 'html.parser')
        main_element = soup.find('main').find('div', class_='container')
        if main_element:
            main_element.clear()
            new_content = BeautifulSoup(markup, 'html.parser')
            for element in new_content:
                main_element.append(element)

        soup_str = soup.prettify(formatter=None)

        with open(local_path, 'w', encoding=self.encoding) as file:
            file.write(soup_str)