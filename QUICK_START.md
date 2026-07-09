# 🚀 QUICK START - Comece em 5 Minutos

## 1️⃣ Inicie o Backend

```bash
cd backend
npm run start:dev
```

Você verá:
```
[Nest] - 07/03/2026, 10:30:00 AM     LOG [NestFactory] Nest application successfully started
```

✅ Backend rodando em `http://localhost:3000`

---

## 2️⃣ Inicie o Frontend

```bash
cd frontend
npm run dev
```

Você verá:
```
  ▲ Next.js 16.2.9
  - Local:        http://localhost:3000
```

✅ Frontend rodando em `http://localhost:3000`

---

## 3️⃣ Acesse o Login

Abra no navegador:
```
http://localhost:3000/login
```

**Mesma página para todos - User Normal OU Admin:**

### Para Admin:
- Email: `admin@rentu.com`
- Senha: `admin123`
→ Redireciona para `/admin`

### Para User Normal:
- Email: seu email
- Senha: sua senha
→ Redireciona para `/casas`

---

## 4️⃣ Crie Sua Primeira Propriedade

### Opção A: Via Admin Dashboard (Recomendado)

1. Na página `/admin`, clique em **"Nova Propriedade"**
2. Preencha:
   - **Título:** "Casa Bonita em Maputo"
   - **Tipo:** Casa
   - **Finalidade:** Aluguel
   - **Preço:** 2500
   - **Cidade:** Maputo
   - **Endereço:** "Rua Principal, 123"
   - **Quartos:** 3
   - **Banheiros:** 2
   - **Descrição:** Sua descrição aqui...
3. Clique em **"Criar Propriedade"**
4. Adicione imagens:
   - Clique em **"Adicionar Imagem"**
   - Cole URL: `https://via.placeholder.com/800x600?text=Foto+1`
   - Marque "Usar como Capa"
   - Clique **"Adicionar"**
5. Mude status para **"Publicado"**
6. Clique **"Salvar"**

### Opção B: Via API (Para testes)

```bash
# 1. Crie a propriedade
curl -X POST http://localhost:3000/api/properties \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Casa Bonita",
    "slug": "casa-bonita",
    "description": "Uma casa bem bonita",
    "type": "HOUSE",
    "purpose": "RENT",
    "price": 2500,
    "bedrooms": 3,
    "bathrooms": 2,
    "address": "Rua Principal",
    "city": "Maputo",
    "status": "PUBLISHED"
  }'

# 2. Copie o ID retornado

# 3. Adicione uma imagem
curl -X POST http://localhost:3000/api/properties/{id}/images \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://via.placeholder.com/800x600?text=Foto",
    "isCover": true
  }'
```

---

## 5️⃣ Visualize no Site Público

Abra:
```
http://localhost:3000/casas
```

✅ Sua propriedade aparece na listagem!

Clique nela para ver os detalhes em:
```
http://localhost:3000/imovel/{id}
```

✅ Vê a descrição e fotos!

---

## 📊 URLs Principais

| Página | URL | Descrição |
|--------|-----|-----------|
| **Site Público** |
| Home | http://localhost:3000 | Home do site |
| Listagem | http://localhost:3000/casas | Todas as casas |
| Detalhe | http://localhost:3000/imovel/{id} | Detalhe de uma casa |
| Login | http://localhost:3000/login | Login (Admin/User) |
| **Admin** |
| Dashboard | http://localhost:3000/admin | Painel admin |
| Propriedades | http://localhost:3000/admin/properties | Lista admin |
| Editar | http://localhost:3000/admin/properties/{id} | Editar casa |
| Criar | http://localhost:3000/admin/properties/create | Nova casa |

---

## 🎯 O Que Você Pode Fazer Agora

### ✅ Admin (http://localhost:3000/admin)
- [x] Criar propriedades
- [x] Editar propriedades
- [x] **Adicionar descrição personalizada**
- [x] **Adicionar/deletar fotos**
- [x] Marcar foto como capa
- [x] Publicar/Arquivar
- [x] Deletar propriedades

### ✅ Site Público
- [x] Ver lista de casas
- [x] Clicar em casa para detalhe
- [x] **Ver descrição completa**
- [x] **Ver galeria de fotos**
- [x] Abrir lightbox
- [x] Navegar entre fotos
- [x] Ver info do proprietário

---

## 🆘 Problemas Comuns

### ❌ "Erro ao fazer login"
- Verifique se backend está rodando: `npm run start:dev` em `/backend`
- Verifique se usa credenciais: `admin@rentu.com` / `admin123`

### ❌ "Não vejo as propriedades"
- Certifique-se que status = "PUBLISHED"
- Backend deve estar rodando
- Recarregue a página (F5)

### ❌ "Imagens não aparecem"
- Use URLs públicas e completas (comece com http/https)
- Teste a URL no navegador diretamente
- Algumas URLs podem ter bloqueio CORS

### ❌ "Erro ao salvar"
- Preencha TODOS os campos obrigatórios
- Preço deve ser um número válido
- Tente fazer logout e login novamente

---

## 💡 Dicas Rápidas

### Para Adicionar Descrição:
1. Vá para admin `/admin/properties`
2. Clique em editar
3. Procure por "DESCRIÇÃO"
4. Escreva o texto
5. Clique "Salvar"

### Para Adicionar Fotos:
1. Na página de edição
2. Procure por "GERENCIAR IMAGENS"
3. Cole a URL da foto
4. Clique "Adicionar"
5. Se for primeira, clique "Usar como Capa"

### URLs de Teste de Imagens:
```
https://via.placeholder.com/800x600?text=Foto+1
https://via.placeholder.com/800x600?text=Foto+2
https://via.placeholder.com/800x600?text=Foto+3
```

---

## 🎨 Personalizar

### Mudar Cores Rentu
- Edite: `/frontend/app/globals.css`
- Procure por `#f0442b` (vermelho)
- Troque pela sua cor

### Mudar Nomes/Textos
- Edite os arquivos `.tsx` nas páginas
- Procure pelos textos em português
- Customize conforme quiser

---

## 📞 Próximos Passos

1. **Criar mais propriedades** com descrições e fotos
2. **Testar o fluxo completo** (criar → editar → publicar → visualizar)
3. **Ajustar cores e design** conforme sua marca
4. **Implementar upload de imagens** (próxima versão)
5. **Conectar email de notificações** (próxima versão)

---

## 🎉 Parabéns!

Você tem agora um **sistema completo** de gerenciamento de propriedades com:
- ✅ Admin para gerenciar
- ✅ Site público para visualizar
- ✅ Descrições personalizadas
- ✅ Galeria de fotos interativa
- ✅ Banco de dados estruturado

**Aproveite!** 🚀

---

## 📚 Mais Documentação

- `ADMIN_GUIDE.md` - Guia completo do admin
- `SYSTEM_OVERVIEW.md` - Visão geral da arquitetura
- `PROPERTY_IMAGES_GUIDE.md` - Guia de imagens
- `TESTING_IMAGES.md` - Exemplos de API

