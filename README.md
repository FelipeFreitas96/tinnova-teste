# Instalando

Para instalar, utilize o PowerShell do Windows ou o terminal do Linux os comandos a seguir:

1. ```git clone https://github.com/FelipeFreitas96/tinnova-teste.git```

2. ```cd tinnova-teste```

3. ```npm install```

4. ```docker build -t mariadb-image -f docker/mariadb/Dockerfile .```

5. ```docker run -p 3366:3306 -d -v ${pwd}/docker/mariadb/config:/etc/mysql/conf.d -v ${pwd}/docker/mariadb/data:/var/lib/mysql --env-file .env --rm --name mariadb-container mariadb-image```

6. ```docker build -t node-image -f docker/node/Dockerfile .```
7. ```docker run -p 3333:80 -d --link mariadb-container --rm --name node-container node-image```
8. ```A API estará disponível em http://localhost:3333/v1/todo```

## Sobre
* Clean Architeture
* TDD
* MariaDB
* Docker

## API

| Método | Endpoint | Parâmetros | Descrição |
| ------------ | ------------ | ------------ | ------------ |
| GET | /v1/todo | {} | Listar todos os TODOs |
| GET | /v1/todo | { id: number } | Mostrar TODO |
| POST | /v1/todo | { description: string } | Criar um TODO |
| PUT | /v1/todo | { id: number, description: string } | Alterar um TODO |
| DELETE | /v1/todo | { id: number } | Deletar um TODO |
