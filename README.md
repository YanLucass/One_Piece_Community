### One Piece Community

E se existisse um lugar onde os fãs da obra pudessem se encontrar para dar feedbacks sobre a série, criar publicações para demonstrar alguma ideia, teoria apenas interagir?
Com esse pensamento desenvolvi essa comunidade onde os usuários podem criar contas com fotos personalizadas e a partir daí criar publicações, comentar publicações de outros, dar like, 
dar feedback sobre alguns arcos da série etc. Essa aplicação ainda será expandida! 

Link do projeto em vídeo: https://www.linkedin.com/feed/update/urn:li:activity:7142531903697448960/

### Siga esses passos para rodar o projeto localmente:

Clone o repositório: git clone https://github.com/YanLucass/One_Piece_Community.git

### Instalando dependências

#Instale as do backend
cd One_Piece_Community/backend
npm i

#Frontend
cd ../frontend
npm i

### Configurando Variáveis de Ambiente

###Vou deixar duas opções, usar seu PostgresSQL local ou usar o ElephantSQL(Serviço de hospedagem de postgres em nuvem)

##ElephantSQL

Crie um banco de dados e pegue a url dele. Caso não tenha uma conta crie aqui: https://customer.elephantsql.com/login

Crie um arquivo .env na pasta do backend e preencha as variáveis de ambiente necessárias:

DB_URL=postgres://utavrqyf:VAEiFUpGKMPWa2jS15xDpWKpaHp13_NF@bubble.db.elephantsql.com/utavDFKDJFF (link de exemplo, não é válido)
SECRET=aquiosecretparaotoken
PORT

##PostgresSQL local

Subistitua o arquivo do db para ter a conexão assim:

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

Crie e preencha o dotenv

DB_USER=
DB_PASSWORD=
HOST=localhost
PORT=5432
DATABASE=
SECRET=
PORT=

###Inicie o projeto
npm start  (na pasta do backend e front)


 

