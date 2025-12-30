# RU APP - Frontend

Este é o frontend estático para o cardápio do RU UNIFESP (Campus Baixada Santista).

## 🚀 Como rodar localmente

1. Entre na pasta:
   ```bash
   cd ru_frontend
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Rode em modo de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🌐 Deploy no GitHub Pages

Este projeto está configurado para deploy automático no GitHub Pages.

1. Configure a URL da sua API no arquivo `.env.production`:
   ```env
   VITE_API_URL=https://sua-api-publica.com
   ```
2. Execute o comando de deploy:
   ```bash
   npm run deploy
   ```

## ✨ Funcionalidades

- **Design Premium**: Visual dark inspirado no CampusDine.
- **Segunda Vegetariana**: Destaque especial para as segundas-feiras.
- **Formatação Profissional**: Conversão automática de strings para Title Case.
- **Responsivo**: Otimizado para celulares e desktops.

---
Desenvolvido por [hericmr](http://hericmr.github.io/me)
