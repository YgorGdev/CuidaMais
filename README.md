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
│
├── backend/
│   ├── .env.example                # Variáveis de ambiente (exemplo)
│   ├── server.js                   # Ponto de entrada da API
│   └── src/
│       ├── controllers/            # Lógica dos endpoints
│       ├── models/                 # Modelos do banco de dados
│       ├── routes/                 # Definição de rotas da API
│       ├── services/               # Lógica de negócio (serviços)
│       ├── middlewares/           # Middlewares de autenticação, erros, etc.
│       └── config/                # Configurações do banco, JWT, etc.
│
│
│
├── frontend/
│   ├── public/                    # Arquivos públicos do React
│   ├── tailwind.config.js         # Configuração do Tailwind CSS
│   └── src/
│       ├── App.jsx                # Componente principal
│       ├── assets/                # Imagens, fontes, ícones
│       ├── components/            # Componentes reutilizáveis
│       ├── pages/                 # Páginas principais da aplicação
│       ├── hooks/                 # Hooks customizados
│       ├── services/              # Integração com APIs (Axios, etc)
│       └── contexts/              # Contextos globais (ex: auth, tema)
│
├── landing-page/
│   ├── index.html                 # Landing page inicial
│   ├── public/                    # Recursos públicos
│   └── src/
│       ├── components/            # Componentes reutilizáveis da landing
│       └── sections/              # Seções como sobre, contato, serviços
│
├── docs/
│   └── arquitetura.md             # Documentação técnica e decisões
│
├── .gitignore                     # Ignora node_modules, .env, etc.
├── README.md                      # Documentação principal
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
