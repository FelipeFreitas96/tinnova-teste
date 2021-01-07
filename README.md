# 🧠  O que foi utilizado
---
* Clean Architeture
* TDD
* MariaDB
* Docker
* Swagger

# ⚙️ Instalando
---
Para instalar, utilize o PowerShell do Windows ou o terminal do Linux os comandos a seguir:

1. ```git clone https://github.com/FelipeFreitas96/tinnova-teste.git```

2. ```cd tinnova-teste```

3. ```npm install```

4. ```docker build -t mariadb-image -f docker/mariadb/Dockerfile .```

5. ```docker run -p 3306:3306 -d -v ${pwd}/docker/mariadb/config:/etc/mysql/conf.d -v ${pwd}/docker/mariadb/data:/var/lib/mysql --env-file .env --rm --name mariadb-container mariadb-image```

6. ```docker build -t node-image -f docker/node/Dockerfile .```
7. ```docker run -p 80:80 -d --link mariadb-container --rm --name node-container node-image```

# 📍  Endpoints
---
```http://localhost/v1/docs``` para acessar a documentação do Swagger.
```http://localhost/v1/vehicles``` para acessar a API.