<h1 align="center">
  <img src="https://github.com/rgarcia-s/gympoint/raw/master/mobile/src/assets/logo.png" />
</h1>
<h4 align="center">
  Gympoint - Desafio final bootcamp GoStack - Rocketseat
</h4>


<h5>Sobre o projeto</h5>

  Este projeto foi desenvolvido ao longo do Bootcamp GoStack da RocketSeat e serve como avaliação final.
  
  O sistema serve para fazer o gerenciamento básico de academias, tendo sua parte WEB voltada para a administração do estabelecimento com as funções de criar, editar e excluir alunos, planos e matrículas, além de responder pedidos de auxílio feitos pelos alunos. Quando matrículas são criadas ou editas e pedidos de auxílio respondidos o aluno recebe um e-mail com as informações.
  A parte Mobile é voltada para os alunos e tem as funções de realizar check-in e fazer pedidos de auxílio e ler a resposta da academia. Para iniciar o projeto foi utilizado o template avançado para react-native da rocketseat que pode ser encontrado em <a href="https://github.com/Rocketseat/react-native-template-rocketseat-advanced">Rocketseat React Native Advanced Template</a>.
  
  O projeto foi desenvolvido e testado apenas para ambiente Android. A execução em sistema IOS pode causar erros.

<h5>Tecnologias</h5>

<ul>
  <li>Node.js</li>
  <li>ReactJS</li>
  <li>React Native</li>
</ul>

<h5>Requisitos</h5>

<ul>
  <li>Node.js</li>
  <li>ReactJS</li>
  <li>React Native</li>
  <li>React Native CLI</li>
  <li>Ambiente de testes Android</li>
  <li>Postgres</li>
  <li>MongoDB</li>
  <li>Redis</li>
  <li>Docker</li>
  <li>Git</li>
</ul>

<h5>Instruções</h5>

Clonar o repositório.

Subir containers no docker com os bancos necessários. Exemplo:

 - docker run --name gympoint -e POSTGRES_PASSWORD=gympoint -p 5432:5432 -d postgres:11

 - docker run --name gympointmongo -p 27017:27017 -d -t mongo

 - docker run --name gympointredis -p 6379:6379 -d -t redis:alpine

Executar o comando yarn nas pastas "back", "front" e "mobile" para baixar as dependências do projeto.

Na pasta back:
 
 - Criar um arquivo .env com as sua variáveis de ambiente baseado no arquivo .env.example.

 - Executar os comandos "yarn sequelize db:migrate" e "yarn sequelize db:seed:all".

 - Executar os comandos "yarn dev" e "yarn queue" para rodar o servidor e a fila de e-mails.
 
Na pasta front:
  
 - Executar o comando "yarn start" para rodar a parte web do projeto
 
 - Fazer login de acordo utilizando as credencias do arquivo de seeds. (Originalmente login: admin@gympoint.com - senha: 123456 - Ou de acordo com suas modificações.
 
Na pasta mobile: 

 - Executar o comando "react-native start" para rodar o Metro Bundler
 
 - Executar o comando "react-native run-android" para instalar o projeto no seu android
 
 - É necessário ter criado o primeiro aluno no sistema web para poder fazer login no sistema mobile utilizando o ID 1.
 
