# kode — Estúdio de Projetos Digitais

Site institucional (landing page) do estúdio **kode**, focado em pequenos negócios:
sites, sistemas de agendamento, controle de estoque, dashboards e automações.

Site estático de página única — **HTML, CSS e JavaScript puro**, sem build e sem dependências.

## Estrutura

```
.
├── index.html          # Página única (todas as seções)
├── style.css           # Design system e estilos
├── script.js           # Interações (menu, FAQ, planejador, formulário)
├── assets/
│   └── logos/          # Logotipos e identidade visual
├── .gitignore
└── README.md
```

## Rodar localmente

Como é 100% estático, basta abrir o `index.html` no navegador. Para simular
um servidor real (recomendado, evita bloqueios de `file://`):

```bash
# Python 3
python -m http.server 5500
# depois abra http://localhost:5500
```

## Publicar (colocar no ar)

O site pode ser hospedado em qualquer serviço de arquivos estáticos:

- **GitHub Pages**: nas configurações do repositório → *Pages* → *Deploy from a branch* → `main` / `root`.
- **Netlify / Vercel / Cloudflare Pages**: importar o repositório; não há passo de build.

## Funcionalidades

- Header fixo com scrollspy e menu responsivo (mobile).
- Animação de terminal na seção inicial.
- Catálogo de serviços com escopo detalhado.
- **Planejador de escopo interativo** com estimativa de prazo.
- FAQ em acordeão.
- Formulário de contato e CTAs que direcionam para o WhatsApp comercial.

## Contato

Os botões de ação direcionam para o WhatsApp comercial do estúdio.
