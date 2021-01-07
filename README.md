[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=FelipeFreitas96_tinnova-teste&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=FelipeFreitas96_tinnova-teste) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=FelipeFreitas96_tinnova-teste&metric=alert_status)](https://sonarcloud.io/dashboard?id=FelipeFreitas96_tinnova-teste)

# 🧠  O que foi utilizado

* Clean Architecture
* TDD
* MariaDB
* Docker
* Swagger

# ⚙️ Instalando

Para instalar, utilize o PowerShell do Windows ou o terminal do Linux os comandos a seguir:

> git clone https://github.com/FelipeFreitas96/tinnova-teste.git

> cd tinnova-teste

> npm install

> docker build -t mariadb-image -f docker/mariadb/Dockerfile .

> docker run -p 3306:3306 -d -v ${pwd}/docker/mariadb/config:/etc/mysql/conf.d -v ${pwd}/docker/mariadb/data:/var/lib/mysql --env-file .env --rm --name mariadb-container mariadb-image

> docker build -t node-image -f docker/node/Dockerfile .

> docker run -p 80:80 -d --link mariadb-container --rm --name node-container node-image

# 📍  Endpoints

> ```http://localhost/v1/docs``` para acessar a documentação do Swagger.

> ```http://localhost/v1/vehicles``` para acessar a API.