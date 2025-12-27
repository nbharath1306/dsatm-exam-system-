# DSATM Exam System Frontend

A stunning, modern, and responsive frontend for the DSATM Exam System, built with React, TypeScript, Vite, and Tailwind CSS.

## Features
- Beautiful, animated UI with responsive design
- Authentication (login/register) pages
- Dashboard with quick stats
- Student, subject, and marks management views
- Mock API integration (easy to connect to real backend)
- Modern navigation and loading animations

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation
```sh
npm install
```

### Development
```sh
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production
```sh
npm run build
```

### Linting
```sh
npm run lint
```

## Project Structure
- `src/pages/` — Main pages (Home, Login, Register, Dashboard, Students, Subjects, Marks)
- `src/components/` — Reusable UI components (Navbar, Loader, etc.)
- `src/api/` — Mock API (replace with real API calls as needed)
- `src/index.css` — Tailwind CSS and custom styles

## Customization
- Update mock data in `src/api/mockApi.ts` or connect to your backend
- Edit Tailwind config in `tailwind.config.js`

## License
This project is for educational purposes at DSATM.
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
