# 🏡 CuidaMais – Gerenciador de Asilo

Sistema completo para o gerenciamento de asilos, incluindo uma landing page, sistema de contato e painel administrativo.  
Com este sistema, os gestores podem controlar informações sobre **residentes**, **funcionários**, **pagamentos**, além de receber contatos externos de forma segura e eficiente.

---

## 📌 Visão Geral

O **Gerenciador de Asilo** foi desenvolvido para facilitar a administração de instituições de acolhimento, otimizando tarefas essenciais do dia a dia com acesso fácil e centralizado às informações. O sistema é composto por:

- **Landing Page**: Informações institucionais, serviços e formulário de contato.
- **Sistema de Contato**: Canal direto de comunicação com o público.
- **Painel de Administração**: Controle interno de residentes, equipe, finanças e relatórios.

---

## 🚀 Funcionalidades

- Cadastro e gerenciamento de residentes
- Controle de funcionários
- Histórico de pagamentos e despesas
- Integração com página de contato
- Acesso seguro com autenticação
- Interface responsiva e moderna

---

## 🧰 Tecnologias Utilizadas

### **Frontend**
- React
- Tailwind CSS
- Axios

### **Backend**
- Node.js + Express
- JWT para autenticação

### **Banco de Dados**
- PostgreSQL
- Sequelize ORM

### **DevOps**
- Git
- GitHub

---

## 📦 Estrutura do Projeto

```
cuidaMais/
│
├── backend/
│   ├── .env.example              # Arquivo de variáveis de ambiente exemplo
│   ├── package.json              # Dependências e scripts do backend
│   ├── server.js                 # Ponto de entrada da API
│   └── src/
│       ├── config/               # Configurações do Sequelize, JWT, etc.
│       ├── controllers/          # Lógica dos endpoints (ex: auth, user, residentes)
│       ├── middlewares/         # Middlewares globais (ex: autenticação)
│       ├── models/              # Modelos do banco de dados
│       ├── routes/              # Definição das rotas da aplicação
│       └── services/            # Regras de negócio reutilizáveis
│
├── frontend/
│   ├── public/                   # Arquivos estáticos
│   ├── tailwind.config.js        # Configuração do Tailwind
│   └── src/
│       ├── App.jsx               # Componente raiz da aplicação
│       ├── assets/              # Imagens, ícones e outros recursos
│       ├── components/          # Componentes reutilizáveis
│       ├── contexts/            # Contextos globais (ex: autenticação)
│       ├── hooks/               # Hooks customizados
│       ├── pages/               # Páginas da aplicação (dashboard, login, etc.)
│       └── services/            # Serviços de requisições (Axios, etc.)
│
├── landing-page/
│   ├── index.html                # Landing page estática
│   └── src/
│       ├── components/           # Componentes reutilizáveis da landing
│       └── sections/            # Seções como sobre, serviços, contato
│
├── docs/
│   └── arquitetura.md            # Documentação técnica do projeto
│
├── .gitignore                    # Arquivos/pastas a serem ignorados pelo Git
├── README.md                     # Este documento de documentação principal

```

---

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b minha-feature`
2. Commit suas alterações: `git commit -m 'feat: minha feature'`
3. Faça push para a branch: `git push origin minha-feature`
4. Abra um Pull Request ✨

---

## 🧭 Fluxo Git – GitFlow com PR e Rebase

Este projeto utiliza um fluxo de versionamento baseado no GitFlow adaptado para equipes pequenas, com foco em controle, revisão e prevenção de conflitos.

### 📂 Branches principais

| Branch                          | Finalidade                                                |
|----------------------------------|------------------------------------------------------------|
| `main`                          | Contém a versão estável e pronta para produção             |
| `develop`                       | Linha principal de desenvolvimento                         |
| `cuidamais-produção-landingpage`| Linha de desenvolvimento da landing page                     |
| `cuidamais-produção-gerenciador`| Linha de desenvolvimento do gerenciador                      |
| `feat/nome-da-feature`          | Funcionalidades em desenvolvimento criadas a partir de `develop` |

---

### 🔁 Etapas do Fluxo

1. **Atualize o `develop` local**
   ```bash
   git checkout develop
   git pull origin develop
   ```

2. **Crie uma nova branch de feature**
   ```bash
   git checkout -b feat/nome-da-feature
   ```

3. **Desenvolva e faça commits frequentes**
   ```bash
   git add .
   git commit -m "feat: descreva claramente o que foi feito"
   ```

4. **Atualize sua feature com as últimas mudanças do `develop` (antes do PR)**
   ```bash
   git fetch origin
   git rebase origin/develop
   ```

5. **Resolva conflitos, se houver, e finalize o rebase**
   ```bash
   git rebase --continue
   ```

6. **Envie sua branch para o repositório remoto**
   ```bash
   git push origin feat/nome-da-feature
   ```

7. **Abra um Pull Request (PR) para `develop` no GitHub**
   - Peça revisão de pelo menos 1 dev
   - Aguarde aprovação

8. **Após merge no `develop`**
   - Testes manuais e/ou automáticos garantem estabilidade
   - Quando tudo estiver validado, o `develop` é mesclado no `main` (produção)

---

### ✅ Regras de Ouro

- Nunca faça commits direto no `main` ou `develop`
- Sempre crie uma branch para cada feature
- Rebase antes do PR para evitar conflitos
- Use `squash and merge` para manter histórico limpo
- Commits devem ser claros, no padrão: `feat`, `fix`, `refactor`, etc.

---

### 📘 Exemplo prático

```bash
git checkout develop
git pull origin develop

git checkout -b feat/cadastro-residente

# ...fazendo o código
git add .
git commit -m "feat: implementa formulário de cadastro de residente"

git fetch origin
git rebase origin/develop

git push origin feat/cadastro-residente
```

Depois disso, abra seu PR para `develop` ✨
