# LearningTracker 🎯

O projeto "LearningTracker", um aplicativo web completo de rastreamento de aprendizado, focado em gamificação, design profissional e uma arquitetura de código robusta e escalável.

O projeto foi construído do zero com React, Context API e TailwindCSS, e está hospedado na **Vercel**.

## 🚀 Acesso ao Projeto

**[➡️ Ver Deploy Ao Vivo (Vercel)](https://LearningTracker.vercel.app)**

**[➡️ Clonar e Fazer Deploy na sua Própria Vercel](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FALPSofc%2F[NOME-DO-REPOSITORIO])**

-----

-----

## ✨ Funcionalidades Principais (Features)

Este projeto vai além de um simples CRUD e implementa um ecossistema completo de funcionalidades de nível profissional.

### 1\. 🏗️ Arquitetura e UI/UX

  * **Design "Flutuante":** O layout não é "quadrado", mas usa `padding` e cantos arredondados (`rounded-2xl`) para criar painéis "flutuantes" e modernos (Design "Inset").
  * **Modo Claro & Escuro:** Seletor de tema (Sol/Lua) que salva a preferência do usuário no `localStorage` usando um `ThemeContext` e aplica a classe `dark` no HTML.
  * **Internacionalização (i18n):** Suporte completo para Português (pt-BR) e Inglês (en-US) com `react-i18next`. O aplicativo detecta o idioma do navegador e permite a troca instantânea.
  * **Componentes de UI Reutilizáveis:** Uma biblioteca de componentes (`/src/components/ui`) foi criada para `Button`, `Card`, `Modal`, e `ProgressBar`, garantindo consistência visual.

### 2\. 🧠 Gerenciamento de Estado Avançado (O "Cérebro")

  * **Context API Centralizado:** Um `DataContext` principal gerencia todo o estado do aplicativo (trilhas, metas, XP, medalhas, log de atividade).
  * **Hooks Customizados:** `useData`, `useTheme`, e `useLocalStorage` criados para fornecer acesso limpo e encapsulado aos contextos e à persistência de dados.
  * **Garantia de Imutabilidade:** Uso de funções de utilidade (`dataUtils.js`) para garantir que todas as atualizações de estado (adicionar/completar metas) sejam imutáveis e recalculem o progresso (`updateTrackWithProgress`) imediatamente.
  * **Persistência de Dados:** Todo o progresso do usuário (`tracks`, `theme`, `xp`, `unlockedBadges`) é salvo no `localStorage`, permitindo que o usuário feche o navegador e continue de onde parou.

### 3\. 🎮 Gamificação e Dashboard

  * **Dashboard Completo:** A `Home` exibe 4 widgets: Saudação (com dicas motivacionais traduzidas), Progresso Geral (XP, Média de Progresso, Streak), Conquistas Recentes e um Feed de Atividade Recente.
  * **Sistema de Medalhas (Badges):** Um `gamification.js` verifica o estado do usuário após ações (como `updateGoal`) e desbloqueia medalhas (`allBadges.js`), que são exibidas na `BadgeGallery` (com SVGs customizados).
  * **Feed de Atividade:** Cada ação importante (Adicionar Trilha, Completar Meta, Ganhar Medalha) é registrada no `activityLog` e exibida no feed da `Home`.

### 4\. 📈 CRUD e Visualização de Dados

  * **CRUD Completo (Trilhas):** Usuários podem Criar, Renomear e Excluir trilhas de aprendizado (os "Cards").
  * **CRUD Completo (Metas):** Dentro de cada trilha, usuários podem Criar, Editar (o texto), Completar (toggle) e Excluir metas individuais.
  * **Gráficos Dinâmicos:** A página de `Statistics` usa `Recharts` para renderizar um Gráfico de Radar que exibe o progresso percentual em todas as trilhas. O bug de renderização (width: -1) foi corrigido dando uma altura fixa ao `ResponsiveContainer`.

### 5\. ✨ Polimento Profissional

  * **Modais de Confirmação:** Todos os alertas feios (`window.confirm`) foram substituídos por um `ConfirmationContext` global. Ações destrutivas (Excluir Trilha, Resetar Progresso) agora abrem um modal de confirmação profissional e traduzido.
  * **Notificações "Toast":** Todos os alertas de sucesso (`window.alert`) foram substituídos por `react-hot-toast`. Ganhar medalhas ou salvar o nome agora dispara um "toast" não-intrusivo e que respeita o tema escuro.
  * **Consentimento de Cookies (LGPD/GDPR):** Um banner discreto (usando `framer-motion`) informa o usuário sobre o uso do `localStorage`, salvando o consentimento.

-----

## 💻 Tecnologias Utilizadas

  * **Plataforma:** **Vercel** (para Deploy e Hospedagem).
  * **Core:** **React.js (v18)** (usando `create-react-app`).
  * **Roteamento:** **`react-router-dom`** (para navegação entre as páginas).
  * **Estilização:** **`tailwindcss`** (Utility-first CSS com modo `dark: 'class'`).
  * **Estado Global:** **React Context API** (para `DataContext`, `ThemeContext`, `ConfirmationContext`).
  * **Hooks:** Hooks Customizados (`useData`, `useTheme`, `useLocalStorage`, `useConfirmation`).
  * **Tradução (i18n):** **`i18next`** e **`react-i18next`** (para tradução dinâmica PT/EN).
  * **Animação:** **`framer-motion`** (para modais, botões e o banner de cookies).
  * **Gráficos:** **`recharts`** (para o Gráfico de Radar na página de Estatísticas).
  * **Notificações:** **`react-hot-toast`** (para alertas de sucesso, ex: "Medalha ganha\!").
  * **Ícones:** **`react-icons`** (para todos os ícones da UI, ex: FaHome, FaEdit).
  * **Persistência:** **`localStorage`** (para salvar o progresso do usuário no navegador).

-----

## 📖 Sobre o Projeto (O Processo)

Em vez de um `README` estático, este projeto inclui uma página **"Sobre o Projeto"** (`/about`) dentro do próprio aplicativo, totalmente traduzida.

Esta página detalha o meu processo de pensamento, incluindo:

  * **O que eu aprendi:** Foco no gerenciamento de estado imutável com `Context API` e `dataUtils`.
  * **Desafios e Soluções:** Como depurei o conflito de dependências (`ERESOLVE`) do `i18next` e o bug de *race condition* (`<Suspense>`).
  * **Próximos Passos:** Planos para migrar para **Firebase/Supabase** (Autenticação e DB na Nuvem) e adicionar **Testes Unitários (Jest)**.

-----

## ⚙️ Como Rodar o Projeto Localmente

Embora o projeto esteja disponível na Vercel, você também pode rodá-lo localmente:

```bash
# 1. Clone este repositório
git clone https://github.com/ALPSofc/LearningTracker.git

# 2. Entre na pasta do projeto
cd [LearningTracker]

# 3. Instale as dependências
# NOTA: Este projeto usa 'react-scripts@5' que tem um conflito 
# conhecido com 'i18next'. Use a flag '--legacy-peer-deps'.
npm install --legacy-peer-deps

# 4. Rode o servidor de desenvolvimento
npm start

# 5. Abra http://localhost:3000 no seu navegador.
```

-----

## 👨‍💻 Autor

**Alisson Pereira (ALPS)**

  * **LinkedIn:** https://www.linkedin.com/in/alissonpereira73a1097
  * **GitHub:** https://github.com/ALPSofc
  * **Email:** alissoncabralia@gmail.com