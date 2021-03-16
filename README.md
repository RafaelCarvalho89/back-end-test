# Descrição do Projeto.

<p>Este projeto é a implementação da resolução de um teste para uma vaga de Desenvolvedor Back End.</p>

<p>Ele se resume basicamente em uma API de provas, mantendo o gerenciamento de Provas (Exams), e de Questões da Prova (Questions).</p>

<p>A seguir, se encontram as instruções de instalação do projeto, e de como consumir a API.</p>


## Sumário
<details>

<summary><strong>Details</strong></summary>

* [Instalação](#instalacao)
* [API](#api)
  * [Provas](#provas)
    * [Adicionar Prova - [POST]](#adicionar-prova)
    * [Obter Prova - [GET]](#obter-prova)
    * [Listar Provas - [GET]](#listar-provas)
    * [Atualizar Prova - [UPDATE]](#atualizar-prova)
    * [Deletar Prova - [DELETE]](#deletar-prova)

</details>


## Instalação

<p>Clonando o projeto</p>

```console
git clone https://github.com/RafaelCarvalho89/back-end-test.git
```

<p>Instalando as dependencias</p>

```console
npm install
```


## API

Rota de servidor local

`HOST` - http://localhost:5050


## Provas



### Adicionar Prova

  `POST`/api/exam/new

  <details>

  #### Parâmetros da requisição
  |Tipo|Nome|Descrição|Schema|
  |---|---|---|---|
  |**Body**|**name**  <br>*required*|O nome da Prova.|string|
  |**Body**|**description**  <br>*required*|Descrição da Prova.|string|
  |**Body**|**type**  <br>*required*|Tipo da Prova. Obs.: `"ONLINE"` ou `"OFFLINE"`  |string|
  |**Body**|**questions**  <br>*optional*|Questões da Prova. Obs: Um Array de `question`. |[question[]](#question)|


  #### Question
  |Tipo|Nome|Descrição|Schema|
  |---|---|---|---|
  |**Body**|**statement**  <br>*required*|O enunciado da Questão.|string|
  |**Body**|**options**  <br>*required*|Opções da Questão. Obs: Um Array de `option`. |[option[]](#option)|


  #### Option
  |Tipo|Nome|Descrição|Schema|
  |---|---|---|---|
  |**Body**|**key**  <br>*required*|A chave da opção.|string|
  |**Body**|**value**  <br>*required*|O valor da opção.|string|
  |**Body**|**correct**  <br>*required*|Se a opção é verdadeira ou falsa. Obs.: `true` ou `false`|boolean|



**Exemplo da requisição passando uma prova `com questões`.**
```json
{
  "name": "Prova AMARELA",
  "description": "Prova completa",
  "type": "ONLINE",
  "questions": [
    {
      "statement": "Qual o sentido da vida, do universo e tudo mais?",
      "options": [
        {
          "key": "a",
          "value": "viver",
          "correct": false
        },
        {
          "key": "b",
          "value": "beber café",
          "correct": false
        },
        {
          "key": "c",
          "value": "codar",
          "correct": false
        },
        {
          "key": "d",
          "value": "42",
          "correct": true
        }
      ]
    }
  ]
}
```



**Exemplo de resposta da requisição passando uma prova `com questoes`.**
```json
{
  "id": "6050f9e222a72e7089ed1988",
  "name": "Prova AMARELA",
  "description": "Prova completa",
  "type": "ONLINE",
  "questions": [
    {
      "id": "6050f9e222a72e7089ed1987",
      "statement": "Qual o sentido da vida, do universo e tudo mais?",
      "options": [
        {
          "key": "a",
          "value": "viver",
          "correct": false,
          "id": "6050f9e222a72e7089ed1983"
        },
        {
          "key": "b",
          "value": "beber café",
          "correct": false,
          "id": "6050f9e222a72e7089ed1984"
        },
        {
          "key": "c",
          "value": "codar",
          "correct": false,
          "id": "6050f9e222a72e7089ed1985"
        },
        {
          "key": "d",
          "value": "42",
          "correct": true,
          "id": "6050f9e222a72e7089ed1986"
        }
      ]
    }
  ]
}
```



**Exemplo da requisição passando uma prova `sem questoes`.**
```json
{
  "name": "Prova AZUL",
  "description": "Prova sem questões",
  "type": "ONLINE"
}
```


**Exemplo de resposta da requisição passando uma prova `SEM` questoes.**
```json
{
  "id": "6050f9e222a72e7089ed2021",
  "name": "Prova AZUL",
  "description": "Prova sem questões",
  "type": "ONLINE",
  "questions": []
}
```
</details>


### Obter Prova

  `GET`/api/exam

  <details>

  #### Parâmetros da requisição
  |Tipo|Nome|Descrição|Schema|
  |---|---|---|---|
  |**Body**|**id**  <br>*required*|O id da Prova.|string|


  **Exemplo da requisição.**
  ```json
  {
    "id": "6050f9e222a72e7089ed1988"
  }
  ```


  **Exemplo de resposta da requisição obter uma prova.**
  ```json
  {
    "id": "6050f9e222a72e7089ed1988",
    "name": "Prova AMARELA",
    "description": "Prova completa",
    "type": "ONLINE",
    "questions": [
      {
        "id": "6050f9e222a72e7089ed1987",
        "statement": "Qual o sentido da vida, do universo e tudo mais?",
        "options": [
          {
            "key": "a",
            "value": "viver",
            "correct": false,
            "id": "6050f9e222a72e7089ed1983"
          },
          {
            "key": "b",
            "value": "beber café",
            "correct": false,
            "id": "6050f9e222a72e7089ed1984"
          },
          {
            "key": "c",
            "value": "codar",
            "correct": false,
            "id": "6050f9e222a72e7089ed1985"
          },
          {
            "key": "d",
            "value": "42",
            "correct": true,
            "id": "6050f9e222a72e7089ed1986"
          }
        ]
      }
    ]
  }
  ```
  </details>

### Listar Provas

  `GET`/api/exams - **Obs.: `exams`, no plural.**

  <details>

  #### Requisição sem Parâmetros



  **Exemplo de resposta da requisição listar provas.**
  ```json
  [
    {
      "name": "Prova AMARELA",
      "description": "Prova sem questões",
      "type": "OFFLINE",
      "questions": [],
      "id": "60500a71fef08553a78d1948"
    },
    {
      "name": "Prova AZUL",
      "description": "Prova sem questões",
      "type": "ONLINE",
      "questions": [],
      "id": "605104ab28fda7815af489ae"
    }
  ]
  ```
  </details>

