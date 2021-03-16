# Descrição do Projeto.

<p>Este projeto é a implementação da resolução de um teste para uma vaga de Desenvolvedor Back End.</p>

<p>Ele se resume basicamente em uma API de provas, mantendo o gerenciamento de Provas (Exams), e de Questões da Prova (Questions).</p>

<p>A seguir, se encontram as instruções de instalação do projeto, e de como consumir a API.</p>


## Sumário

* [1.Instalação](#1-instalacao)
* [2.API](#2-api)
* [3.Provas](#3-provas)
  * [3.1.Adicionar Prova - [POST]](#31-adicionar-prova)
  * [3.2.Obter Prova - [GET]](#32-obter-prova)
  * [3.3.Listar Provas - [GET]](#33-listar-provas)
  * [3.4.Atualizar Prova - [PUT]](#34-atualizar-prova)
  * [3.5.Deletar Prova - [DELETE]](#35-deletar-prova)
* [4.Questões](#3-questoes)
  * [4.1.Adicionar Questão - [POST]](#31-adicionar-questao)
  * [4.2.Obter Questão - [GET]](#32-obter-questao)
  * [4.3.Listar Questões - [GET]](#33-listar-questoes)
  * [4.4.Atualizar Questão - [PUT]](#34-atualizar-questao)
  * [4.5.Deletar Questão - [DELETE]](#35-deletar-questao)


## 1 Instalação

<p>Clonando o projeto</p>

```console
git clone https://github.com/RafaelCarvalho89/back-end-test.git
```

<p>Instalando as dependencias</p>

```console
npm install
```


## 2 API

Rota de servidor local

`HOST` http://localhost:5050


## 3 Provas


  - ### 3.1 Adicionar Prova

  `POST` /api/exam/new

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


  **Exemplo da requisição passando uma prova `COM QUESTÕES`.**
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


  **`200 OK` - Exemplo de resposta da requisição passando uma prova `COM QUESTÕES` e com `SUCESSO`.**
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


  **Exemplo da requisição passando uma prova `SEM QUESTÕES`.**
  ```json
  {
    "name": "Prova AZUL",
    "description": "Prova sem questões",
    "type": "ONLINE"
  }
  ```


  **`200 OK` - Exemplo de resposta da requisição passando uma prova `SEM QUESTÕES` e com `SUCESSO`.**
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


  - ### 3.2 Obter Prova

  `GET` /api/exam

  <details>

  #### Parâmetros da requisição
  |Tipo|Nome|Descrição|Schema|
  |---|---|---|---|
  |**Body**|**id**  <br>*required*|O id da Prova.|string|


  **Exemplo da requisição obter prova.**
  ```json
  {
    "id": "6050f9e222a72e7089ed1988"
  }
  ```


  **`200 OK` - Exemplo de resposta da requisição obter prova com `SUCESSO`.**
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

  - ### 3.3 Listar Provas

  `GET` /api/exams 
  
  - **Obs.: `exams`, no plural.**

  <details>

  #### Requisição sem Parâmetros

  **`200 OK` - Exemplo de resposta da requisição listar provas com `SUCESSO`.**
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


  - ### 3.4 Atualizar Prova

  `PUT` /api/exam/update

  <details>

  #### Parâmetros da requisição
  |Tipo|Nome|Descrição|Schema|
  |---|---|---|---|
  |**Body**|**id**  <br>*required*|O id da Prova.|string|
  |**Body**|**name**  <br>*required*|O nome da Prova.|string|
  |**Body**|**description**  <br>*required*|Descrição da Prova.|string|
  |**Body**|**type**  <br>*required*|Tipo da Prova. Obs.: `"ONLINE"` ou `"OFFLINE"`  |string|
  |**Body**|**questions**  <br>*required*|Questões da Prova. Obs: Um Array de `question`. |[question[]](#question)|


  #### Question
  |Tipo|Nome|Descrição|Schema|
  |---|---|---|---|
  |**Body**|**id**  <br>*required*|O id da Questão.|string|
  |**Body**|**statement**  <br>*required*|O enunciado da Questão.|string|
  |**Body**|**options**  <br>*required*|Opções da Questão. Obs: Um Array de `option`. |[option[]](#option)|


  #### Option
  |Tipo|Nome|Descrição|Schema|
  |---|---|---|---|
  |**Body**|**key**  <br>*required*|A chave da opção.|string|
  |**Body**|**value**  <br>*required*|O valor da opção.|string|
  |**Body**|**correct**  <br>*required*|Se a opção é verdadeira ou falsa. Obs.: `true` ou `false`|boolean|


  **Exemplo da requisição para atualização de prova.**
  ```json
  {
    "id": "6050f9e222a72e7089ed1988",
    "name": "Prova AMARELA 2021 ATUALIZADA",
    "description": "Prova completa 2021 ATUALIZADA",
    "type": "ONLINE",
    "questions": [
      {
        "statement": "Qual o sentido da vida, do universo e tudo mais? 2021 ATUALIZADO ¯\_(ツ)_/¯",
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


  **`200 OK` - Exemplo de resposta da requisição para atualização de prova com `SUCESSO`.**
  ```json
  {
    "id": "6050f9e222a72e7089ed1988",
    "name": "Prova AMARELA 2021 ATUALIZADA",
    "description": "Prova completa 2021 ATUALIZADA",
    "type": "ONLINE",
    "questions": [
      {
        "id": "6050f9e222a72e7089ed1987",
        "statement": "Qual o sentido da vida, do universo e tudo mais? 2021 ATUALIZADO ¯\_(ツ)_/¯",
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

  - ### 3.5 Deletar Prova

  `DELETE` /api/exam/delete

  <details>

  #### Parâmetros da requisição
  |Tipo|Nome|Descrição|Schema|
  |---|---|---|---|
  |**Body**|**id**  <br>*required*|O id da Prova.|string|


  **Exemplo da requisição deletar prova.**
  ```json
  {
    "id": "60510d9b9062ed8fc8ad2a6e"
  }
  ```


  **`200 OK` - Exemplo de resposta da requisição deletar prova com `SUCESSO`.**
  ```json
  {
    "delete": "ok"
  }
  ```
  </details>


## 4 Questões


  - ### 4.1 Adicionar Questão

  `POST` /api/question/new

  <details>

  #### Parâmetros da requisição
  |Tipo|Nome|Descrição|Schema|
  |---|---|---|---|
  |**Body**|**examId**  <br>*required*|O id da Prova que a Questão será adicionada.|string|
  |**Body**|**statement**  <br>*required*|O enunciado da Questão.|string|
  |**Body**|**options**  <br>*required*|Opções da Questão. Obs: Um Array de `option`. |[option[]](#option)|


  #### Option
  |Tipo|Nome|Descrição|Schema|
  |---|---|---|---|
  |**Body**|**key**  <br>*required*|A chave da opção.|string|
  |**Body**|**value**  <br>*required*|O valor da opção.|string|
  |**Body**|**correct**  <br>*required*|Se a opção é verdadeira ou falsa. Obs.: `true` ou `false`|boolean|


  **Exemplo da requisição adicionar Questão.**
  ```json
  {
    "examId": "60500a71fef08553a78d1948",
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
  ```


  **`200 OK` - Exemplo de resposta da requisição adicionar Questão com `SUCESSO`.**
  ```json
  {
    "id": "605112af2a3daa997ee6bb8f",
    "statement": "Qual o sentido da vida, do universo e tudo mais?",
    "options": [
      {
        "key": "a",
        "value": "viver",
        "correct": false,
        "id": "605112af2a3daa997ee6bb90"
      },
      {
        "key": "b",
        "value": "beber café",
        "correct": false,
        "id": "605112af2a3daa997ee6bb91"
      },
      {
        "key": "c",
        "value": "codar",
        "correct": false,
        "id": "605112af2a3daa997ee6bb92"
      },
      {
        "key": "d",
        "value": "42",
        "correct": true,
        "id": "605112af2a3daa997ee6bb93"
      }
    ]
  }
  ```

  </details>
