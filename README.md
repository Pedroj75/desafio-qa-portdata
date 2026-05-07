# Teste Técnico — QA Jr | PortData

Projeto de testes automatizados E2E com Cypress e testes de performance com K6 no fluxo de autenticação e navegação do GitHub.

## Tecnologias

- Node.js
- Cypress
- K6
- dotenv

## Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
   npm install
```
3. Crie um arquivo `.env` na raiz com as variáveis:
GITHUB_EMAIL=seu_email@gmail.com
GITHUB_PASSWORD=sua_senha
GITHUB_USERNAME=seu_username
GITHUB_REPO_NAME=nome-do-repositorio

## Rodando os testes

### Cypress (E2E)

Modo visual:
```bash
npx cypress open
```

Modo headless:
```bash
npx cypress run
```

### K6 (Performance)

```bash
k6 run --env GITHUB_EMAIL=seu_email --env GITHUB_PASSWORD=sua_senha --env GITHUB_USERNAME=seu_username k6/performance.js
```