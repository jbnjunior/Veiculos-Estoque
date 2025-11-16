```markdown
# Sistema Automotivo – Gestão de Estoque de Veículos

## 📋 Descrição

Sistema completo de gestão de estoque de veículos para concessionárias e revendedoras. Desenvolvido com foco em **Programação Orientada a Objetos (POO)**, o sistema permite cadastro, consulta, atualização e remoção de veículos de forma eficiente e intuitiva.

## 🎯 Objetivo

Resolver os desafios enfrentados por concessionárias na organização e gerenciamento de estoques através de um sistema moderno, integrado e fácil de usar que oferece:

- ✅ Cadastro eficiente de veículos
- ✅ Organização de informações (modelo, marca, ano, preço, quilometragem)
- ✅ Atualização em tempo real de disponibilidade
- ✅ Busca e filtro por características específicas
- ✅ Interface intuitiva para vendedores e administradores
- ✅ Relatórios e estatísticas do estoque

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Motivo |
|-----------|--------|--------|
| **Next.js** | 16+ | Framework moderno, SSR, API Routes integradas |
| **React** | 19+ | Interface responsiva e reativa |
| **TypeScript** | 5+ | Type-safety e melhor experiência de desenvolvimento |
| **Tailwind CSS** | 4+ | Estilização rápida e consistente |
| **Node.js** | 18+ | Runtime para backend |

## 📦 Estrutura do Projeto

```

sistema-automotivo/
├── app/
│   ├── layout.tsx              # Layout principal da aplicação
│   ├── page.tsx                # Página inicial com dashboard
│   ├── globals.css             # Estilos globais
│   └── api/
│       └── vehicles/
│           ├── route.ts        # GET (listar) e POST (criar) veículos
│           └── [id]/
│               └── route.ts    # PUT (atualizar) e DELETE (deletar) veículos
├── components/
│   ├── vehicle-form.tsx        # Formulário para cadastro/edição
│   ├── vehicle-list.tsx        # Listagem de veículos
│   ├── vehicle-filters.tsx     # Filtros avançados
│   └── ui/                     # Componentes shadcn/ui reutilizáveis
├── lib/
│   ├── utils.ts                # Funções utilitárias
│   ├── storage.ts              # Gerenciamento de dados (persistência)
│   └── vehicles.ts             # Lógica de negócio (classes e métodos)
├── README.md                   # Este arquivo
└── package.json                # Dependências do projeto

```plaintext

## 🏗️ Arquitetura e Padrões de Projeto

### Programação Orientada a Objetos (POO)

O sistema foi desenvolvido aplicando os principais conceitos de POO:

#### 1. **Encapsulamento**
- Atributos privados nas classes (`vehicle.color`, `vehicle.price`)
- Getters e setters para acesso controlado
- Métodos específicos para operações

#### 2. **Herança**
- Classe base `Vehicle` com propriedades comuns
- Possibilidade de estender com tipos específicos (Sedan, SUV, Pickup, etc.)

#### 3. **Abstração**
- Interface clara entre frontend e backend
- Métodos abstratos para operações CRUD
- Camada de serviço isolada

#### 4. **Polimorfismo**
- Métodos com mesmo nome podem ter comportamentos diferentes
- Filtros polimórficos baseados em critérios variados
- Validações específicas por tipo de veículo

### Padrão de Arquitetura

```

Frontend (React) → API REST → Backend (Node.js) → Storage (Memória/DB)

