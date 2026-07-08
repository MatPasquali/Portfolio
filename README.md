# Portfólio · Mateus de Pasquali

<p>
  <a href="https://matpasquali.github.io/Portfolio/"><img src="https://img.shields.io/badge/Live%20Site-Online-36e2c4?style=for-the-badge&logo=githubpages&logoColor=white" alt="Live Site" /></a>
  <img src="https://img.shields.io/badge/Stack-HTML%20%2B%20CSS%20%2B%20JS-1f6feb?style=for-the-badge" alt="Stack" />
  <img src="https://img.shields.io/badge/i18n-PT%20%2F%20EN-a78bfa?style=for-the-badge" alt="Bilingual" />
  <img src="https://img.shields.io/badge/Theme-Dark%20Terminal-0a0e14?style=for-the-badge" alt="Theme" />
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-3ad35a?style=for-the-badge" alt="License: MIT" /></a>
</p>

Site de portfólio estático (HTML + CSS + JS puro), bilíngue (PT/EN), com estética *dark tech / terminal*.

🔗 **Acesse ao vivo | Live site:** [matpasquali.github.io/Portfolio](https://matpasquali.github.io/Portfolio/)

## ✨ Recursos

- **Sem build** — abra `index.html` e funciona.
- **Bilíngue PT/EN** com toggle (salvo em `localStorage`).
- **Hero estilo terminal** com efeito de digitação.
- **Background animado** de partículas em `<canvas>` (respeita `prefers-reduced-motion`).
- **Scroll reveal**, contadores animados e cards interativos.
- **Responsivo** com menu mobile.
- **SEO/Open Graph** básico configurado.

## 📁 Estrutura

```
.
├── index.html
├── assets/
│   ├── css/style.css
│   └── js/
│       ├── i18n.js     # traduções PT/EN + dados dos projetos
│       └── main.js     # interações e animações
└── README.md
```

## 🚀 Rodando localmente

Basta abrir o `index.html` no navegador. Para evitar restrições de `file://`,
sirva localmente:

```bash
# Python
python -m http.server 8000
# depois acesse http://localhost:8000
```

## 🌐 Publicar no GitHub Pages

1. Crie um repositório (ex.: `MatPasquali.github.io` ou `portfolio`).
2. Faça push destes arquivos.
3. Em **Settings → Pages**, selecione a branch `main` e a pasta `/ (root)`.
4. O site fica em `https://matpasquali.github.io/<repo>/`.

## ✏️ Como editar conteúdo

- **Textos**: edite as chaves em [`assets/js/i18n.js`](assets/js/i18n.js) (objetos `I18N.pt` / `I18N.en`).
- **Projetos**: edite o array `PROJECTS` no mesmo arquivo.
- **Cores/tema**: variáveis CSS no topo de [`assets/css/style.css`](assets/css/style.css) (`:root`).

---

Feito com HTML, CSS & JS · © Mateus de Pasquali
