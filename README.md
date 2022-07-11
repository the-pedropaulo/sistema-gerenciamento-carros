# sistema-gerenciamento-carros

*Requisitos:

NodeJs,
NestJs CLI,
Um gerenciador de pacotes (eg: npm, yarn, pnpm),
PostgresSQL ou Docker

# Rodar o Docker:

1) Instalar o docker
2) Na raiz do projeto, rodar "docker-compose up -d"
3) Para parar o docker, rodar "docker-compose down"

# Como iniciar a API:

1) Dê um git clone no repositório
2) Crie um .env com as configurações do .env.example
3) Rode o comando "npm install"
4) Rode o comando "npm run build"
5) Rode o comando "npm run start"

> Servidor rodando...

# Como utilizar as rotas da API:

> User Admin: 

email: 'vitorrbsilva@hotmail.com'

password: 'k5fCYlmor6EXjj^&4GsZBCz1Jha1M5n'

> A partir desse usuário admin você poderá fazer tudo dentro do sistema. 

> Para fazer login com como admin:

POST /auth/signin, 
body: {
    email, 
    password
}

> A partir do token recebido no response de /auth/signin, você poderá acessar as rotas:

POST /cars -> Cadastrar um carro 

PATCH /cars/:id_car -> Atualizar um carro 

DELETE /cars/:id_car > Deletar um carro 

GET /clients -> Listar todos os clientes

POST /clients -> Cadastrar um cliente

PATCH /clients/:id_user -> Atualizar um cliente

DELETE /clients/:id_user -> Deletar um cliente

> Rotas públicas:

GET /cars -> Listar todos os carros

> Filtros na rota GET /cars:

name = passar nome do carro
brand = passar marca do carro
limit (default = 10)
page (default = 1)

<strong>Ex: baseURL/cars?name=Celta&limit=5</strong>


