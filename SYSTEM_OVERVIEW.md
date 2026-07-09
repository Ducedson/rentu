# 🚀 Rentu - Sistema Completo de Propriedades

## 📊 Visão Geral da Arquitetura

```
┌─────────────────────────────────────────────────────────────────┐
│                      RENTU PLATFORM                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────┬─────────────────────────────────┐
│      FRONTEND (Next.js)      │     BACKEND (NestJS/Prisma)     │
├─────────────────────────────┼─────────────────────────────────┤
│                             │                                 │
│  🌐 SITE PÚBLICO            │  🔌 APIS                        │
│  ├─ Home (/casas)           │  ├─ GET /properties            │
│  ├─ Detalhe (/imovel/[id])  │  ├─ GET /properties/:id         │
│  └─ Contactos               │  ├─ POST /properties            │
│                             │  ├─ PATCH /properties/:id       │
│  🔐 ADMIN                   │  ├─ DELETE /properties/:id      │
│  ├─ Login (/admin/login)    │  ├─ POST /properties/:id/images │
│  ├─ Dashboard (/admin)      │  ├─ PATCH /properties/:id/images│
│  ├─ Propriedades            │  ├─ DELETE /properties/:id/images│
│  ├─ Editar (/admin/prop/id) │  └─ GET /auth/login            │
│  └─ Criar (/admin/prop/create) │                             │
│                             │  🗄️ DATABASE (PostgreSQL)      │
│  🛠️ UTILITÁRIOS             │  ├─ Property                   │
│  ├─ lib/api.ts             │  ├─ PropertyImage              │
│  ├─ lib/admin.ts           │  ├─ PropertyVideo              │
│  └─ lib/auth-context.tsx   │  ├─ User                       │
│                             │  ├─ Agent                      │
└─────────────────────────────┴─────────────────────────────────┘
```

---

## 📱 Funcionalidades por Página

### 🌐 SITE PÚBLICO

#### 1️⃣ Home - Listagem de Casas (`/casas`)
```
[Header]
[Título: "Imóveis Disponíveis"]
[Grid de Propriedades 2x2 / 3x3 / 4x4 responsivo]
  ├─ [Imagem de Capa]
  ├─ [Preço]
  ├─ [Quartos/Banheiros]
  └─ [Clique para ir a /imovel/{id}]
[Footer]
```

**Dados Carregados:**
- Lista de todas as propriedades com status PUBLISHED
- Imagem de capa para cada propriedade
- Preço formatado
- Métricas (quartos, banheiros)

---

#### 2️⃣ Detalhes do Imóvel (`/imovel/[id]`)
```
[Header]
[Galeria Grande com 12+ Fotos]
  └─ [Botão "12 Fotos" abre lightbox]

[Grid 2 Colunas]

[Coluna 1 - Informações]
├─ Preço: 2000 MZN
├─ Métricas: 2 Quartos, 2 Banheiros
├─ Informações do Imóvel
│  ├─ Tipo: Apartamento
│  ├─ Cidade: Maputo
│  ├─ Bairro: Mafalala
│  ├─ Área: 120 m²
│  └─ ...mais dados
├─ Descrição: [Texto Personalizado]
└─ Localização: [Endereço Completo]

[Coluna 2 - Contacto]
├─ Foto do Proprietário
├─ Nome: Samuel Tembe
├─ Botão: Contactar (tel:)
└─ Botão: Whatsapp

[Imóveis Similares]
└─ Grid com outros imóveis
    
[Lightbox Gallery]
├─ Imagem em fullscreen
├─ Setas prev/next
├─ Contador: "3/12"
└─ Botão fechar
```

**Dados Carregados Dinamicamente:**
- Descrição específica da propriedade
- Todas as imagens da propriedade
- Informações do proprietário
- Detalhes técnicos

---

### 🔐 ADMIN - GERENCIAMENTO

