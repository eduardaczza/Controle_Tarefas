# TaskFlow — Sistema de Gerenciamento de Tarefas

Projeto de fixação desenvolvido em **Angular 17 + TypeScript**, sem backend (dados em memória).

## Funcionalidades

- ✅ Criar, editar e excluir tarefas (com confirmação)
- ✅ Marcar tarefa como concluída / não concluída
- ✅ Filtrar por categoria, prioridade e status
- ✅ Buscar por título ou descrição
- ✅ Dashboard com estatísticas e barra de progresso
- ✅ Validações de formulário (título obrigatório, mín. 3 chars)

## Como instalar e rodar

```bash
# 1. Clone o repositório
git clone <https://github.com/eduardaczza/Controle_Tarefas>
cd taskflow

# 2. Instale as dependências
npm install

# 3. Rode o servidor de desenvolvimento
ng serve

# 4. Acesse no navegador
http://localhost:4200
```

## Estrutura do Projeto

```
src/app/
├── models/
│   └── tarefa.model.ts
├── services/
│   └── tarefa.service.ts
├── pages/
│   ├── dashboard/
│   ├── tarefa-lista/
│   └── tarefa-form/
├── app.component.*
├── app.routes.ts
└── app.config.ts
```

## Tecnologias

- Angular 17 (Standalone Components)
- TypeScript
- CSS puro (sem bibliotecas externas)