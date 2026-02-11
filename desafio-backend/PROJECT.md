# Backend - Desafio NewSun Energy

Backend desenvolvido com **NestJS** seguindo os princípios de **Clean Architecture** para o sistema de simulação de compensação energética.

## 🏗️ Arquitetura

O projeto segue Clean Architecture com separação clara de responsabilidades:

```
src/
├─ domain/              # Regras de negócio puras
│  ├─ entities/         # Entidades do domínio
│  ├─ repositories/     # Interfaces dos repositórios
│  └─ value-objects/    # Objetos de valor
│
├─ application/         # Casos de uso
│  ├─ use-cases/        # Lógica de aplicação
│  └─ dtos/             # Data Transfer Objects
│
├─ infra/               # Detalhes de implementação
│  ├─ http/             # Controllers e rotas
│  │  ├─ controllers/
│  │  └─ http.module.ts
│  │
│  ├─ database/         # Persistência
│  │  ├─ prisma/        # Implementações Prisma
│  │  └─ database.module.ts
│
├─ shared/              # Código compartilhado
│  └─ errors/           # Exceções customizadas
│
└─ app.module.ts        # Módulo raiz
```

## 🚀 Tecnologias

- **NestJS** - Framework Node.js
- **TypeScript** - Linguagem
- **Prisma** - ORM
- **MySQL** - Banco de dados
- **Docker** - Containerização
- **Class Validator** - Validação de DTOs

## 📋 Pré-requisitos

- Node.js 18+
- Docker e Docker Compose (recomendado)
- MySQL 8.0+ (se não usar Docker)

## 🔧 Instalação e Execução

### Opção 1: Com Docker (Recomendado)

1. Clone o repositório e navegue até a pasta do backend:

```bash
cd desafio-backend
```

2. Copie o arquivo de ambiente:

```bash
cp .env.example .env
```

3. Inicie os containers:

```bash
docker-compose up -d
```

O backend estará disponível em `http://localhost:3000/api`

### Opção 2: Sem Docker

1. Instale as dependências:

```bash
npm install
```

2. Configure o arquivo `.env` com suas credenciais do MySQL:

```env
DATABASE_URL="mysql://user:password@localhost:3306/newsun_energy"
PORT=3000
NODE_ENV=development
```

3. Execute as migrations do Prisma:

```bash
npx prisma migrate dev
```

4. Gere o Prisma Client:

```bash
npx prisma generate
```

5. Inicie o servidor:

```bash
npm run start:dev
```

## 🛣️ Endpoints da API

### Base URL: `http://localhost:3000/api`

#### 1. Criar uma nova simulação (Lead)

```http
POST /leads
Content-Type: application/json

{
  "nomeCompleto": "João Silva",
  "email": "joao.silva@email.com",
  "telefone": "(11) 98765-4321",
  "informacoesDaFatura": [
    {
      "codigoDaUnidadeConsumidora": "123456789",
      "modeloFasico": "bifasico",
      "enquadramento": "B1",
      "historicoDeConsumoEmKWH": [
        {
          "consumoForaPontaEmKWH": 250.5,
          "mesDoConsumo": "2024-01-01"
        },
        // ... mais 11 meses (total de 12)
      ]
    }
  ]
}
```

**Resposta:** 201 Created

```json
{
  "id": "uuid",
  "nomeCompleto": "João Silva",
  "email": "joao.silva@email.com",
  "telefone": "11987654321",
  "unidades": [...]
}
```

#### 2. Listar todas as simulações (com filtros opcionais)

```http
GET /leads?nomeCompleto=João&email=joao&codigoDaUnidadeConsumidora=123
```

**Resposta:** 200 OK

```json
[
  {
    "id": "uuid",
    "nomeCompleto": "João Silva",
    "email": "joao.silva@email.com",
    "telefone": "11987654321",
    "unidades": [...]
  }
]
```

#### 3. Buscar simulação por ID

```http
GET /leads/:id
```

**Resposta:** 200 OK

```json
{
  "id": "uuid",
  "nomeCompleto": "João Silva",
  "email": "joao.silva@email.com",
  "telefone": "11987654321",
  "unidades": [...]
}
```

## 🎯 Regras de Negócio Implementadas

✅ Email único por lead  
✅ Código da unidade consumidora único  
✅ Lead deve ter no mínimo 1 unidade  
✅ Histórico de consumo com exatamente 12 meses  
✅ Validação de dados com class-validator  
✅ Tratamento de erros com exceções customizadas

## 📊 Modelo de Dados

### Lead

- id (UUID)
- nomeCompleto (string)
- email (string, único)
- telefone (string)
- unidades (array)

### Unidade

- id (UUID)
- codigoDaUnidadeConsumidora (string, único)
- modeloFasico (enum: monofasico, bifasico, trifasico)
- enquadramento (enum: AX, B1, B2, B3)
- historicoDeConsumoEmKWH (array com 12 meses)

### Consumo

- consumoForaPontaEmKWH (number)
- mesDoConsumo (Date)

## 🧪 Scripts Disponíveis

```bash
# Desenvolvimento
npm run start:dev

# Build
npm run build

# Produção
npm run start:prod

# Prisma
npm run prisma:generate    # Gera o Prisma Client
npm run prisma:migrate     # Executa migrations
npm run prisma:studio      # Abre interface visual do banco
```

## 🐳 Comandos Docker

```bash
# Iniciar containers
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Parar containers
docker-compose down

# Rebuild
docker-compose up -d --build
```

## 📝 Estrutura do Banco de Dados

O Prisma gerencia automaticamente as migrations. Para visualizar o schema:

```bash
npx prisma studio
```

Isso abre uma interface web em `http://localhost:5555` para explorar os dados.

## ⚠️ Observações Importantes

1. **Validações**: Todas as entradas são validadas usando class-validator
2. **CORS**: Configurado para aceitar requisições do frontend (porta 3001)
3. **Clean Architecture**: Separação clara entre domínio, aplicação e infraestrutura
4. **Dependency Injection**: Uso de interfaces para inversão de dependências
5. **Value Objects**: Email e Telefone são value objects com validações próprias

## 🔐 Variáveis de Ambiente

```env
DATABASE_URL=mysql://user:password@host:3306/database
PORT=3000
NODE_ENV=development
FRONTEND_URL=http://localhost:3001
```

## 📚 Documentação Adicional

- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)

## 🤝 Contato

Para dúvidas: paulo.santana@newsun.energy