#### 1️⃣ Login (`/admin/login`)
```
[Formulário]
├─ Email: admin@rentu.com
├─ Senha: admin123
├─ Botão: Entrar
└─ [Mensagens de erro em vermelho]
```

---

#### 2️⃣ Dashboard Principal (`/admin`)
```
[Header]
├─ Logo: "Rentu Admin"
├─ Bem-vindo, [Nome]
└─ Botão Sair

[Cards de Atalhos]
├─ Propriedades (ir para lista)
├─ Nova Propriedade (ir para criar)
└─ Instruções Rápidas
```

---

#### 3️⃣ Listagem de Propriedades (`/admin/properties`)
```
[Header]
├─ Título: "Propriedades"
└─ Botão: "+ Nova Propriedade"

[Tabela]
├─ Colunas: Título, Cidade, Preço, Status, Imagens
├─ Linhas: Cada propriedade
└─ Ações: [Editar] [Deletar]

[Status Visual]
├─ PUBLISHED: Verde
└─ DRAFT: Amarelo
```

---

#### 4️⃣ Editar Propriedade (`/admin/properties/[id]`)
```
[Header]
├─ Título da Propriedade
├─ Botão Voltar
└─ Botão Salvar

[Formulário - Informações]
├─ Título, Preço, Cidade, Bairro
├─ Quartos, Banheiros, Estacionamento
├─ Endereço, Localização
└─ Status (DRAFT/PUBLISHED)

[Formulário - DESCRIÇÃO]
├─ Textarea grande
├─ Suporta quebras de linha
└─ Preview em tempo real

[Gerenciador de Imagens]
├─ Formulário para adicionar
│  ├─ URL da imagem
│  ├─ Descrição
│  └─ ☑ Usar como capa
│
├─ Grid de imagens atuais
│  ├─ Thumbnail
│  ├─ Label "Capa" se for
│  └─ Ações: [Usar como Capa] [Deletar]
│
└─ Contagem de imagens

[Botões Ação]
└─ [Salvar] [Cancelar]
```

---

#### 5️⃣ Criar Propriedade (`/admin/properties/create`)
```
[Header]
├─ Título: "Nova Propriedade"
├─ Botão Voltar
└─ Botão Criar

[Formulário Completo]
├─ Informações Básicas
│  ├─ Título (gera slug auto)
│  ├─ Tipo (dropdown)
│  ├─ Finalidade (dropdown)
│  └─ Preço
│
├─ Localização
│  ├─ Endereço
│  ├─ Cidade
│  ├─ Bairro
│  └─ Província
│
├─ Detalhes
│  ├─ Quartos
│  ├─ Banheiros
│  ├─ Suites
│  ├─ Estacionamento
│  └─ Área (m²)
│
└─ Descrição & Status
   ├─ Textarea descrição
   └─ Status (DRAFT/PUBLISHED)

[Botões]
└─ [Cancelar] [Criar Propriedade]
```

---

## 🗄️ Banco de Dados - Modelos Principais

### Property (Propriedade)
```
- id (UUID)
- title (String)
- slug (String) - URL amigável
- description (Text) - **DESCRIÇÃO PERSONALIZADA**
- type (HOUSE, APARTMENT, LAND, etc.)
- purpose (RENT, SALE)
- status (DRAFT, PUBLISHED, ARCHIVED)
- price (Decimal)
- bedrooms, bathrooms, suites, parkingSpaces (Int)
- area (Decimal)
- address, city, district, province (String)
- latitude, longitude (Decimal)
- ownerId (FK → User)
- createdAt, updatedAt (DateTime)

Related:
├─ images: PropertyImage[]
├─ owner: User
└─ ...outros relacionamentos
```

### PropertyImage (Imagem de Propriedade)
```
- id (UUID)
- url (String) - **URL DA IMAGEM**
- altText (String?) - Descrição
- isCover (Boolean) - É imagem de capa?
- sortOrder (Int) - Ordem de exibição
- propertyId (FK → Property)
- createdAt (DateTime)
```

---

## 🔄 Fluxo de Dados

