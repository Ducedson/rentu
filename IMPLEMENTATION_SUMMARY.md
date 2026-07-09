# Implementação: Descrição e Fotos para Cada Imóvel

## Resumo das Mudanças

### Backend (NestJS/Prisma)

**Novos Arquivos:**
- `backend/src/properties/dto/property-image.dto.ts` - DTOs para gerenciar imagens

**Arquivos Modificados:**
- `backend/src/properties/properties.service.ts` - Adicionados métodos:
  - `addImage()` - Adiciona nova imagem
  - `updateImage()` - Atualiza metadados da imagem
  - `deleteImage()` - Remove imagem
  - `getPropertyImages()` - Lista imagens

- `backend/src/properties/properties.controller.ts` - Adicionados endpoints:
  - `GET /properties/:id/images` - Lista imagens
  - `POST /properties/:id/images` - Cria imagem
  - `PATCH /properties/:id/images/:imageId` - Atualiza imagem
  - `DELETE /properties/:id/images/:imageId` - Deleta imagem

**Schema Prisma:**
- Modelo `PropertyImage` já estava presente no schema
- Nenhuma migração de banco necessária

### Frontend (Next.js)

**Novos Arquivos:**
- `frontend/lib/api.ts` - Cliente API com tipos TypeScript
- `frontend/app/imovel/[id]/page.tsx` - Página de detalhes do imóvel
- `frontend/app/casas/page.tsx` - Página de listagem de imóveis
- `frontend/.env.local` - Configuração de ambiente
- `frontend/.env.example` - Template de variáveis de ambiente

**Recursos Implementados:**

1. **Página de Detalhes do Imóvel** (`/imovel/[id]`)
   - Busca dados dinâmicos da API
   - Exibe descrição completa do imóvel
   - Galeria de fotos com lightbox
   - Navegação entre fotos com setas
   - Contador de fotos
   - Informações do proprietário (nome, telefone)
   - Dados técnicos (quartos, banheiros, área, tipo, etc.)
   - Links para contactar via telefone e WhatsApp
   - Tratamento de erros e loading

2. **Página de Listagem** (`/casas`)
   - Lista todos os imóveis publicados
   - Grid responsivo com cover images
   - Exibe preço e métricas principais
   - Links para página de detalhe

3. **Configuração de API**
   - Cliente Axios pré-configurado
   - Tipos TypeScript para Property, PropertyImage, PropertyOwner
   - Tratamento de erros
   - URL base configurável via `.env.local`

## Como Funciona

### Fluxo de Dados

1. **Criação de Imóvel:**
   - POST `/api/properties` com dados básicos
   - Retorna imóvel criado com ID

2. **Upload de Fotos:**
   - POST `/api/properties/{id}/images` com URL da foto
   - Cada foto tem: URL, alt text, ordem de exibição, indicador de capa

3. **Visualização:**
   - Frontend busca imóvel via GET `/api/properties/{id}`
   - Exibe descrição e todas as fotos
   - Usuário pode navegar pela galeria

## Configuração

### 1. Variáveis de Ambiente
```bash
# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### 2. Executar o Projeto
```bash
# Terminal 1: Backend
cd backend
npm run start:dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

## API Endpoints

### Propriedades
- `GET /properties` - Lista propriedades publicadas
- `GET /properties/:id` - Detalhes de uma propriedade
- `POST /properties` - Cria propriedade (requer auth)
- `PATCH /properties/:id` - Atualiza propriedade (requer auth)
- `DELETE /properties/:id` - Deleta propriedade (requer auth)

### Imagens
- `GET /properties/:id/images` - Lista imagens
- `POST /properties/:id/images` - Adiciona imagem (requer auth)
- `PATCH /properties/:id/images/:imageId` - Atualiza imagem (requer auth)
- `DELETE /properties/:id/images/:imageId` - Remove imagem (requer auth)

## Estrutura de Dados

### Property
```json
{
  "id": "uuid",
  "title": "Casa Espaçosa",
  "description": "Descrição detalhada...",
  "price": 2000,
  "currency": "MZN",
  "bedrooms": 2,
  "bathrooms": 2,
  "city": "Maputo",
  "district": "Mafalala",
  "address": "Endereço completo",
  "images": [
    {
      "id": "uuid",
      "url": "https://...",
      "altText": "Descrição da foto",
      "isCover": true,
      "sortOrder": 0
    }
  ],
  "owner": {
    "id": "uuid",
    "name": "Nome do Proprietário",
    "phone": "+258821410299"
  }
}
```

## Funcionalidades

✅ Cada imóvel tem descrição personalizada
✅ Cada imóvel pode ter múltiplas fotos
✅ Galeria de fotos interativa com lightbox
✅ Informações do proprietário exibidas
✅ Listagem de imóveis com filtros
✅ Página dinâmica por imóvel
✅ Responsive design
✅ Tratamento de erros
✅ Loading states
✅ TypeScript com tipos completos

## Documentação

Veja também:
- `PROPERTY_IMAGES_GUIDE.md` - Guia detalhado de uso
- `TESTING_IMAGES.md` - Exemplos de testes com curl

## Próximas Melhorias

- Upload direto de imagens (sem necessidade de URL externa)
- Otimização e cache de imagens
- Suporte a vídeos
- Tours virtuais 360°
- Edição em lote de imagens
- API de upload com presigned URLs
