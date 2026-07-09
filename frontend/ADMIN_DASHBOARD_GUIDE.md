# Dashboard Admin - Rentu
## Guia de Utilização

Bem-vindo ao novo painel administrativo da Rentu! Este guia apresenta as funcionalidades e como utilizá-las.

## 📋 Estrutura da Dashboard

### 1. **Sidebar (Navegação Lateral)**
- **Dashboard**: Página inicial com visão geral de estatísticas
- **Imóveis**: Gerenciamento de todas as propriedades cadastradas
- **Usuários**: Gerenciamento de contas e permissões
- **Estatísticas**: Relatórios e análises de dados
- **Mensagens**: Mensagens de usuários
- **Documentos**: Gerenciamento de arquivos

### 2. **Header (Topo)**
- Título da página atual
- Sino de notificações
- Configurações
- Perfil do usuário

## 🏠 Dashboard Principal

### Cards de Estatísticas
Exibe 4 métricas principais:
- **Total de Usuários**: Contas registradas no sistema
- **Usuários Ativos**: Usuários com atividade recente
- **Total de Imóveis**: Propriedades cadastradas
- **Pendentes Aprovação**: Imóveis aguardando revisão

### Seção de Imóveis Recentes
- Tabela com últimas propriedades cadastradas
- Status: Aprovado, Pendente, Rejeitado
- Link "Ver todos" para gerenciamento completo

### Gráficos e Visão Geral
- **Imóveis por Status**: Barra de progresso dos estados
- **Usuários Recentes**: Lista dos últimos usuários cadastrados

## 👥 Gerenciamento de Usuários

### Funcionalidades
1. **Buscar Usuários**: Campo de busca por nome ou email
2. **Filtrar**: Por tipo de usuário (todos)
3. **Criar Novo**: Botão para adicionar novo usuário
4. **Editar**: Clique no ícone de edição
5. **Deletar**: Clique no ícone de lixeira

### Informações Exibidas
- Nome completo
- Email
- Telefone
- Tipo (Proprietário, Cliente, Agente)
- Status (Ativo, Pendente, Suspenso)
- Quantidade de imóveis

## 🏢 Gerenciamento de Imóveis

### Funcionalidades
1. **Buscar Imóveis**: Campo de busca por título ou cidade
2. **Filtrar por Status**: 
   - Todos
   - Rascunho
   - Publicado
   - Reservado
   - Vendido
3. **Criar Novo**: Botão para adicionar nova propriedade
4. **Editar**: Clique no ícone de edição
5. **Deletar**: Clique no ícone de lixeira

### Informações Exibidas
- Título do imóvel
- Localização (cidade)
- Preço
- Status
- Quantidade de fotos

## 📊 Estatísticas e Relatórios

### KPIs Principais
- Total de visitas
- Taxa de crescimento
- Novas propriedades
- Agendamentos em processamento

### Gráficos (Implementação Futura)
- Imóveis por mês
- Usuários ativos

## 💬 Mensagens

### Funcionalidades
1. **Buscar Mensagens**: Por remetente ou assunto
2. **Ver Completo**: Visualizar mensagem inteira
3. **Deletar**: Remover mensagem

### Status de Leitura
- Mensagens não lidas com borda vermelha
- Mensagens lidas com borda cinza

## 📄 Documentos

### Funcionalidades
1. **Buscar Documentos**: Campo de busca
2. **Enviar Novo**: Botão para upload de documento
3. **Baixar**: Clique no ícone de download
4. **Deletar**: Clique no ícone de lixeira

### Tipos de Documentos
- Contratos
- Plantas
- Certificados
- Escrituras
- Identificação
- Outros

## 🎨 Design e Responsividade

### Cores Principais
- **Vermelho (#f0442b)**: Cor destaque e ações principais
- **Verde**: Status aprovado
- **Amarelo**: Status pendente
- **Vermelho**: Status rejeitado
- **Azul**: Informações e links

### Responsividade
- **Desktop**: Layout completo com sidebar fixa
- **Tablet**: Sidebar colapsável
- **Mobile**: Menu hambúrguer com overlay

## 🔐 Segurança

- Todas as páginas requerem autenticação
- Logout disponível no perfil do usuário
- Proteção contra acesso não autorizado

## 📝 Próximos Passos

Para integrar com sua API backend:

1. **Estatísticas**: Implementar chamadas à API em `/api/admin/stats`
2. **Usuários**: Conectar com endpoints de usuários
3. **Imóveis**: Já integrado com `getAllProperties()` e `deleteProperty()`
4. **Gráficos**: Adicionar biblioteca como `recharts` ou `chart.js`
5. **Mensagens**: Criar endpoints para gerenciar mensagens
6. **Documentos**: Implementar upload e gerenciamento de arquivos

## ⚙️ Configuração

### Componentes Utilizados
- **React Icons**: Ícones do sistema
- **Tailwind CSS**: Estilos
- **Next.js**: Framework
- **TypeScript**: Tipagem

### Arquivos Principais
- `components/admin/sidebar.tsx`: Navegação lateral
- `components/admin/header.tsx`: Cabeçalho
- `components/admin/stat-card.tsx`: Cards de estatísticas
- `app/admin/page.tsx`: Dashboard principal
- `app/admin/users/page.tsx`: Gerenciamento de usuários
- `app/admin/properties/page.tsx`: Gerenciamento de imóveis
- `app/admin/stats/page.tsx`: Estatísticas
- `app/admin/messages/page.tsx`: Mensagens
- `app/admin/documents/page.tsx`: Documentos

## 🆘 Suporte

Para questões e melhorias, consulte a documentação do projeto ou entre em contato com o desenvolvedor.