### Criar Propriedade com Fotos e Descrição:

```
1. Admin vai em /admin/properties/create
   ↓
2. Preenche formulário:
   - Título, Tipo, Finalidade, Preço, Localização, etc.
   - Descrição (texto longo personalizado)
   - Deixa em DRAFT por enquanto
   ↓
3. Clica "Criar"
   POST /api/properties
   ↓
4. Propriedade criada, redireciona para /admin/properties/[id]
   ↓
5. Na página de edição, adiciona imagens:
   - Cola URL
   - Descreve (ex: "Sala de Estar")
   - Marca como capa se for primeira
   ↓
6. POST /api/properties/[id]/images para cada imagem
   ↓
7. Muda status para PUBLISHED
   PATCH /api/properties/[id]
   ↓
8. Propriedade aparece em /casas (site público)
   ↓
9. Usuário clica em propriedade
   GET /api/properties/[id]
   ↓
10. Vê em /imovel/[id]:
    - Descrição personalizada
    - Todas as fotos
    - Lightbox interativo
    - Informações do proprietário
```

---

## 🎯 Resumo das Funcionalidades

### ✅ Implementado

**Site Público:**
- [x] Listagem de propriedades
- [x] Página de detalhe dinâmica
- [x] Galeria de fotos
- [x] Lightbox interativo
- [x] Descrição personalizada
- [x] Informações do proprietário

**Admin:**
- [x] Login com JWT
- [x] Dashboard
- [x] Criar propriedade
- [x] Editar propriedade
- [x] Adicionar descrição
- [x] Gerenciar imagens (add/delete/set cover)
- [x] Deletar propriedade
- [x] Protección de rotas
- [x] Estados visuais (loading, erro, sucesso)

**Backend:**
- [x] APIs CRUD para propriedades
- [x] APIs CRUD para imagens
- [x] Validação de dados
- [x] Autenticação JWT
- [x] Relacionamentos no banco

---

## 🚀 Como Começar

### 1. Instalar dependências
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Configurar banco de dados
```bash
cd backend
npx prisma migrate dev
```

### 3. Iniciar desenvolvimento
```bash
# Terminal 1 - Backend
cd backend
npm run start:dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 4. Acessar
- **Admin:** http://localhost:3000/admin
- **Site:** http://localhost:3000/casas
- **Detalhe:** http://localhost:3000/imovel/{id}

---

## 📚 Documentação

Veja também:
- `ADMIN_GUIDE.md` - Guia detalhado do admin
- `PROPERTY_IMAGES_GUIDE.md` - Guia de imagens
- `ADMIN_IMPLEMENTATION.md` - Resumo técnico
- `TESTING_IMAGES.md` - Exemplos de API

---

## 🎨 Paleta de Cores

- **Primária:** #f0442b (Vermelho Rentu)
- **Secundária:** Verde (#10b981) para ações
- **Fundo:** Cinza claro (#f3f4f6)
- **Texto:** Preto (#000) / Cinza (#666)
- **Estados:** 
  - Sucesso: Verde
  - Erro: Vermelho
  - Aviso: Amarelo
  - Info: Azul

---

## 🔐 Segurança

- JWT tokens para autenticação
- Protección de rotas (só autenticados)
- Validação de dados em frontend e backend
- CORS habilitado
- Hash de senhas (bcrypt)

---

## 📱 Responsividade

- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1023px)
- ✅ Mobile (< 768px)
- ✅ Flexbox/Grid para layouts
- ✅ Imagens otimizadas

---

## 🎉 Status Final

**Sistema Completo e Funcional!**

Você tem agora:
- ✅ Site público bonito para visualizar propriedades
- ✅ Admin profissional para gerenciar tudo
- ✅ Descrições personalizadas por imóvel
- ✅ Múltiplas fotos por imóvel
- ✅ Galeria interativa com lightbox
- ✅ Banco de dados estruturado
- ✅ APIs robustas
- ✅ Autenticação segura

**Pronto para usar!** 🚀
