# Dashboard Admin - Guia de Uso

## 🔐 Acesso ao Admin

Você faz login na **mesma página** de login do site:

**URL:** `http://localhost:3000/login`

### Credenciais de Admin (para desenvolvimento)
```
Email: admin@rentu.com
Senha: admin123
```

> ⚠️ **Importante:** Essas são credenciais padrão apenas para desenvolvimento. Antes de lançar em produção, você deve criar usuários reais no backend com role `ADMIN`.

### Como Funciona:
1. Você acessa `/login`
2. Faz login com credenciais de admin
3. O sistema detecta que você é ADMIN
4. **Redireciona automaticamente para `/admin`**

Se for um utilizador normal:
1. Você acessa `/login`
2. Faz login com suas credenciais
3. O sistema detecta que você é CLIENT
4. **Redireciona automaticamente para `/casas`**

---

## 📋 Menu Principal

O dashboard admin tem as seguintes seções:

### 1. **Propriedades** (`/admin/properties`)
Lista todas as propriedades cadastradas com:
- Título
- Cidade
- Preço
- Status (Publicado/Rascunho)
- Número de imagens
- Ações: Editar, Deletar

### 2. **Nova Propriedade** (`/admin/properties/create`)
Cria uma nova propriedade com todos os dados:
- Título (gerado slug automaticamente)
- Tipo (Casa, Apartamento, Terreno, etc.)
- Finalidade (Aluguel/Venda)
- Preço
- Localização (Endereço, Cidade, Bairro, Província)
- Detalhes (Quartos, Banheiros, Suites, Estacionamento, Área)
- Descrição
- Status

---

## ✏️ Editar Propriedade

**URL:** `/admin/properties/{id}`

Nesta página você pode:

### 1. **Editar Informações Básicas**
- Título
- Preço
- Quartos
- Banheiros
- Cidade
- Bairro
- Endereço
- Status

### 2. **Atualizar Descrição**
A seção "Descrição" permite adicionar uma descrição longa e detalhada:
- Use quebras de linha (`\n`) para parágrafos
- A descrição será exibida na página pública do imóvel

### 3. **Gerenciar Imagens**

#### Adicionar Nova Imagem:
1. Cole a URL da imagem em "URL da Imagem"
2. Adicione uma descrição (opcional)
3. Marque "Usar como imagem de capa" se quiser
4. Clique em "Adicionar"

#### Usar como Capa:
- A imagem de capa aparece no preview da listagem
- Clique no botão "Usar como Capa" para atualizar

#### Deletar Imagem:
- Clique no botão "Deletar" para remover a imagem

---

## 🖼️ Formato de URLs de Imagens

### Opções para adicionar imagens:

**1. Hospedagem Externa (Recomendado inicialmente)**
- Use serviços como: Imgur, Firebase Storage, AWS S3, etc.
- Copie a URL da imagem e cole no admin

**Exemplo:**
```
https://imgur.com/abc123.jpg
https://storage.googleapis.com/bucket/image.jpg
```

**2. URLs Públicas Diretas**
- Use URLs de imagens do seu servidor (se estiverem públicas)
- Se tiver um endpoint `/uploads`, pode usar:
```
http://localhost:3000/uploads/image.jpg
```

**3. Próxima Melhoria (a implementar)**
- Upload direto de arquivos via interface

---

## 📝 Exemplo Prático

### Criar um Imóvel Completo:

#### Passo 1: Criar a Propriedade
1. Vá para `/admin/properties/create`
2. Preencha:
   - **Título:** "Casa Espaçosa em Maputo"
   - **Tipo:** Casa
   - **Finalidade:** Aluguel
   - **Preço:** 2000
   - **Endereço:** "Rua Principal, Maputo"
   - **Cidade:** Maputo
   - **Bairro:** Mafalala
   - **Quartos:** 2
   - **Banheiros:** 2
   - **Descrição:** 
     ```
     Imóvel disponível para Arrendamento
     5 Mins da Estrada Principal
     Imóvel Espaçoso e cómodo
     2000Mzn por mês
     ```
   - **Status:** Publicado
3. Clique em "Criar Propriedade"

