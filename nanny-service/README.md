<div align="center">

  <h1>👶 Nanny Services</h1>
  <p><strong>A premium, highly-scalable platform connecting families with experienced babysitters.</strong></p>

  [![React](https://img.shields.io/badge/React-19-blue.svg?logo=react&logoColor=white)](#)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6.svg?logo=typescript&logoColor=white)](#)
  [![Vite](https://img.shields.io/badge/Vite-8-646CFF.svg?logo=vite&logoColor=white)](#)
  [![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28.svg?logo=firebase&logoColor=black)](#)
  [![MUI](https://img.shields.io/badge/MUI-7-007FFF.svg?logo=mui&logoColor=white)](#)

  <br />
  <h3>🌐 <a href="https://nanny-service.emreceyhan.xyz/" target="_blank">View Live Deployment</a></h3>

</div>

<br />

## 📖 Overview

**Nanny Services** is an enterprise-grade frontend application designed to simplify the process of finding professional childcare. It boasts a modern, highly optimized, and accessible user interface built around strict structural patterns to ensure absolute code scalability.

The project handles complex data fetching, secure user authentication, interactive state management across pages (Favorites, Nannies, Auth), and sophisticated animation—all while maintaining a highly performant Lighthouse grade.

---

## ⚡ Key Features

- **Robust Authentication:** Secure Firebase-backed registration and login systems with integrated persistent session management.
- **Dynamic Data Rendering:** Live loading of professional nanny profiles directly from Firebase Realtime Database.
- **Client-Side Interactions:** Favorite your preferred nannies, filter by experience or price, and utilize interactive appointment scheduling.
- **Premium UI & UX:** 
  - Rich aesthetics utilizing custom **MUI (Material UI)** theming.
  - Micro-animations via **Framer Motion** for a luxurious, dynamic user experience.
  - Pixel-perfect responsiveness across desktop, tablet, and mobile.
- **Mobile Performance Optimized:** Heavily optimized for mobile devices with LCP responsive `<picture>` rendering, preloaded networking, and module-split code chunking leading to rapid Paint times.

---

## 🏗️ Architectural Principles

This application adopts a highly restricted and predictable **Page-State-Action (PSA)** architecture. It avoids complex external state-management libraries in favor of strict, predictable React data flows.

### The Rule Paradigm:
1. **Single Root State:** Each page owns its exact domain state object (`PageState`).
2. **Action Driven:** All API calls, logic, and mutations are declared in a `PageActions` wrapper.
3. **Immutability:** Child components **never** mutate state or execute independent fetches. They purely receive `state` and trigger parent updates strictly via `actions`.
4. **Strong Typing:** Absolutely zero `any` types. All definitions are segregated structurally.

### Clean File Structure
```text
/src
 ├── /assets               # Core optimized images (WebP format)
 ├── /lib
 │   ├── /type             # Pure TypeScript definitions (*.d.ts)
 │   │   ├── auth.d.ts     # Domain models & Page objects
 │   │   ├── nannies.d.ts  
 │   │   └── ...
 │   └── firebase.ts       # Backend connection layer
 ├── /pages
 │   └── /nannies          
 │       ├── NanniesPage.tsx    # PARENT: Fetches data, owns state
 │       └── NannyCard.tsx      # CHILD: Receives state & actions as props via DTOs
 ├── index.css             # Vanilla CSS utility tokens & design system rules
 └── main.tsx              # DOM Router entrypoint
```

---

## 🛠️ Tech Stack

### Core
* **[React 19](https://react.dev/)** — UI Component Engineering
* **[TypeScript](https://www.typescriptlang.org/)** — Static execution & Domain typing
* **[Vite 8](https://vitejs.dev/)** — Lightning-fast ES module bundler

### UI / Styling
* **[Material UI (MUI)](https://mui.com/)** — Component library & Design system backbone
* **[Framer Motion](https://www.framer.com/motion/)** — High-performance mounting & scroll tracking animations
* **[React Hook Form](https://react-hook-form.com/) + [Yup](https://github.com/jquense/yup)** — Defensive form architecture and validation
* **[Lucide React](https://lucide.dev/)** & **MUI Icons** — Vector iconography

### Backend & Infrastructure
* **[Firebase](https://firebase.google.com/)** — Auth, Firestore, Hosting

---

## 🚀 Getting Started

### Prerequisites
* Node.js Version Manager (`nvm`) or Node version `18+`
* Firebase account & project credentials

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd nanny-service
   ```

2. **Install core dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment:**
   Create a `.env` file at the root of the project with your Firebase config:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Launch Dev Server:**
   ```bash
   npm run dev
   ```

### Production Build
To test the Vite optimized chunks and bundle sizes:
```bash
npm run build
npm run preview
```

---

## 📈 Performance Benchmarks

The application enforces critical web-vitals compliance. The background assets have been optimized utilizing `sharp` to provide responsive `.webp` variants based on media queries (`max-width: 768px`).

* **Code Splitting:** Native Vite `manualChunks` configuration parses core dependencies (`/vendor`, `/firebase`, `/mui`) to drastically reduce unexecuted AST parsing overhead.
* **Preloading:** Critical Largest Contentful Paint (LCP) assets utilize prioritized DOM discovery via `<link rel="preload">`.

---

<div align="center">
  <p>Engineered accurately for scale, stability, and speed.</p>
</div>
