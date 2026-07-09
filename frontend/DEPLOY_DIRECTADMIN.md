# Deploy da Rentu no DirectAdmin

O frontend esta configurado para gerar um site estatico em `out/`, ideal para hospedagem simples no DirectAdmin.

## 1. Gerar o site

No terminal, dentro de `frontend`:

```bash
set NODE_OPTIONS=--max-old-space-size=4096
npm run build:directadmin
```

No PowerShell:

```powershell
$env:NODE_OPTIONS="--max-old-space-size=4096"
npm run build:directadmin
```

## 2. Enviar para o DirectAdmin

1. Entrar no DirectAdmin.
2. Abrir `File Manager`.
3. Entrar em `domains/SEU_DOMINIO/public_html`.
4. Apagar o conteudo antigo, se existir.
5. Enviar todo o conteudo da pasta `frontend/out`.
6. Se enviar o ZIP, extrair dentro de `public_html`, garantindo que `index.html` fique diretamente dentro de `public_html`.

## 3. Estrutura esperada

```text
public_html/
  index.html
  _next/
  assets/
  login/
  criar-conta/
  adicionar-casa/
  imovel/
```

## 4. Observacao sobre backend

Este pacote e apenas o frontend estatico. Para funcionalidades reais de login, cadastro, publicacao de casas e base de dados, o backend NestJS precisa ficar hospedado separadamente em ambiente Node.js com PostgreSQL.
