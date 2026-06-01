# Portfólio · Mateus de Pasquali

Site de portfólio estático (HTML + CSS + JS puro), bilíngue (PT/EN), com estética *dark tech / terminal*.

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
