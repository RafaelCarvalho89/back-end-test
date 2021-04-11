# Descrição do Projeto.

<p>Este projeto é a implementação da resolução de um teste para uma vaga de Desenvolvedor Back End.</p>

<p>Ele se resume basicamente em uma API de provas, mantendo o gerenciamento de Provas (Exams), e de Questões da Prova (Questions).</p>

<p>A seguir, se encontram as instruções de instalação do projeto, e de como consumir a API.</p>

<br>

#### Tasks

- [x] ~~feat: write documentation~~
- [x] ~~fix: delete question broken~~
- [ ] refactor: extract fields validation out of the controller
- [ ] refactor: change the request to format with request param
- [ ] revision: code and organization

<br />

## Sumário

- [1.Instalação](#1-instalação)
- [2.API](#2-api)
- [3.Provas](#3-provas)
  - [3.1.Adicionar Prova - [POST]](#31-adicionar-prova)
  - [3.2.Obter Prova - [GET]](#32-obter-prova)
  - [3.3.Listar Provas - [GET]](#33-listar-provas)
  - [3.4.Atualizar Prova - [PUT]](#34-atualizar-prova)
  - [3.5.Deletar Prova - [DELETE]](#35-deletar-prova)
- [4.Questões](#4-questões)
  - [4.1.Adicionar Questão - [POST]](#41-adicionar-questão)
  - [4.2.Obter Questão - [GET]](#42-obter-questão)
  - [4.3.Listar Questões - [GET]](#43-listar-questões)
  - [4.4.Atualizar Questão - [PUT]](#44-atualizar-questão)
  - [4.5.Deletar Questão - [DELETE]](#45-deletar-questão)
- [5.Schema](#5-schema)

<br />

## 1 Instalação

**1 - Clone o projeto.**

```console
git clone https://github.com/RafaelCarvalho89/back-end-test.git
```

  <br />

**2 - Instale as dependencias.**

```console
npm install
```

  <br />

**3 - Verifique se o Mongo está inicializado, e inicialize o serviço caso não esteja.**

  <p>Para executar e gerenciar seu mongodprocesso, você usará o sistema init integrado de seu sistema operacional. </p>

  <p>Se você não tiver certeza de qual sistema init sua plataforma usa, execute o seguinte comando no terminal:</p>

```console
ps --no-headers -o comm 1
```

  <p>Sera exibido no terminal</p>

```console
systemd
```

ou

```console
init
```

  <br />

  <p>Para systemd (systemctl)</p>

```console
sudo systemctl status mongod
```

  <p>Ou para System V Init (service)</p>

```console
sudo service mongod status
```

  <br />

  <p>Se o Mongo não estiver inicialidado então inicialize-o</p>

  <p>Para systemd (systemctl)</p>

```console
sudo systemctl start mongod
```

  <p>Ou para System V Init (service)</p>

```console
sudo service mongod start
```

  <br />

**4 - Inicialize o projeto**

```console
npm start
```

  <br />

## 2 API

Rota de servidor local

`HOST` http://localhost:5050

  <br />

Alem da resposta `200 OK` de sucesso, a API pode retornar mais dois tipos de resposta, `400 Bad request` e `500 Server error`.

A resposta `400 Bad request` é retornada quando formato da requisição está incorreto.

E a resposta `500 Server error` é retornada quando ocorre algum erro no serviço da API.

  <br />

**Exemplo de uma requisição adicionar prova faltando o campo `name`.**

```json
{
  "description": "Prova sem questões",
  "type": "ONLINE",
  "questions": []
}
```

  <br />

**`400 Bad Request` - Exemplo de resposta da requisição adicionar prova faltando o campo `name`.**

```json
{
  "name": "MissingParamError",
  "message": "Missing param: name"
}
```

  <br />

**Exemplo de uma requisição adicionar prova com o valor do campo `type` inválido.**

```json
{
  "name": "Prova VERMELHA",
  "description": "Prova sem questões",
  "type": "BAZINGA",
  "questions": []
}
```

  <br />

**`400 Bad Request` - Exemplo de resposta de uma requisição adicionar prova com o valor do campo `type` inválido.**

```json
{
  "name": "InvalidParamError",
  "message": "Invalid param: type"
}
```

  <br />

**`500 Server Error` - Exemplo de resposta de uma requisição quando occorre algum erro no serviço da API.**

```json
{
  "name": "ServerError",
  "message": "Internal Server Error"
}
```

  <br />

## 3 Provas

### 3.1 Adicionar Prova

- `POST` /api/v1/exam

  <details>

#### Parâmetros da requisição

| Tipo     | Nome                           | Descrição                                       | Schema                  |
| -------- | ------------------------------ | ----------------------------------------------- | ----------------------- |
| **Body** | **name** <br>_required_        | O nome da Prova.                                | string                  |
| **Body** | **description** <br>_required_ | Descrição da Prova.                             | string                  |
| **Body** | **type** <br>_required_        | Tipo da Prova. Obs.: `"ONLINE"` ou `"OFFLINE"`  | string                  |
| **Body** | **questions** <br>_optional_   | Questões da Prova. Obs: Um Array de `question`. | [question[]](#question) |

  <br />

#### Question

| Tipo     | Nome                         | Descrição                                     | Schema              |
| -------- | ---------------------------- | --------------------------------------------- | ------------------- |
| **Body** | **statement** <br>_required_ | O enunciado da Questão.                       | string              |
| **Body** | **options** <br>_required_   | Opções da Questão. Obs: Um Array de `option`. | [option[]](#option) |

  <br />

#### Option

| Tipo     | Nome                       | Descrição                                                 | Schema  |
| -------- | -------------------------- | --------------------------------------------------------- | ------- |
| **Body** | **key** <br>_required_     | A chave da opção.                                         | string  |
| **Body** | **value** <br>_required_   | O valor da opção.                                         | string  |
| **Body** | **correct** <br>_required_ | Se a opção é verdadeira ou falsa. Obs.: `true` ou `false` | boolean |

  <br />

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

  <br />

**`200 OK` - Exemplo de resposta da requisição passando uma prova `COM QUESTÕES`. Com `SUCESSO`.**

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

  <br />

**Exemplo da requisição passando uma prova `SEM QUESTÕES`.**

```json
{
  "name": "Prova AZUL",
  "description": "Prova sem questões",
  "type": "ONLINE"
}
```

  <br />

**`200 OK` - Exemplo de resposta da requisição passando uma prova `SEM QUESTÕES`. Com `SUCESSO`.**

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

  <br />

### 3.2 Obter Prova

- `GET` /api/v1/exam/{id}

  <details>

#### Parâmetros da requisição

| Tipo          | Nome                  | Descrição      | Schema |
| ------------- | --------------------- | -------------- | ------ |
| **URL param** | **id** <br>_required_ | O id da Prova. | string |

  <br />

**Exemplo da requisição obter prova.**
`GET` http://localhost:5050/api/v1/exam/6050f9e222a72e7089ed1988

  <br />

**`200 OK` - Exemplo de resposta da requisição obter prova. Com `SUCESSO`.**

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

  <br />

### 3.3 Listar Provas

- `GET` /api/v1/exams

- **Obs.: `exams`, no plural.**

  <details>

#### Requisição sem Parâmetros

**`200 OK` - Exemplo de resposta da requisição listar provas. Com `SUCESSO`.**

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

  <br />

### 3.4 Atualizar Prova

- `PUT` /api/v1/exam

  <details>

#### Parâmetros da requisição

| Tipo     | Nome                           | Descrição                                       | Schema                  |
| -------- | ------------------------------ | ----------------------------------------------- | ----------------------- |
| **Body** | **id** <br>_required_          | O id da Prova.                                  | string                  |
| **Body** | **name** <br>_required_        | O nome da Prova.                                | string                  |
| **Body** | **description** <br>_required_ | Descrição da Prova.                             | string                  |
| **Body** | **type** <br>_required_        | Tipo da Prova. Obs.: `"ONLINE"` ou `"OFFLINE"`  | string                  |
| **Body** | **questions** <br>_required_   | Questões da Prova. Obs: Um Array de `question`. | [question[]](#question) |

  <br />

#### Question

| Tipo     | Nome                         | Descrição                                     | Schema              |
| -------- | ---------------------------- | --------------------------------------------- | ------------------- |
| **Body** | **id** <br>_required_        | O id da Questão.                              | string              |
| **Body** | **statement** <br>_required_ | O enunciado da Questão.                       | string              |
| **Body** | **options** <br>_required_   | Opções da Questão. Obs: Um Array de `option`. | [option[]](#option) |

  <br />

#### Option

| Tipo     | Nome                       | Descrição                                                 | Schema  |
| -------- | -------------------------- | --------------------------------------------------------- | ------- |
| **Body** | **key** <br>_required_     | A chave da opção.                                         | string  |
| **Body** | **value** <br>_required_   | O valor da opção.                                         | string  |
| **Body** | **correct** <br>_required_ | Se a opção é verdadeira ou falsa. Obs.: `true` ou `false` | boolean |

  <br />

**Exemplo da requisição para atualização de prova.**

```json
{
  "id": "6050f9e222a72e7089ed1988",
  "name": "Prova AMARELA 2021 ATUALIZADA",
  "description": "Prova completa 2021 ATUALIZADA",
  "type": "ONLINE",
  "questions": [
    {
      "statement": "Qual o sentido da vida, do universo e tudo mais? 2021 ATUALIZADO ¯_(ツ)_/¯",
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

  <br />

**`200 OK` - Exemplo de resposta da requisição para atualização de prova. Com `SUCESSO`.**

```json
{
  "id": "6050f9e222a72e7089ed1988",
  "name": "Prova AMARELA 2021 ATUALIZADA",
  "description": "Prova completa 2021 ATUALIZADA",
  "type": "ONLINE",
  "questions": [
    {
      "id": "6050f9e222a72e7089ed1987",
      "statement": "Qual o sentido da vida, do universo e tudo mais? 2021 ATUALIZADO ¯_(ツ)_/¯",
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

  <br />

### 3.5 Deletar Prova

- `DELETE` /api/v1/exam/{id}

  <details>

#### Parâmetros da requisição

| Tipo          | Nome                  | Descrição      | Schema |
| ------------- | --------------------- | -------------- | ------ |
| **URL param** | **id** <br>_required_ | O id da Prova. | string |

  <br />

**Exemplo da requisição deletar prova.**
`DELETE` http://localhost:5050/api/v1/exam/6050f9e222a72e7089ed1988

  <br />

**`200 OK` - Exemplo de resposta da requisição deletar prova. Com `SUCESSO`.**

```json
{
  "delete": "ok"
}
```

  </details>

  <br />

## 4 Questões

### 4.1 Adicionar Questão

- `POST` /api/v1/question/new

  <details>

#### Parâmetros da requisição

| Tipo     | Nome                         | Descrição                                     | Schema              |
| -------- | ---------------------------- | --------------------------------------------- | ------------------- |
| **Body** | **examId** <br>_required_    | O id da Prova que a Questão será adicionada.  | string              |
| **Body** | **statement** <br>_required_ | O enunciado da Questão.                       | string              |
| **Body** | **options** <br>_required_   | Opções da Questão. Obs: Um Array de `option`. | [option[]](#option) |

  <br />

#### Option

| Tipo     | Nome                       | Descrição                                                 | Schema  |
| -------- | -------------------------- | --------------------------------------------------------- | ------- |
| **Body** | **key** <br>_required_     | A chave da opção.                                         | string  |
| **Body** | **value** <br>_required_   | O valor da opção.                                         | string  |
| **Body** | **correct** <br>_required_ | Se a opção é verdadeira ou falsa. Obs.: `true` ou `false` | boolean |

  <br />

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

  <br />

**`200 OK` - Exemplo de resposta da requisição adicionar Questão. Com `SUCESSO`.**

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

  <br />

### 4.2 Obter Questão

- `GET` /api/v1/exam/question/{id}

  <details>

#### Parâmetros da requisição

| Tipo          | Nome                  | Descrição        | Schema |
| ------------- | --------------------- | ---------------- | ------ |
| **URL param** | **id** <br>_required_ | O id da Questão. | string |

  <br />

**Exemplo da requisição obter questão.**
`GET` http://localhost:5050/api/v1/exam/question/605112af2a3daa997ee6bb8f

  <br />

**`200 OK` - Exemplo de resposta da requisição obter questão. Com `SUCESSO`.**

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
  ],
  "examId": "60500a71fef08553a78d1948",
  "examName": "Prova AMARELA"
}
```

  </details>

  <br />

### 4.3 Listar Questões da Prova

- `GET` /api/v1/questions

- **Obs.: `questions`, no plural.**

  <details>

#### Parâmetros da requisição

| Tipo     | Nome                      | Descrição                   | Schema |
| -------- | ------------------------- | --------------------------- | ------ |
| **Body** | **examId** <br>_required_ | O id da Prova das Questões. | string |

  <br />

**Exemplo da requisição listar questões da prova.**

```json
{
  "examId": "60500a71fef08553a78d1948"
}
```

  <br />

**`200 OK` - Exemplo de resposta da requisição listar questões da prova. Com `SUCESSO`.**

```json
[
  {
    "id": "605112af2a3daa997ee6bb8f",
    "statement": "Qual o sentido da vida, do universo e tudo mais?",
    "options": [
      {
        "key": "a",
        "value": "viver",
        "correct": false,
        "id": "60511cd1b841c7ac42d626e2"
      },
      {
        "key": "b",
        "value": "42",
        "correct": true,
        "id": "60511cd1b841c7ac42d626e5"
      },
      {
        "key": "c",
        "value": "beber café",
        "correct": false,
        "id": "60511cd1b841c7ac42d626e3"
      },
      {
        "key": "d",
        "value": "codar",
        "correct": false,
        "id": "60511cd1b841c7ac42d626e4"
      }
    ]
  },
  {
    "id": "60511cd1b841c7ac42d626e1",
    "statement": "Qual a ordem mais bacana para assistir os filmes de Star Wars?",
    "options": [
      {
        "key": "a",
        "value": "Lançamento dos Filmes",
        "correct": false,
        "id": "60511cd1b841c7ac42d626e7"
      },
      {
        "key": "b",
        "value": "Machete",
        "correct": false,
        "id": "60511cd1b841c7ac42d626e9"
      },
      {
        "key": "c",
        "value": "Cronológica dos Fatos",
        "correct": false,
        "id": "60511cd1b841c7ac42d626e6"
      },
      {
        "key": "d",
        "value": "Ernst Rister",
        "correct": true,
        "id": "60511cd1b841c7ac42d626e8"
      }
    ]
  }
]
```

  </details>

  <br />

### 4.4 Atualizar Questão

- `PUT` /api/v1/question/update

  <details>

#### Parâmetros da requisição

| Tipo     | Nome                         | Descrição                                     | Schema              |
| -------- | ---------------------------- | --------------------------------------------- | ------------------- |
| **Body** | **id** <br>_required_        | O id da Questão.                              | string              |
| **Body** | **statement** <br>_required_ | O enunciado da Questão.                       | string              |
| **Body** | **options** <br>_required_   | Opções da Questão. Obs: Um Array de `option`. | [option[]](#option) |

  <br />

#### Option

| Tipo     | Nome                       | Descrição                                                 | Schema  |
| -------- | -------------------------- | --------------------------------------------------------- | ------- |
| **Body** | **key** <br>_required_     | A chave da opção.                                         | string  |
| **Body** | **value** <br>_required_   | O valor da opção.                                         | string  |
| **Body** | **correct** <br>_required_ | Se a opção é verdadeira ou falsa. Obs.: `true` ou `false` | boolean |

<br />

**Exemplo da requisição adicionar Questão.**

```json
{
  "id": "60511cd1b841c7ac42d626e1",
  "statement": "Qual a ordem mais bacana para assistir os filmes de Star Wars? 2021 ATUALIZADO ¯_(ツ)_/¯",
  "options": [
    {
      "key": "a",
      "value": "Lançamento dos Filmes",
      "correct": false
    },
    {
      "key": "b",
      "value": "Machete",
      "correct": false
    },
    {
      "key": "c",
      "value": "Cronológica dos Fatos",
      "correct": false
    },
    {
      "key": "d",
      "value": "Ernst Rister ¯_(ツ)_/¯",
      "correct": true
    }
  ]
}
```

  <br />

**`200 OK` - Exemplo de resposta da requisição atualizar Questão. Com `SUCESSO`.**

```json
{
  "id": "60511cd1b841c7ac42d626e1",
  "statement": "Qual a ordem mais bacana para assistir os filmes de Star Wars? 2021 ATUALIZADO ¯_(ツ)_/¯",
  "options": [
    {
      "key": "a",
      "value": "Lançamento dos Filmes",
      "correct": false,
      "id": "60511cd1b841c7ac42d626e7"
    },
    {
      "key": "b",
      "value": "Machete",
      "correct": false,
      "id": "60511cd1b841c7ac42d626e9"
    },
    {
      "key": "c",
      "value": "Cronológica dos Fatos",
      "correct": false,
      "id": "60511cd1b841c7ac42d626e6"
    },
    {
      "key": "d",
      "value": "Ernst Rister ¯_(ツ)_/¯",
      "correct": true,
      "id": "60511cd1b841c7ac42d626e8"
    }
  ]
}
```

  </details>

  <br />

### 4.5 Deletar Questão

- `DELETE` /api/v1/exam/question/delete/{id}

  <details>

#### Parâmetros da requisição

| Tipo          | Nome                  | Descrição        | Schema |
| ------------- | --------------------- | ---------------- | ------ |
| **URL param** | **id** <br>_required_ | O id da Questão. | string |

  <br />

**Exemplo da requisição deletar questão.**
`DELETE` http://localhost:5050/api/v1/exam/question/605112af2a3daa997ee6bb8f

  <br />

**`200 OK` - Exemplo de resposta da requisição deletar questão. Com `SUCESSO`.**

**Obs.: A resposta retorna a Prova no qual a questão pertencia. `Já sem a questão deletada`.**

```json
{
  "id": "60500a71fef08553a78d1948",
  "name": "Prova AMARELA",
  "description": "Prova sem questões",
  "type": "OFFLINE",
  "questions": [
    {
      "id": "605125a7abd2a8b71f67381e",
      "statement": "Qual a ordem mais bacana para assistir os filmes de Star Wars?",
      "options": [
        {
          "key": "a",
          "value": "Cronológica dos Fatos",
          "correct": false,
          "id": "605125a7abd2a8b71f673823"
        },
        {
          "key": "b",
          "value": "Lançamento dos Filmes",
          "correct": false,
          "id": "605125a7abd2a8b71f673824"
        },
        {
          "key": "c",
          "value": "Ernst Rister",
          "correct": true,
          "id": "605125a7abd2a8b71f673825"
        },
        {
          "key": "d",
          "value": "Machete",
          "correct": false,
          "id": "605125a7abd2a8b71f673826"
        }
      ]
    }
  ]
}
```

  </details>

  <br />

## 5 Schema

<br />

[Retornar ao Topo ^](#descrição-do-projeto)
