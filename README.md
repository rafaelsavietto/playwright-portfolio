# SauceDemo E2E Test Suite — Playwright + TypeScript

Suíte de testes end-to-end para o app público [SauceDemo](https://www.saucedemo.com), construída com **Playwright** e **TypeScript**, usando o padrão **Page Object Model (POM)** e pipeline de **CI/CD** via **GitHub Actions**.

Este projeto tem a finalidade de exercitas e demonstrar, na prática, competências de automação de testes: arquitetura de suíte, fixtures reutilizáveis, execução multi-browser e multi-dispositivo, e publicação automática de relatórios.

## 🎯 Objetivo

Este repositório faz parte de um portfólio de QA/Automação, cobrindo:

- Testes de **login** (caminho feliz, credenciais inválidas, usuário bloqueado, campos vazios)
- Testes de **catálogo de produtos** (adicionar/remover do carrinho, ordenação por preço)
- Teste de **fluxo completo de checkout** (do login até a confirmação do pedido)
- **CI/CD**: execução automática a cada push/PR, execução agendada semanal, e publicação do relatório HTML no GitHub Pages

## 🛠️ Stack

- [Playwright](https://playwright.dev/) + TypeScript
- Page Object Model (POM) com fixtures customizadas
- GitHub Actions (CI/CD)
- Execução em Chromium, Firefox, WebKit e emulação mobile (Pixel 7)

## Estrutura do projeto

```
playwright-portfolio/
├── .github/workflows/
│   └── playwright.yml        # Pipeline de CI/CD
├── pages/                    # Page Objects
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/
│   ├── fixtures.ts           # Fixtures customizadas (ex: usuário já logado)
│   ├── login.spec.ts
│   ├── inventory.spec.ts
│   └── checkout.spec.ts
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## Como rodar localmente

Pré-requisito: Node.js 18+.

```bash
# 1. Clonar o repositório
git clone https://github.com/<seu-usuario>/saucedemo-e2e-playwright.git
cd saucedemo-e2e-playwright

# 2. Instalar dependências
npm install

# 3. Instalar os browsers do Playwright
npm run install:browsers

# 4. Rodar todos os testes (headless)
npm test

# Rodar com interface visual (modo debug)
npm run test:ui

# Rodar apenas no Chromium
npm run test:chromium

# Ver o relatório HTML após a execução
npm run report
```

## CI/CD

O workflow em `.github/workflows/playwright.yml`:

1. Roda a suíte completa a cada `push`/`pull request` na branch `main`
2. Também roda automaticamente toda segunda-feira (cron), para detectar quebras causadas por mudanças no site alvo, mesmo sem commits novos
3. Publica o relatório HTML do Playwright no **GitHub Pages** a cada execução na `main`

> Para ativar a publicação do relatório, habilite o GitHub Pages no repositório (Settings → Pages → Source: **GitHub Actions**).

## Credenciais de teste (SauceDemo)

O SauceDemo disponibiliza usuários fixos para testar diferentes cenários:

| Usuário | Comportamento |
|---|---|
| `standard_user` | Fluxo normal, sem problemas |
| `locked_out_user` | Usuário bloqueado |
| `problem_user` | Simula bugs de UI (imagens erradas) |
| `performance_glitch_user` | Simula lentidão no carregamento |

Senha para todos: `secret_sauce`

## Próximos passos (roadmap do portfólio)

- [ ] Adicionar testes com `problem_user` e `performance_glitch_user` para validar resiliência
- [ ] Integrar relatório Allure como alternativa ao HTML nativo
- [ ] Adicionar testes de acessibilidade com `axe-core`
- [ ] Repositório irmão: testes de performance com k6 sobre uma API pública
- [ ] Repositório irmão: geração de casos de teste assistida por IA a partir de user stories

## Autor

**Rafael Silva Savietto** — QA Engineer
[LinkedIn](https://linkedin.com/in/rafael-silva-savietto-2b9b4559)
