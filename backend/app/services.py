import os, re, json

from django.conf import settings

from dotenv import load_dotenv
from ftplib import FTP




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