```plaintext

**Separação de Responsabilidades:**
- **Componentes React**: Interface e interação com usuário
- **API Routes**: Lógica de negócio e validações
- **Serviços**: Gerenciamento de dados
- **Modelos**: Definição de estruturas

## 📋 Requisitos Funcionais

### 1. Cadastro de Veículos
- Adicionar novos veículos com informações completas
- Validação de campos obrigatórios
- Status inicial configurável

**Campos:**
- Marca
- Modelo
- Ano de Fabricação
- Cor
- Preço
- Quilometragem
- Status (Disponível, Vendido, Descontinuado)

### 2. Consulta e Filtro de Veículos
- Listar todos os veículos disponíveis
- Filtrar por:
  - Marca
  - Modelo
  - Faixa de Preço (mínimo e máximo)
  - Ano
  - Status de Disponibilidade

### 3. Atualização de Informações
- Editar informações de veículos cadastrados
- Atualizar preço em tempo real
- Modificar quilometragem
- Alterar status de disponibilidade

### 4. Remoção de Veículos
- Deletar veículos vendidos ou descontinuados
- Confirmação antes de deletar
- Histórico mantido (opcional)

### 5. Gestão de Marcas e Modelos
- Cadastro de marcas (Toyota, Honda, Ford, etc.)
- Associação de modelos às marcas
- Relacionamento automático com veículos

## 📊 Requisitos Não Funcionais

### Usabilidade
- Interface intuitiva e responsiva
- Navegação clara entre seções
- Formulários com feedback visual
- Mensagens de erro compreensíveis
- Suporte para Desktop e Mobile

### Performance
- Filtros executados em tempo real
- Carregamento rápido de dados
- Otimização de renderização React
- Cache de dados quando apropriado

### Segurança
- Validação de entrada de dados
- Sanitização de inputs
- Proteção contra injeção de código
- Controle de acesso (base para implementação)

### Manutenibilidade
- Código limpo e bem organizado
- Comentários e documentação
- Componentes reutilizáveis
- Fácil extensão para novos recursos

## 🚀 Como Usar

### 1. Instalação

```bash
# Clone o repositório
git clone [seu-repositorio]

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:3000`

### 2. Cadastrar um Veículo

1. Clique em "Novo Veículo"
2. Preencha os campos obrigatórios
3. Selecione a marca e modelo
4. Configure o status inicial
5. Clique em "Cadastrar"


### 3. Filtrar Veículos

1. Use os filtros no painel lateral
2. Selecione marca, modelo, ano ou range de preço
3. Os resultados são atualizados em tempo real
4. Clique em "Limpar Filtros" para resetar


### 4. Editar um Veículo

1. Clique no ícone de edição (lápis)
2. Modifique os campos desejados
3. Clique em "Salvar" para confirmar


### 5. Deletar um Veículo

1. Clique no ícone de deletar (lixeira)
2. Confirme a exclusão
3. Veículo será removido do estoque


## Endpoints da API

### GET `/api/vehicles`

Retorna lista de todos os veículos (com filtros opcionais)

**Query Parameters:**

- `brand`: filtrar por marca
- `model`: filtrar por modelo
- `year`: filtrar por ano
- `minPrice`: preço mínimo
- `maxPrice`: preço máximo
- `status`: filtrar por status


**Response:**

```json
[
  {
    "id": "1",
    "brand": "Toyota",
    "model": "Corolla",
    "year": 2023,
    "color": "Prata",
    "price": 89900,
    "mileage": 15000,
    "status": "available",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### POST `/api/vehicles`

Cria um novo veículo

**Body:**

```json
{
  "brand": "Toyota",
  "model": "Corolla",
  "year": 2023,
  "color": "Prata",
  "price": 89900,
  "mileage": 15000,
  "status": "available"
}
```

### PUT `/api/vehicles/[id]`

Atualiza um veículo específico

**Body:** (mesma estrutura do POST, campos opcionais)

### DELETE `/api/vehicles/[id]`

Deleta um veículo específico

## Dados de Exemplo

O sistema vem pré-carregado com veículos de exemplo:

| ID | Marca | Modelo | Ano | Preço | Status
|-----|-----|-----|-----|-----|-----
| 1 | Toyota | Corolla | 2023 | R$ 89.900 | Disponível
| 2 | Honda | Civic | 2022 | R$ 95.000 | Disponível
| 3 | Ford | Focus | 2021 | R$ 78.500 | Vendido
| 4 | Chevrolet | Cruze | 2023 | R$ 92.000 | Disponível
| 5 | Volkswagen | Golf | 2022 | R$ 105.000 | Disponível
| 6 | Hyundai | HB20 | 2024 | R$ 68.900 | Disponível
| 7 | Fiat | Argo | 2023 | R$ 65.000 | Disponível
| 8 | Nissan | Sentra | 2022 | R$ 87.900 | Descontinuado


## Conceitos de POO Aplicados

### Classes Utilizadas

#### **Vehicle (Classe Principal)**

```plaintext
Atributos:
- id: string (identificador único)
- brand: string (marca do veículo)
- model: string (modelo)
- year: number (ano de fabricação)
- color: string (cor)
- price: number (preço)
- mileage: number (quilometragem)
- status: VehicleStatus (disponível, vendido, descontinuado)
- createdAt: Date (data de criação)

Métodos:
- constructor(): inicializa o veículo
- updatePrice(newPrice): atualiza o preço
- updateMileage(newMileage): atualiza quilometragem
- updateStatus(newStatus): altera status
- isAvailable(): verifica disponibilidade
- toJSON(): serializa objeto
```

#### **VehicleService (Serviço de Negócio)**

```plaintext
Métodos:
- getAllVehicles(): retorna todos os veículos
- getVehicleById(id): busca um veículo específico
- filterVehicles(criteria): aplica filtros
- createVehicle(data): cria novo veículo
- updateVehicle(id, data): atualiza veículo
- deleteVehicle(id): remove veículo
- validateVehicleData(data): valida dados
```

### Princípios SOLID Aplicados

- **S (Single Responsibility)**: Cada componente tem uma responsabilidade
- **O (Open/Closed)**: Sistema aberto para extensão, fechado para modificação
- **L (Liskov Substitution)**: Componentes podem ser substituídos
- **I (Interface Segregation)**: Interfaces pequenas e específicas
- **D (Dependency Inversion)**: Dependência em abstrações, não em implementações


## Possíveis Extensões

- Autenticação e autorização de usuários
- Histórico de vendas e relatórios
- Upload de imagens dos veículos
- Integração com banco de dados (MySQL/PostgreSQL)
- Sistema de avaliação e comentários
- Notificações quando novo estoque chega
- Dashboard com gráficos e analytics
- Exportar dados em PDF/Excel
- App mobile (React Native)
- Sincronização com redes sociais


## Problemas Resolvidos

### Falta de Organização

✅ Sistema centralizado com dados estruturados e fácil acesso

### Dificuldade na Busca

✅ Filtros avançados e busca em tempo real

### Informações Desatualizadas

✅ Atualização instantânea de dados

### Processo Lento de Vendas

✅ Interface ágil e responsiva

### Falta de Relatórios

✅ Dashboard com estatísticas (base para expansão)

## Fontes de Referência

1. **Desbravando Java** - Casa do Código

1. Conceitos fundamentais de POO
2. Estruturas de dados



2. **Java Como Programar** - Deitel & Deitel

1. Padrões de design
2. Boas práticas



3. **Documentação Spring Boot**

1. Conceitos de REST API
2. Padrões de arquitetura



4. **Next.js Documentation**

1. API Routes
2. React Server Components





## Usuários Beneficiados

- **Vendedores**: Consulta rápida de estoque e características
- **Administradores**: Controle total do inventário
- **Gerentes**: Relatórios e análises de vendas
- **Clientes**: Busca facilitada de veículos


## Licença

Este projeto foi desenvolvido para fins educacionais.
