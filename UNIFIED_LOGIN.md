# 🔐 Login Unificado - Guia

## Visão Geral

O login agora é **único** para todo o site. A mesma página de login é usada para:
- ✅ Utilizadores normais
- ✅ Administradores

O redirecionamento ocorre **automaticamente** baseado no **role** (papel) do utilizador.

---

## 📍 URL Única de Login

```
http://localhost:3000/login
```

**Não existe mais `/admin/login` separado.**
- Se tentar acessar `/admin/login`, será redirecionado automaticamente para `/login`

---

## 🔄 Fluxo de Login

```
Utilizador acessa /login
        ↓
Preenche email e senha
        ↓
Clica "Entrar"
        ↓
Backend valida credenciais
        ↓
        ├─ Se role = "ADMIN"  → Redireciona para /admin
        │
        └─ Se role = "CLIENT" → Redireciona para /casas
```

---

## 🔑 Credenciais

### Admin
```
Email:  admin@rentu.com
Senha:  admin123
Role:   ADMIN
Destino: /admin
```

### User Normal
```
Email:  user@rentu.com
Senha:  user123
Role:   CLIENT
Destino: /casas
```

> **Nota:** Credenciais de user normal podem variar. São criadas no `/criar-conta`.

---

## 🎯 Uso

### Fazer Login como Admin

1. Vá para `http://localhost:3000/login`
2. Email: `admin@rentu.com`
3. Senha: `admin123`
4. Clique "Entrar"
5. ✅ Redirecionado para `/admin`

### Fazer Login como User Normal

1. Vá para `http://localhost:3000/login`
2. Email: seu email de utilizador
3. Senha: sua senha
4. Clique "Entrar"
5. ✅ Redirecionado para `/casas` (site público)

---

## 🔐 Proteção de Rotas

### Admin Pages (Protegidas)
- `/admin` - Requer admin
- `/admin/properties` - Requer admin
- `/admin/properties/[id]` - Requer admin
- `/admin/properties/create` - Requer admin

**Se não autenticado → Redireciona para `/login`**

### Public Pages (Sempre acessíveis)
- `/` - Home
- `/casas` - Listagem
- `/imovel/[id]` - Detalhe
- `/login` - Login
- `/criar-conta` - Registro

---

## 📝 Implementação Técnica

### Autenticação (`lib/auth-context.tsx`)
```typescript
- Armazena user e token em localStorage
- Verifica autenticação em cada página
- Fornece login/logout
```

### Componente Protegido (`components/protected-route.tsx`)
```typescript
- Valida se utilizador está autenticado
- Se não: redireciona para /login
- Se sim: mostra conteúdo
```

### Página de Login (`app/login/page.tsx`)
```typescript
- Form de email + senha
- Chama API /auth/login
- Backend retorna user + token
- Frontend verifica role
- Redireciona apropriadamente
```

---

## ✅ O Que Mudou

| Antes | Depois |
|-------|--------|
| `/admin/login` | `/login` (unificado) |
| Login separado | Login único |
| Confusão de URLs | Fluxo claro |
| 2 páginas | 1 página |

---

## 🎨 Página de Login

```
┌─────────────────────────────────────────┐
│  Bem-Vindo a Rentu!!                   │
│                                         │
│   ┌─────────────────────────────────┐  │
│   │ Aceder a Conta                  │  │
│   │ User Normal ou Admin            │  │
│   │                                 │  │
│   │ Email: ________________          │  │
│   │ Senha: ________________          │  │
│   │                                 │  │
│   │  [Entrar]                       │  │
│   │                                 │  │
│   │ Credenciais de teste:           │  │
│   │ admin@rentu.com / admin123      │  │
│   │                                 │  │
│   │ [Criar Conta]  [Esqueceu senha?]│  │
│   └─────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## 🔍 Exemplo Prático

### Cenário 1: Admin faz login

```
1. Admin acessa /login
2. Preenche: admin@rentu.com / admin123
3. Clica "Entrar"
4. Backend valida ✓
5. Frontend vê role="ADMIN"
6. Redireciona para /admin
7. Admin vê dashboard
```

### Cenário 2: User faz login

```
1. User acessa /login
2. Preenche: usuario@email.com / senha
3. Clica "Entrar"
4. Backend valida ✓
5. Frontend vê role="CLIENT"
6. Redireciona para /casas
7. User vê listagem de propriedades
```

### Cenário 3: User tenta acessar `/admin` sem login

```
1. User acessa /admin sem login
2. Protected route detecta: não autenticado
3. Redireciona para /login
4. User faz login
5. Redirecionado para /admin (se admin)
   ou /casas (se cliente)
```

---

## 📋 Checklist

- [x] Login unificado em `/login`
- [x] `/admin/login` redireciona para `/login`
- [x] Redirecionamento baseado em role
- [x] Proteção de rotas admin
- [x] Mensagens de erro
- [x] Estados de loading
- [x] Credenciais de teste na página
- [x] Token armazenado em localStorage
- [x] Logout limpa sessão

---

## 🆘 Troubleshooting

### ❌ "Erro ao fazer login"
- Verifique email/senha
- Backend deve estar rodando
- Verifique console do navegador (F12)

### ❌ "Redirecionamento infinito"
- Limpe localStorage
- F12 → Application → Limpar cookies/storage
- Tente novamente

### ❌ "Não sou redirecionado para admin"
- Verifique role do user no banco
- Admin deve ter `role: "ADMIN"`

---

## 🎯 Próximos Passos

1. ✅ Login unificado
2. [ ] Integrar com `/criar-conta`
3. [ ] Recuperação de senha
4. [ ] 2FA (autenticação dupla)
5. [ ] Social login (Google, etc.)

---

Agora o fluxo é muito mais simples e intuitivo! 🎉
