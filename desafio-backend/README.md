# Desafio NewSun Energy - Full Stack Developer

Sistema completo para simulação de compensação energética desenvolvido para o processo seletivo da NewSun Energy.

## 📁 Estrutura do Projeto

```
desafio-dev-fullstack/
├── desafio-backend/     # Backend NestJS com Clean Architecture
└── conta-de-energia/    # Arquivos de teste das contas
```

## 🎯 Funcionalidades Implementadas

### Backend

✅ 3 endpoints REST (POST, GET list, GET by id)  
✅ Clean Architecture com separação de camadas  
✅ Validação completa de dados com class-validator  
✅ Prisma ORM com MySQL  
✅ Docker e Docker Compose configurado  
✅ Regras de negócio implementadas:

- Email único por lead
- Código de unidade consumidora único
- Mínimo 1 unidade por lead
- Histórico de exatamente 12 meses

### Tecnologias Utilizadas

**Backend:**

- NestJS
- TypeScript
- Prisma ORM
- MySQL
- Docker
- Class Validator/Transformer

## 🚀 Como Executar

### Backend

Veja as instruções completas no [PROJECT.md do backend](./desafio-backend/PROJECT.md)

**Início rápido com Docker:**

```bash
cd desafio-backend
docker-compose up -d
```

O backend estará disponível em `http://localhost:3000/api`

## 📚 Documentação

- [Backend - PROJECT.md](./desafio-backend/PROJECT.md) - Documentação completa do backend

## 🏗️ Arquitetura

### Backend - Clean Architecture

```
domain/         → Entidades e regras de negócio
application/    → Casos de uso e DTOs
infra/          → Implementações (HTTP, Database)
shared/         → Código compartilhado
```

Princípios aplicados:

- Dependency Inversion
- Single Responsibility
- Interface Segregation
- Domain-Driven Design

## 📋 Endpoints da API

- `POST /api/leads` - Criar nova simulação
- `GET /api/leads` - Listar simulações (com filtros)
- `GET /api/leads/:id` - Buscar simulação por ID

## 🔧 Diferenciais Implementados

✅ Validação completa de dados na API  
✅ Docker configurado para ambiente completo  
✅ Clean Architecture aplicada  
✅ Documentação detalhada  
✅ Value Objects para Email e Telefone  
✅ Tratamento de erros customizado  
✅ Repository Pattern com interfaces

## 👤 Autor

Desenvolvido para o processo seletivo da NewSun Energy Brasil

## 📧 Contato

Para dúvidas: paulo.santana@newsun.energy
