# ZeCafes

## Como rodar o Projeto

#### 1. Clone e projeto e entre na pasta

        $ git clone https://github.com/noemimedeiros/ZeCafes.git
        $ cd ZeCafes/
        
#### 2. Crie uma virtualenv, ative e instale as dependências

        $ python -m env venv
        $ .env/Scripts/activate
        $ pip install -r requirements.txt
        
#### 3. Crie o arquivo `.env` na raíz do projeto como uma cópia do `.env.example`

        $ cp .env.example .env
        $ cp .env.example code/.env

#### 4. Altere o arquivo `.env`, definindo as variáveis de ambiente necessárias para o projeto funcionar corretamente

- Local

        DB_NAME=
        DB_USER=
        DB_PASSWORD=
        DB_HOST=
        DB_PORT=

#### 5. Utilize o arquivo "backup.sql" para configurar o banco de dados.
        
#### 6. Rode as migrações do projeto

        $ python manage.py migrate
        $ python manage.py makemigrations

#### 7. Rode o servidor local do Django

        $ python manage.py runserver