#### Passo 2: Adicionar Imagens
1. Na página de edição, vá para "Gerenciar Imagens"
2. Adicione múltiplas imagens:
   - **Imagem 1:** URL → Descrição: "Sala de estar" → Marcar como capa → Adicionar
   - **Imagem 2:** URL → Descrição: "Quarto 1" → Adicionar
   - **Imagem 3:** URL → Descrição: "Cozinha" → Adicionar

#### Passo 3: Verificar no Site Público
1. Vá para `/casas` no site público
2. Clique na propriedade criada
3. Veja as informações, descrição e fotos

---

## 🔄 Fluxo de Publicação

### Estados de uma Propriedade:

| Status | Visível no Site? | Pode Editar? |
|--------|-----------------|-------------|
| RASCUNHO | ❌ Não | ✅ Sim |
| PUBLICADO | ✅ Sim | ✅ Sim |
| ARQUIVADO | ❌ Não | ✅ Sim |

**Para publicar uma propriedade:**
1. Edite a propriedade
2. Mude "Status" para "Publicado"
3. Clique em "Salvar"
4. Propriedade agora aparece em `/casas`

---

## 🎯 Dicas de Uso

### ✅ Boas Práticas:

1. **Descrições Detalhadas**
   - Use quebras de linha para melhor legibilidade
   - Mencione características especiais
   - Inclua informações de contato/próximos passos

2. **Imagens de Qualidade**
   - Use imagens com boa resolução
   - Ordene logicamente (sala, quartos, cozinha, etc.)
   - Sempre tenha uma imagem de capa clara

3. **Informações Completas**
   - Sempre preencha: Título, Preço, Cidade, Endereço
   - Adicione quartos/banheiros quando aplicável
   - Mude para "Publicado" quando pronto

### ❌ Evitar:

- URLs de imagem quebradas ou inválidas
- Preços "0" ou inválidos
- Descrições vazias
- Propriedades sem imagens de capa
- Deixar em rascunho permanentemente

---

## 🔧 Autenticação no Backend

Para que o admin funcione, você precisa de um usuário com role `ADMIN` no backend.

### Criar usuário admin via banco de dados:

```sql
INSERT INTO "User" (id, name, email, password, role, "accountStatus", "emailVerifiedAt", "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'Admin',
  'admin@rentu.com',
  -- Usar bcrypt: 'admin123' hashed
  '$2b$10$...',
  'ADMIN',
  'ACTIVE',
  NOW(),
  NOW(),
  NOW()
);
```

Ou use o endpoint de registro se tiver um:
```bash
POST /api/auth/register
{
  "name": "Admin",
  "email": "admin@rentu.co.mz",
  "password": "admin123",
  "role": "ADMIN"
}
```

---

## 🐛 Troubleshooting

### Problema: "Erro ao fazer login"
**Solução:**
- Verifique se o backend está rodando (`npm run start:dev` em `/backend`)
- Confirme as credenciais
- Verifique se o usuário existe no banco de dados

### Problema: Imagens não aparecem
**Solução:**
- Verifique se a URL é pública e acessível
- Teste a URL no navegador
- Certifique-se de que não há bloqueio de CORS

### Problema: "Erro ao salvar propriedade"
**Solução:**
- Preencha todos os campos obrigatórios (Título, Preço, Cidade, Endereço)
- Verifique se o token JWT ainda é válido
- Tente fazer logout e login novamente

### Problema: Sessão expirada
**Solução:**
- Faça logout e login novamente
- O token é armazenado em `localStorage`
- Limpe `localStorage` se tiver problemas persistentes

---

## 📚 Próximas Melhorias

- [ ] Upload direto de arquivos
- [ ] Editor de texto rich (HTML)
- [ ] Visualização de preview do imóvel
- [ ] Bulk edit (editar múltiplos imóveis)
- [ ] Agendamento de publicação
- [ ] Análise de visualizações por imóvel
- [ ] Gerenciamento de usuários admin
- [ ] Backup e exportação de dados

---

## 📞 Suporte

Se tiver dúvidas ou problemas, verifique:
1. Se o backend está rodando
2. Se a URL do API está correta em `.env.local`
3. Se você está autenticado (token em localStorage)
4. Os logs do navegador (F12 → Console)

