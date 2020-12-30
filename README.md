# Instalando

Para instalar, utilize o PowerShell do Windows ou o terminal do Linux os comandos a seguir:

1. ```git clone https://github.com/FelipeFreitas96/tinnova-teste.git```

2. ```cd tinnova-teste```

3. ```npm install```

4. ```docker build -t mariadb-image -f docker/mariadb/Dockerfile .```

5. ```docker run -p 3366:3306 -d -v ${pwd}/docker/mariadb/config:/etc/mysql/conf.d -v ${pwd}/docker/mariadb/data:/var/lib/mysql --env-file .env --rm --name mariadb-container mariadb-image```

6. ```docker build -t node-image -f docker/node/Dockerfile .```
7. ```docker run -p 3333:80 -d --link mariadb-container --rm --name node-container node-image```
8. ```A API estará disponível em http://localhost:3333/v1/veiculos```

## Sobre
* Clean Architeture
* TDD
* MariaDB
* Docker

## API

| Método | Endpoint | Parâmetros | Descrição |
| ------------ | ------------ | ------------ | ------------ |
| GET | /v1/veiculos | {} | Retorna todos veículos |
| GET | /v1/veiculos/find | { veiculo?: string, marca?: string, ano?: integer, vendido?: bool } | Retorna os veículos de acordo com os parâmetros passados |
| GET | /v1/veiculos/{id} | {} | Retorna os detalhes do veículo |
| POST | /v1/veiculos | { veiculo: string, marca: string, ano: integer, descricao: string, vendido: bool } | Adiciona um novo veículo |
| PUT | /v1/veiculos/{id} | { veiculo: string, marca: string, ano: integer, descricao: string, vendido: bool } | Atualiza os dados de um veículo |
| PATCH | /v1/veiculos/{id} | { veiculo?: string, marca?: string, ano?: integer, descricao?: string, vendido?: bool } | Atualiza apenas alguns dados do veículo |
| DELETE | /v1/veiculos/{id} | {} | Apaga o veículo |
