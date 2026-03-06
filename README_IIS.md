# Guia Prático para Atualizar o Site no IIS

Este documento descreve o passo a passo para atualizar tanto a versão estática quanto dinâmica de um site hospedado no IIS, incluindo a atualização do WordPress e do Node.js.

## 1° Passo – Atualizar a versão estática (subdomínio dist)

- Substituir os arquivos do site atual para os arquivos do subdomínio `dist` no IIS.

## 2° Passo – Subir o novo WordPress (Backend API)

- Ajustar o arquivo `wp-config.php` com os dados do banco:
```php
<!-- exemplo -->
define('DB_NAME', 'nome_do_banco');
define('DB_USER', 'usuario_mysql');
define('DB_PASSWORD', 'senha_mysql');
define('DB_HOST', 'localhost');
```

## 3° Passo – Atualizar Node.js

- Se o servidor tiver Chocolatey para atualizar o Node.js (mais prático):
```bash
choco upgrade nodejs -y
```
- Caso contrário, baixar e instalar o Node.js do site oficial: [Node.js](https://nodejs.org/pt/download/current)
- Conferir versão:
```bash
node -v
```

## 4° Passo – Subir a versão dinâmica

- Baixar a versão dinâmica do site 
- Descompactar os arquivos do site dinâmico e substituir a versão estática na pasta raiz do brasilcenter.com.br
- Editar `/server/api/graphql.js` para apontar a URL da API do WordPress.
